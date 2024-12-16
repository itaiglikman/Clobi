import { NextFunction, Request, Response } from "express";
import cyber from "../2-utils/cyber";

// verify token validity:
function verifyToken(request: Request, response: Response, next: NextFunction): void {

    // authorization: "Bearer the-token"
    //                 01234567
    const authorizationHeader = request.header("authorization");

    // extract token:
    const token = authorizationHeader?.substring(7);

    // verify token:
    cyber.verifyToken(token);

    // request contains the verifyToken key:
    next();
}

export default verifyToken;