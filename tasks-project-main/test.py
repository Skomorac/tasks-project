def decimal_to_binary(decimal):
    # If the input decimal number is 0, return the binary representation '0'
    if decimal == 0:
        return '0'
    
    # Initialize an empty string to store the binary representation
    binary = ''
    # Initialize a variable to keep track of the quotient during the division process
    quotient = decimal

    # Loop until the quotient becomes 0
    while quotient > 0:
        # Get the remainder when the quotient is divided by 2 and prepend it to the binary string
        binary = str(quotient % 2) + binary
        # Update the quotient by performing integer division by 2 (floor division)
        quotient = quotient // 2
    
    # Return the resulting binary string
    return binary

# Example usage:
print(decimal_to_binary(8))  # Output: '1000'
