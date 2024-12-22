import axios from "axios";
import ClockModel from "../Models/ClockModel";
import appConfig from "../Utils/AppConfig";
import notifyService from "./NotifyService";

class GermanyTimeService {

    public async germanyTime(): Promise<Date | undefined> {
        try {
            const response = await axios.get(appConfig.timezoneDbApiUrl);
            if (response.data.status === "FAILED") {
                notifyService.error("Something went wrong... Please try again");
                return undefined;
            }
            const timeInGermany = response.data.formatted as string;
            // const timeInGermany = new Date(response.data.formatted);
            // return undefined
            return new Date(timeInGermany);
        } catch (error: any) {
            console.log(error.message);
        }
    }
}

const germanyTimeService = new GermanyTimeService();

export default germanyTimeService;
