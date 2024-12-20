class CredentialsModel {
    public email: string;
    public password: string;

    public static emailValidation = {
        required: { value: true, message: "Please insert your email address." },
        pattern: { // Check that the email format is a valid one.
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Please insert a valid email address.",
        },
        maxLength: { value: 40, message: "Email can contain maximum 40 chars." },
        validate: (value: string) => {
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Email can't be empty or spaces only."
        }
    }
    public static passwordValidation = {
        required: { value: true, message: "Please insert your password" },
        minLength: { value: 4, message: "Password must contain 4-20 chars." },
        maxLength: { value: 20, message: "Password must contain 4-20 chars." },
        validate: (value: string) => {
            const trimmedValue = value.trim();
            return trimmedValue ? true : "Password can't be empty or spaces only."
        }
    }
}

export default CredentialsModel;