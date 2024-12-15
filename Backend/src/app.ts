import cors from "cors";
import express from "express";
import appConfig from "./2-utils/app-config";
import dal from "./2-utils/dal";
import catchAll from "./4-middleware/catch-all";
import routeNotFound from "./4-middleware/route-not-found";
import dataController from "./6-controllers/data-controller";
import expressRateLimit from "express-rate-limit";

// create server:
const server = express();

// support request.body as JSON:
server.use(express.json());

// security DoS Attack: limits number of request from the same IP:
server.use(expressRateLimit({
    windowMs: 1000, //time limit
    max: 20 //max requests allowed in that time window
}));

// enable cors:
server.use(cors()); //enable cors for a specific frontend.

// // security: xss strip tags:
// server.use(sanitize);

// // support file upload - set files into request.files:
// server.use(expressFileUpload());

// route requests to our controllers:
server.use("/api", dataController);

// Route Not Found:
server.use(routeNotFound);

// catch all middleware:
server.use(catchAll);

// Run server: 
server.listen(appConfig.port, async () => {
    
    // Connect once to MongoDB:
    await dal.connect();

    console.log("Listening on http://localhost:" + appConfig.port);
});