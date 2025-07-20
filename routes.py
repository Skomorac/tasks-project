"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, TransformedImage, TasksUser, Tasks, TasksPredefined
from api.utils import generate_sitemap, APIException, send_password_reset_email, send_remindme_password_reset_email
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_mail import Message, Mail
import datetime
import instaloader
import random
import requests
from dotenv import load_dotenv
import time
from datetime import timedelta

mail = Mail()

# Load environment variables from .env file
load_dotenv()



# Generate a token for password reset (using itsdangerous)
from itsdangerous import URLSafeTimedSerializer

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# ////////////////////////////////////////////////////////////////////////////////////////////////////////

# Endpoint to Fetch Instagram Comments and Pick a Winner with Instaloader in Batches
@api.route('/api/fetch-comments-instaloader-batch', methods=['POST'])
@jwt_required()
def fetch_comments_instaloader_batch():
    data = request.json
    ig_username = data['username']
    ig_password = data['password']
    post_link = data['postLink']
    batch_size = 99  # Fetch comments in batches of 99

    try:
        # Initialize Instaloader
        L = instaloader.Instaloader()
        L.login(ig_username, ig_password)

        # Extract shortcode from post link
        post_shortcode = post_link.split('/')[-2]
        post = instaloader.Post.from_shortcode(L.context, post_shortcode)

        # Fetch comments in batches
        commenters = []
        total_comments_fetched = 0

        def fetch_comments():
            for comment in post.get_comments():
                yield comment.owner.username

        comment_generator = fetch_comments()

        while True:
            batch = list()
            try:
                for _ in range(batch_size):
                    batch.append(next(comment_generator))
            except StopIteration:
                commenters.extend(batch)
                break
            except Exception as e:
                print(f"Error fetching comments: {e}")
                time.sleep(10)  # Pause for a 10 sec before retrying
                continue

            commenters.extend(batch)
            total_comments_fetched += len(batch)

            # Log progress
            print(f"Fetched {total_comments_fetched} comments so far...")

            # If the batch is smaller than the batch size, it means we have reached the end
            if len(batch) < batch_size:
                break

            # Pause to avoid hitting rate limits
            time.sleep(10)  # Adjust the sleep time based on rate limiting

        # Randomly select a winner
        winner = random.choice(commenters) if commenters else None

        return jsonify({'commenters': sorted(commenters), 'winner': winner, 'total_fetched': total_comments_fetched})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500





# ////////////////////////////////////////////////////////////////////////////////////////////////////////
# RemindME endpoints

# Endpoint for user registration
@api.route('/task/signup', methods=['POST'])
def register_tasks_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)

    if email is None or password is None or username is None:
        return jsonify({"msg": "Missing parameters"}), 400

    existing_user = TasksUser.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    user = TasksUser(email=email, password=password, username=username)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "New TasksUser created"}), 201

#Endpoint to get user data
@api.route('/task/user', methods=['GET'])
def get_tasks_user_info():
    user_id = request.args.get('user_id', type=int)
    if user_id is None:
        return jsonify({"msg": "Missing user_id"}), 400
    user = TasksUser.query.get(user_id)
    if user:
        return jsonify(user.serialize()), 200
    else:
        return jsonify({"msg": "User not found"}), 404



# Endpoint for user login
@api.route('/task/login', methods=['POST'])
def login_tasks_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = TasksUser.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg": "Email not found"}), 401

    if user.password != password:
        return jsonify({"msg": "Incorrect password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200




# Endpoint to add a new task
@api.route('/task/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    description = data.get('description', '')
    user_id = data.get('user_id')
    if not description or not user_id:
        return jsonify({"msg": "Task description and user_id are required"}), 400
    new_task = Tasks(description=description, user_id=user_id)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"msg": "Failed to add task"}), 500
    return jsonify(new_task.serialize()), 201

# Endpoint to get tasks for the user
@api.route('/task/tasks', methods=['GET'])
def get_tasks():
    user_id = request.args.get('user_id', type=int)
    if user_id is None:
        return jsonify({"msg": "Missing user_id"}), 400
    tasks = Tasks.query.filter_by(user_id=user_id).all()
    return jsonify([task.serialize() for task in tasks]), 200

# Endpoint to update a task
@api.route('/task/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"msg": "Missing user_id"}), 400
    task = Tasks.query.filter_by(id=task_id, user_id=user_id).first()
    if not task:
        return jsonify({"msg": "Task not found"}), 404
    if 'is_active' in data:
        task.is_active = data['is_active']
    if 'description' in data:
        task.description = data['description']
    db.session.commit()
    return jsonify(task.serialize()), 200

# Endpoint to delete a task
@api.route('/task/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"msg": "Missing user_id"}), 400
    task = Tasks.query.filter_by(id=task_id, user_id=user_id).first()
    if task is None:
        return jsonify({"msg": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({"msg": "Task deleted"}), 200

# Endpoint to delete all tasks
@api.route('/task/tasks', methods=['DELETE'])
def delete_all_tasks():
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"msg": "Missing user_id"}), 400
    Tasks.query.filter_by(user_id=user_id).delete()
    db.session.commit()
    return jsonify({"message": "All tasks deleted"}), 200

# Endpoint to get predefined tasks
@api.route('/task/predefined-tasks', methods=['GET'])
def get_predefined_tasks():
    user_id = request.args.get('user_id', type=int)
    if user_id is None:
        return jsonify({"msg": "Missing user_id"}), 400
    predefined_tasks = TasksPredefined.query.filter_by(user_id=user_id).all()
    return jsonify([task.serialize() for task in predefined_tasks]), 200

# Endpoint to add a predefined task
@api.route('/task/add-predefined-task', methods=['POST'])
def add_predefined_task():
    data = request.get_json()
    description = data.get("description", None)
    user_id = data.get('user_id')
    if description is None or not user_id:
        return jsonify({"msg": "Description and user_id are required"}), 400
    new_task = Tasks(description=description, user_id=user_id)
    db.session.add(new_task)
    db.session.commit()
    new_predefined_task = TasksPredefined(description=description, user_id=user_id)
    db.session.add(new_predefined_task)
    db.session.commit()
    return jsonify({"task": new_task.serialize(), "predefined_task": new_predefined_task.serialize()}), 201

# Endpoint to update a predefined task
@api.route('/task/predefined-tasks/<int:task_id>', methods=['PUT'])
def update_predefined_task(task_id):
    data = request.get_json()
    description = data.get("description", None)
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({"msg": "Missing user_id"}), 400
    predefined_task = TasksPredefined.query.filter_by(id=task_id, user_id=user_id).first()
    if predefined_task is None:
        return jsonify({"msg": "Predefined task not found"}), 404
    if description:
        predefined_task.description = description
    db.session.commit()
    return jsonify({"msg": "Predefined task updated", "task": predefined_task.serialize()}), 200

# Endpoint to delete a predefined task
@api.route('/task/predefined-tasks/<int:task_id>', methods=['DELETE'])
def delete_predefined_task(task_id):
    user_id = request.args.get('user_id', type=int)
    if not user_id:
        return jsonify({"msg": "Missing user_id"}), 400
    predefined_task = TasksPredefined.query.filter_by(id=task_id, user_id=user_id).first()
    if predefined_task is None:
        return jsonify({"msg": "Predefined task not found"}), 404
    db.session.delete(predefined_task)
    db.session.commit()
    return jsonify({"msg": "Predefined task deleted"}), 200


# Secret key for token generation (make sure to keep it secure)
SECRET_KEY = os.getenv("my_key")
serializer = URLSafeTimedSerializer(SECRET_KEY)

# Forgot Password Endpoint - This endpoint generates a token and sends a password reset email:
@api.route("/task/forgot-password", methods=['POST'])
def remindme_forgot_password():
    email = request.json.get("email", None)

    # Query the user by email
    user = TasksUser.query.filter_by(email=email).first()
    if user:
        try:
            # Generate a token for password reset
            token = serializer.dumps(user.id, salt='password-reset')

            # Send password reset email
            if send_remindme_password_reset_email(user.email, token):
                return jsonify({"msg": "Link for resetting the password is sent to email: " + user.email}), 200
            else:
                # Failed to send email
                return jsonify({"msg": "Failed to send password reset email. Please try again later."}), 500
        except Exception as e:
            print(f"Error sending password reset email: {e}")
            return jsonify({"msg": "An error occurred while sending the password reset email. Please try again later."}), 500
    else:
        return jsonify({"msg": "No user found with this email. Please check your email address and try again."}), 404



# Validate Token Endpoint - This endpoint checks if the token is valid and not expired:
@api.route("/task/check-token/<token>", methods=['GET'])
def remindme_validate_token(token):
    try:
        user_id = serializer.loads(token, salt='password-reset', max_age=600)  # max_age in seconds (10 minutes)
        user = TasksUser.query.get(user_id)
        if user:
            return jsonify({"success": True}), 200
        else:
            return jsonify({"success": False}), 400
    except Exception as e:
        print(f"Error validating token: {e}")
        return jsonify({"success": False}), 400



# Reset Password Endpoint - This endpoint resets the user's password:
@api.route("/task/reset-password/<token>", methods=['POST'])
def remindme_reset_password(token):
    try:
        user_id = serializer.loads(token, salt='password-reset', max_age=600)  # max_age in seconds (10 minutes)
        new_password = request.json.get("new_password")
        user = TasksUser.query.get(user_id)
        if user:
            user.password = new_password
            db.session.commit()
            return jsonify({"msg": "Password reset successfully"}), 200
        else:
            return jsonify({"msg": "Invalid token"}), 400
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({"msg": "Invalid or expired token"}), 400




# ///////////////////////////////////////////////////////////////////////////////////////////////////////

#MAFL Project endpoints

@api.route("/login", methods=['POST'])
def create_login_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    # Query your database for username and password
    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        # The user was not found on the database
        return jsonify({"msg": "Bad email or password"}), 401
    
    # Create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }), 200


@api.route('/signup', methods=['POST'])
def register_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    username = request.json.get("username", None)  # Get the username from the request

    if email is None:
        return jsonify({"msg": "Email can't be empty"}), 400

    if password is None:
        return jsonify({"msg": "Password can't be empty"}), 400

    # Check if user with the same email already exists
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User with this email already exists"}), 400

    # If user doesn't exist, create a new user
    user = User(
        email=email,
        password=password,
        is_active=True,
        username=username  # Set the username field
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "New User created"}), 201

@api.route('/user/<int:user_id>', methods=['DELETE'])
@jwt_required()  # Ensure that only authenticated users can delete a user
def delete_user(user_id):
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()

    # Check if the current user is trying to delete their own account
    if current_user_id != user_id:
        return jsonify({"msg": "You are not authorized to delete this user"}), 403

    # Query the user to be deleted
    user_to_delete = User.query.get(user_id)

    # Check if the user exists
    if user_to_delete is None:
        return jsonify({"msg": "User not found"}), 404

    # Delete the user
    db.session.delete(user_to_delete)
    db.session.commit()

    return jsonify({"msg": "User deleted successfully"}), 200


# Protect a route with jwt_required, which will kick out requests without a valid JWT
@api.route("/validate", methods=["GET"])
@jwt_required()
def validate():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({"id": user.id, "email": user.email }), 200

#Fetch username from database User
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify(user.serialize()), 200


#Endpoints for forgot and reset password

# Secret key for token generation (make sure to keep it secure)
SECRET_KEY = os.getenv("my_key")
serializer = URLSafeTimedSerializer(SECRET_KEY)

@api.route("/forgot-password", methods=['POST'])
def forgot_password():
    email = request.json.get("email", None)

    # Query the user by email
    user = User.query.filter_by(email=email).first()
    if user:
        try:
            # Generate a token for password reset
            token = serializer.dumps(user.id, salt='password-reset')
                        
            # Send password reset email
            if send_password_reset_email(user.email, token):
                return jsonify({"msg": "Link for reseting the password is sent to email: " + user.email}), 200
            else:
                # Failed to send email
                error_message = "Failed to send password reset email. Please try again later."
                return jsonify({"msg": error_message}), 500
        except Exception as e:
            # Log the error
            print(f"Error sending password reset email: {e}")
            
            # Return detailed error message with specific error details
            error_message = "An error occurred while sending the password reset email. Please try again later."
            return jsonify({
                "msg": error_message,
                "error": str(e)  # Include the specific error message in the response
            }), 500
    else:
        # No user found with the provided email
        return jsonify({"msg": "No user found with this email. Please check your email address and try again."}), 404


@api.route("/check-token/<token>", methods=['GET'])
def validate_token(token):
    try:
        # Decrypt the token to get the user ID and set timout for token
        user_id = serializer.loads(token, salt='password-reset', max_age=600)  # max_age in seconds (15 minutes)

        # Query the user by ID
        user = User.query.get(user_id)
        if user:
            return jsonify({ "success": True }), 200
        else:
            return jsonify({"success": False}), 400
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({"success": False}), 400



@api.route("/reset-password/<token>", methods=['POST'])
def reset_password(token):
    try:
        # Decrypt the token to get the user ID and set timout for token
        user_id = serializer.loads(token, salt='password-reset', max_age=600)  # max_age in seconds (15 minutes)

        # Get the new password from the request data
        new_password = request.json.get("new_password")

        # Query the user by ID
        user = User.query.get(user_id)
        if user:
            # Update user's password
            user.password = new_password
            db.session.commit()

            # Send Email to User saying Password Resetted Successfully
            
            return jsonify({"msg": "Password reset successfully"}), 200
        else:
            return jsonify({"msg": "Invalid token"}), 400
    except Exception as e:
        print(f"Error resetting password: {e}")
        return jsonify({"msg": "Invalid or expired token"}), 400


# Endpoint for Get in contact

@api.route("/send-contact-form", methods=['POST'])
def send_contact_form():
    data = request.get_json()
    email = data.get("email", "")
    name = data.get("name", "")
    message = data.get("message", "")
    
    try:
        msg = Message(
            subject='New Contact Form Submission', 
            sender=os.getenv("my_email"), 
            recipients=[os.getenv('CONTACT_MAIL')]
        )
        msg.body = f"Name: {name}\nEmail: {email}\nMessage: {message}"
        
        mail.send(msg)
        return jsonify({"msg": "Contact form data sent successfully"}), 200
    except Exception as e:
        error_message = f"Failed to send contact form data: {str(e)}"
        print(error_message)  # Log the error for debugging
        return jsonify({"msg": error_message}), 500


# Endpoints for credits



@api.route('/user/credits', methods=['GET'])
@jwt_required()
def get_user_credits():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"credits": user.credits}), 200

@api.route('/user/credits', methods=['PUT'])
@jwt_required()
def update_user_credits():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    data = request.get_json()
    user.credits = data.get('credits', user.credits)
    db.session.commit()
    return jsonify({"credits": user.credits}), 200


#Endpoints for Transformed images

@api.route('/user/transformed-images', methods=['GET'])
@jwt_required()
def get_transformed_images():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if user:
        images = TransformedImage.query.filter_by(user_id=current_user_id).all()
        transformed_images = [image.url for image in images]
        return jsonify({"transformed_images": transformed_images}), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/user/transformed-images', methods=['DELETE'])
@jwt_required()
def delete_transformed_image():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    url = data['url']
    
    # Query the image to be deleted
    image_to_delete = TransformedImage.query.filter_by(user_id=current_user_id, url=url).first()
    
    if image_to_delete:
        db.session.delete(image_to_delete)
        db.session.commit()
        return jsonify({"message": "Image deleted"}), 200
    else:
        return jsonify({"error": "Image not found"}), 404


@api.route('/user/transformed-images', methods=['POST'])
@jwt_required()
def add_transformed_image():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    url = data['url']
    user = User.query.get(current_user_id)
    if user:
        new_image = TransformedImage(url=url, user_id=current_user_id)
        db.session.add(new_image)
        db.session.commit()
        return jsonify({"message": "Image added"}), 201
    else:
        return jsonify({"error": "User not found"}), 404
    
        

# Test endpoint
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
