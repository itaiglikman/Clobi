import cors from "cors";
import express from "express";
import expressRateLimit from "express-rate-limit";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import authController from "./6-controllers/auth-controller";
import clocksController from "./6-controllers/clocks-controller";

// create server:
const server = express();

// support request.body as JSON:
server.use(express.json());

// security DoS Attack: limits number of request from the same IP:
server.use(
  expressRateLimit({
    windowMs: 1000, //time limit
    max: 20, //max requests allowed in that time window
  })
);

// enable cors:
server.use(cors()); //enable cors for a specific frontend.

// // security: xss strip tags:
// server.use(sanitize);

// route requests to our controllers:
server.use("/data", clocksController);
server.use("/data", authController);

// Route Not Found:
server.use(routeNotFound);

// catch all middleware:
server.use(catchAll);

// Run server:
server.listen(appConfig.port, () => {
  console.log("Listening on http://localhost:" + appConfig.port);
});
