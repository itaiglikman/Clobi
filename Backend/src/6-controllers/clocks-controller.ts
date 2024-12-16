import express, { Request, Response, NextFunction } from "express";
import clocksService from "../5-services/clocks-service";

const router = express.Router();

// get all clocks:
// GET http://localhost:3000/data/clocks
router.get("/clocks", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const clocks = await clocksService.getAllClocks();
        console.log("clocks controller---> ", clocks[1]);
        response.json(clocks);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
