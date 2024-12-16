import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../3-models/credentials-model";
import StatusCode from "../3-models/status-code";
import UserModel from "../3-models/user-model";
import authService from "../5-services/auth-service";

const router = express.Router();

// POST new user: http://localhost:4000/data/register
router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get user from request:
        const user = new UserModel(request.body);

        // add the user to database: 
        const token = await authService.register(user);

        // response back the token:
        response.status(StatusCode.Created).json(token);
    }
    catch (err: any) {
        next(err);
    }
});

// POST login user: http://localhost:4000/data/login
router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
    try {
        // get user sent from server as class object (not literal object):
        const credentials = new CredentialsModel(request.body);
        
        // get user from database: 
        const token = await authService.login(credentials);
        
        // response back the token:
        response.json(token);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;

