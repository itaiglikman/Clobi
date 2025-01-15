import axios from "axios";
import ClockModel, { INewClockOut } from "../Models/ClockModel";
import appConfig from "../Utils/AppConfig";

class ClocksService {
    public async getAllUsersClocks(userId: number): Promise<ClockModel[]> {
        const response = await axios.get<ClockModel[]>(appConfig.clocksUrl + userId);
        const clocks = response.data;
        return clocks;
    }

    // public async getOneClock(userId: number, ClockId: number): Promise<ClockModel> {
    //     const response = await axios.get<ClockModel>(appConfig.clocksUrl + userId + "/" + ClockId);
    //     const clock = response.data;
    //     console.log("clock service getOneClock-->", clock);
    //     return clock;
    // }

    public async addClock(clock: ClockModel): Promise<ClockModel> {
        const response = await axios.post<ClockModel>(appConfig.clocksUrl, clock);
        const newClock = response.data;
        console.log("clock service addClock-->", newClock);

        // add redux?

        return newClock;
    }

    public async patchClockOut(newClockOut: INewClockOut): Promise<ClockModel> {
        const { id: clockId, userId, clockOut } = newClockOut;
        console.log("clock service patchClockOut clockOut->", clockOut);
        console.log("clock service patchClockOut url->", appConfig.clocksUrl + userId + "/" + clockId);
        const response = await axios.patch<ClockModel>(appConfig.clocksUrl + userId + "/" + clockId, {clockOut});
        const updatedClock = response.data;
        console.log("clock service patchClockOut-->", updatedClock);
        return updatedClock;
    }

    public async getLastClock(userId: number): Promise<ClockModel> {
        const clocks = await this.getAllUsersClocks(userId);
        // sort clocks by date:
        clocks.sort((a, b) => {
            return new Date(b.clockIn).getTime() - new Date(a.clockIn).getTime();
        });
        console.log("clock service getLastClock-->", clocks);
        const lastClock = clocks[0];
        return lastClock;
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
