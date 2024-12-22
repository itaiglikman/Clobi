class UserModel {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    /*  password for users 1,2,3 is 1234  */
    public roleId: number;

    // Custom validation to user properties:
    public static firstNameValidation = {
        required: { value: true, message: "Please insert your first name." },
        minLength: { value: 2, message: "First name must contain 2-20 chars." },
        maxLength: { value: 20, message: "First name must contain 2-20 chars." },
        validate: (value: string) => { // Validate the first name doesn't contain only spaces, tabs...
            let trimmedValue = value.trim();
            return trimmedValue ? true : "First name can't be empty or contain only spaces.";
        }
    }

    public static lastNameValidation = {
        required: { value: true, message: "Please insert your last name." },
        minLength: { value: 2, message: "Last name must contain 2-30 chars." },
        maxLength: { value: 30, message: "Last name contain 2-30 chars." },
        validate: (value: string) => { // Validate the last name doesn't contain only spaces, tabs...
            let trimmedValue = value.trim();
            return trimmedValue ? true : "Last name can't be empty or contain only spaces.";
        }
    }

    public static emailValidation = {
        required: { value: true, message: "Please insert your email address." },
        pattern: { // Check that the email format is a valid one.
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please insert a valid email address.",
        },
        maxLength: { value: 50, message: "Email can contain maximum 50 chars." },
        validate: (value: string) => { // Validate the email doesn't contain only spaces, tabs...
            let trimmedValue = value.trim();
            return trimmedValue ? true : "Email can't be empty or contain only spaces.";
        }
    }

    public static passwordValidation = {
        required: { value: true, message: "Please insert your password." },
        minLength: { value: 4, message: "Password must contain 4-20 chars." },
        maxLength: { value: 20, message: "Password must contain 4-20 chars." },
        validate: (value: string) => { // Validate the password doesn't contain only spaces, tabs...
            let trimmedValue = value.trim();
            return trimmedValue ? true : "Password can't be empty or contain only spaces.";
        }
    }
}

export default UserModel;