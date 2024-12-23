import express, { NextFunction, Request, Response } from "express";
import { generateUniqueIdByType, IdType } from "../2-utils/handle-id";
import ClockModel from "../3-models/clock-model";
import StatusCode from "../3-models/status-code";
import clocksService from "../5-services/clocks-service";
import verifyAdmin from "../4-middleware/verify-admin";
import verifyToken from "../4-middleware/verify-token";

const router = express.Router();

// get all clocks by userId:
// authentication needed: admin
// GET http://localhost:4000/data/clocks/:userId
router.get(
    "/clocks/:userId",
    // verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get userId from url:
            const userId = +request.params.userId;

            const userClocks = await clocksService.getAllClocksByUserId(userId);

            response.json(userClocks);
        } catch (err: any) {
            next(err);
        }
    }
);

// add new clock:
// authentication needed: regular user
// POST http://localhost:4000/data/clocks
router.post(
    "/clocks",
    // verifyToken,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // generate unique id for clock:
            request.body.id = await generateUniqueIdByType(IdType.clockId);

            console.log("controller post request.body-->", request.body);
            
            // get clock from request:
            const clock = new ClockModel(request.body);
            const newClock = await clocksService.addClock(clock);
            
            response.status(StatusCode.Created).json(newClock);
        } catch (err: any) {
            next(err);
        }
    }
);

// patch clockOut:
// authentication needed: regular user
// PATCH http://localhost:4000/data/clocks/:userId/:clockId
router.patch(
    "/clocks/:userId/:clockId",
    // verifyToken,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get id from url:
            const { userId, clockId } = request.params;
            
            // get clockOut from request:
            const clockOut = request.body.clockOut;

            console.log("controller patch clockOut-->", request);
            
            const updatedClock = await clocksService.patchClockOut(+userId, +clockId, clockOut);

            response.json(updatedClock);
        } catch (err: any) {
            next(err);
        }
    }
);

// update clock:
// authentication needed: admin
// PUT http://localhost:4000/data/clocks
router.put(
    "/clocks",
    // verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get clock from request:
            const clock = new ClockModel(request.body);

            const updatedClock = await clocksService.updateClock(clock);

            response.json(updatedClock);
        } catch (err: any) {
            next(err);
        }
    }
);

// delete clock by clockId:
// authentication needed: admin
// DELETE http://localhost:4000/data/clocks/:userId/:clockId
router.delete(
    "/clocks/:userId/:clockId",
    // verifyAdmin,
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            // get id from url:
            const { userId, clockId } = request.params;

            await clocksService.deleteClock(+userId, +clockId);

            response.sendStatus(StatusCode.NoContent);
        } catch (err: any) {
            next(err);
        }
    }
);

export default router;
