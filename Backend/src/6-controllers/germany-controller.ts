import { time } from "console";
import express, { NextFunction, Request, Response } from "express";

const router = express.Router();

// router.get(
//   "http://worldtimeapi.org/api/timezone/",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//      const response = await fetch("http://worldtimeapi.org/api/timezone");
//      console.log(response);
//     } catch (err: any) {
//       next(err);
//     }
//   }
// );


// const timezoneDbAPIKey = "C0U73DCVEA0Z"
// const zone = "Europe/Berlin";
// const timezoneDbApiUrl = `http://api.timezonedb.com/v2.1/get-time-zone?key=${timezoneDbAPIKey}&format=json&by=zone&zone=${zone}`;

// router.get("/germanyTime",
//     async (request: Request, response: Response, next: NextFunction) => {
//         try {
//             const apiResponse = await fetch(timezoneDbApiUrl) as any;
//             const data = await apiResponse.json();
//             const time = new Date(data.formatted);
//             response.json(time);
//         } catch (err: any) {
//             next(err);
//         }
//     }
// );

export default router;
