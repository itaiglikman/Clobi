import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {
    public email: string;
    public password: string;

    constructor(credentials: CredentialsModel) { //copy constructor
        this.email = credentials.email;
        this.password = credentials.password;
    }

    // create validation schema:
    private static validationSchema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(4),
    });

    // validate properties and throw if not valid:
    public validate(): void {
        let result = CredentialsModel.validationSchema.validate(this);
        if (result.error?.message) throw new ValidationError(result.error.message);
    }
}

export default CredentialsModel;