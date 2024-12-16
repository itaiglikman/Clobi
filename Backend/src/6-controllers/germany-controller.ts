import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

router.get(
  "http://worldtimeapi.org/api/timezone/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
     const response = await fetch("http://worldtimeapi.org/api/timezone");
     console.log(response);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
