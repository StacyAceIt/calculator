# Calculator Project
Live Demo: https://stacyaceit.github.io/calculator

## Description

This project is a basic HTML calculator that can perform basic arithmetic operations such as addition, subtraction, multiplication, and division. The calculator is designed to be user-friendly and includes several features to enhance its functionality and usability.

## Features

1. **Basic Arithmetic Operations**: The calculator can perform addition, subtraction, multiplication, and division.
2. **Operator Functions**: Functions for each arithmetic operator (`add`, `subtract`, `multiply`, `divide`) are created and tested in the browser’s console.
3. **Operate Function**: A function `operate` that takes an operator and two numbers and then calls the corresponding arithmetic function.
4. **Calculator Operation**: The calculator operation consists of a number, an operator, and another number. Variables are created for the first number, the operator, and the second number.
5. **HTML Structure**: A basic HTML calculator with buttons for each digit, each arithmetic function, an “Equals” key, and a “clear” button.
6. **Display**: A display for the calculator that shows the current operation and result.
7. **Populating Display**: Functions that populate the display when number buttons are clicked.
8. **Performing Calculations**: Storing the first and second numbers input into the calculator, utilizing the operator selected by the user, and then performing the operation when the “=” key is pressed.
9. **Clear Button**: A “clear” button that wipes out any existing data and resets the calculator.
10. **Error Handling**: Displaying an error message if the user tries to divide by 0.
11. **Extra Credit Features**:
    - **Decimal Input**: A button for decimal points to allow users to input floating point numbers.
    - **Backspace Button**: A “backspace” button to allow users to undo if they click the wrong number.
    - **Keyboard Support**: Support for keyboard input for all calculator functions.
    - **Enhanced UI**: Improved aesthetics with CSS, making operations a different color from the keypad buttons.

## Usage

1. **Basic Operations**: Click on the number buttons to input the first number, select an operator (+, -, *, /), input the second number, and then click the “=” button to see the result.
2. **Clearing the Display**: Click the “clear” button to reset the calculator.
3. **Decimal Numbers**: Click the “.” button to input a decimal point. Ensure only one decimal point is added per number.
4. **Backspace**: Click the “backspace” button to remove the last digit entered.
5. **Keyboard Support**: Use the keyboard to input numbers, operators, and to perform calculations.

## Bugs and Gotchas

1. The calculator should not evaluate more than a single pair of numbers at a time.
2. Answers with long decimals should be rounded to avoid overflow on the display.
3. Pressing “=” before entering all numbers or an operator can cause errors.
4. Division by 0 should display a snarky error message without crashing the calculator.

## Future Improvements

1. Enhance the UI further with more sophisticated CSS styles.
2. Add more advanced mathematical functions (e.g., square root, power).
3. Improve error handling and validation for more edge cases.


## Acknowledgments

This project is part of the curriculum for [The Odin Project](https://www.theodinproject.com/). Special thanks to the contributors and the community for their support and feedback.
