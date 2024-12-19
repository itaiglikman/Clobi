import axios from "axios";
import ClockModel from "../Models/ClockModel";
import appConfig from "../Utils/AppConfig";

class ClocksService {
    public async getAllClocks() {
        const response = await axios.get<ClockModel[]>(appConfig.clocksUrl);
        const clocks = response.data;
        console.log("clock service getAllClocks-->", clocks);
    }

    // get one clock by userId
    // get one clock by clockId
    // add clock
    // update clock
    // patch clockOut
    // delete clock
}

const clocksService = new ClocksService();

export default clocksService;
