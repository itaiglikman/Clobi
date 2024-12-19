import { ForbiddenError, UnauthorizedError } from "../3-models/client-errors";
import RoleModel from "../3-models/role-model";
import UserModel from "../3-models/user-model";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// token secret key:
const secretKey = "The-Key-To-The-Secret-Clobi";

function getNewToken(user: UserModel): string {

    // security: remove password from token:
    delete user.password;

    // container for user object inside the token:
    const container = { user };

    // expiration:
    const options = { expiresIn: "3h" };

    // create token:
    const token = jwt.sign(container, secretKey, options);
    
    // return token:
    return token;
}

// verify if user has valid token:
function verifyToken(token: string): void {
    // if doesn't have token:
    if (!token) throw new UnauthorizedError("You're not authorized!");

    // if there is an error (jwt malformed)
    try {
        jwt.verify(token, secretKey);
    } catch (err: any) {
        // on token expired:
        if (err = "jwt missing") throw new UnauthorizedError("You're not authorized!");
        throw new UnauthorizedError(err.message);
    }
}

// verify admin token:
function verifyAdmin(token: string): void {

    // verify legal token:
    verifyToken(token);

    // get container: type is not specified here so need to set as UserModel
    const container = jwt.verify(token, secretKey) as { user: UserModel };

    // extract user:
    const user = container.user;

    // if not admin:
    if (user.roleId != RoleModel.admin) throw new ForbiddenError("You're not an admin!");
}

const hashSalt = "Nobody-Can-Know";
// SHA -  Secure Hashing Algorithm.
// HMAC - Hash based Message Authentication Code.

// Hash Password:
// transform plain text into hashed text:
function hashPassword(plainText: string): string {
    if (!plainText) return null;

    // hash with salting:
    const hashedPassword = crypto.createHmac("sha512", hashSalt).update(plainText).digest("hex"); //digest - transform binary to text
    return hashedPassword;
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin,
    hashPassword
}