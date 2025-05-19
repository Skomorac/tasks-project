function decimalToBinary(decimal) {
  // If the input decimal number is 0, return the binary representation '0'
  if (decimal === 0) {
    return "0";
  }

  // Initialize an empty string to store the binary representation
  let binary = "";
  // Initialize a variable to keep track of the quotient during the division process
  let quotient = decimal;

  // Loop until the quotient becomes 0
  while (quotient > 0) {
    // Get the remainder when the quotient is divided by 2 and prepend it to the binary string
    binary = (quotient % 2) + binary;
    // Update the quotient by performing integer division by 2 (floor division)
    quotient = Math.floor(quotient / 2);
  }

  // Return the resulting binary string
  return binary;
}

// Example usage:
console.log(decimalToBinary(8)); // Output: '1000'
