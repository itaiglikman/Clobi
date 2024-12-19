import axios from "axios";
import ClockModel from "../Models/ClockModel";
import appConfig from "../Utils/AppConfig";

class GermanyTimeService {
    public async germanyTime() {
        try {
            const response = await axios.get(appConfig.germanyTimeUrl);
            // let datetime = response.data;
            let datetime = new Date(await response.data.datetime);
            console.log("clock service germanyTime-->", datetime);
        } catch (error:any) {
            console.log(error.message);
        }
    }

    // get one clock by userId
    // get one clock by clockId
    // add clock
    // update clock
    // patch clockOut
    // delete clock
}

const germanyTimeService = new GermanyTimeService();

export default germanyTimeService;
