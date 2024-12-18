import fs from "fs-extra";
import appConfig from "../2-utils/app-config";
import {
    ResourceNotFoundError,
    ValidationError,
} from "../3-models/client-errors";
import ClockModel from "../3-models/clock-model";

const clocksPath = appConfig.dataFiles.clocks;

enum ActionOptions {
    post,
    patch,
    put
}

/**
 * Get all clocks
 * @returns clocks: ClockModel[]
 */
async function getAllClocks(): Promise<ClockModel[]> {
    const clocks = await fs.readJson(clocksPath);
    return clocks;
}

/**
 * get all clocks by userId
 * @param userId
 * @returns user clocks: ClockModel[]
 */
async function getAllClocksByUserId(userId: number): Promise<ClockModel[]> {
    // get all clocks:
    const clocks = await fs.readJson(clocksPath);
    // filter clocks by userId and get all user clocks:
    const userClocks = clocks.filter((clock: ClockModel) => {
        if (clock.userId === userId) return clock;
    });
    return userClocks;
}

/**
 * Add clock to clocks.json
 * @param clock
 * @returns clock: ClockModel
 */
async function addClock(clock: ClockModel): Promise<ClockModel> {
    // validate clock:
    clock.validate();

    // get all clocks:
    const clocks = await getAllClocks();

    // check if clock overlaps with existing clocks:
    checkOverlap(clock, clocks, ActionOptions.post);

    // calculate total hours if clockOut exists:
    clock.totalHours = calcTotalHours(clock);

    // validate totalHours:
    clock.validate();

    // add clock:
    clocks.push(clock);
    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return clock;
}

async function patchClockOut(
    clockId: number,
    clockOut: string
): Promise<ClockModel> {
    console.log("patchClockOut clockOut ", clockOut);
    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c) => c.id === clockId);
    if (index === -1) throw new ResourceNotFoundError(clockId);

    // update clockOut:
    clocks[index].clockOut = clockOut;

    // // create new ClockModel instance:
    // const clock = new ClockModel(clocks[index]);

    // calculate and validate total hours if clockOut exists:
    clocks[index].totalHours = calcTotalHours(clocks[index]);

    console.log("patchClockOut service clocks ", clocks);

    // check if clock overlaps with existing clocks:
    checkOverlap(clocks[index], clocks, ActionOptions.patch, index);

    // write clocks to file:
    const updatedClock = await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return updatedClock;
}

/**
 * Update clock
 * @param clock
 * @returns clock: ClockModel
 */
async function updateClock(clock: ClockModel): Promise<ClockModel> {
    // calculate total hours if clockOut exists:
    clock.totalHours = calcTotalHours(clock);

    // validate clock:
    clock.validate();

    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c) => c.id === clock.id);
    // throw error if clock doesn't exist:
    if (index === -1) throw new ResourceNotFoundError(clock.id);
    // if clock is the same, change nothing:
    if (areClocksEqual(clock, clocks[index])) throw new ValidationError("No change was made.");
    // if (areClocksEqual(clock, clocks[index])) return clock;

    // update clock:
    clocks[index] = clock;

    // check if clock overlaps with existing clocks:
    checkOverlap(clock, clocks, ActionOptions.put);

    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return clock;
}

function areClocksEqual(clock1: ClockModel, clock2: ClockModel): boolean {
    if (
        clock1.id === clock2.id &&
        clock1.userId === clock2.userId &&
        clock1.clockIn === clock2.clockIn &&
        clock1?.clockOut === clock2?.clockOut &&
        clock1.totalHours === clock2.totalHours
    ) return true;
    return false;
}

/**
 * Delete clock by id
 * @param id
 */
async function deleteClock(id: number): Promise<void> {
    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c) => c.id === id);
    // throw error if clock doesn't exist:
    if (index === -1) throw new ResourceNotFoundError(id);
    // delete clock:
    clocks.splice(index, 1);

    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
}

/**
 * Calculate and validate total hours
 * @param clock
 * @returns total hours
 */
function calcTotalHours(clock: ClockModel): number {
    if (!clock.clockOut) return 0;

    const timeIn = new Date(clock.clockIn).getTime();
    const timeOut = new Date(clock.clockOut).getTime();

    const diff = timeOut - timeIn;
    const hours = diff / (1000 * 60 * 60);

    // validate total hours:
    if (hours < 0) throw new ValidationError("ClockOut is before ClockIn");
    if (hours > 24) throw new ValidationError("ClockOut is after 24 hours, get some rest...");

    return hours;
}

/**
 * Check if clock overlaps with existing clocks
 * clock-out and the next clock-in can be in the same time
 * @param clock
 * all functions request already allClocks,
 * so to spare call to the database,
 * use allClocks and filter for allClocksByUser
 * @param allClocks
 * @returns boolean
 */
function checkOverlap(
    clock: ClockModel,
    allClocks: ClockModel[],
    action: ActionOptions,
    clockIndex?: number
): boolean {

    // get all clocks by user:
    const allClocksByUser = allClocks.filter((c) => {
        // in case of update and path - skip the clock that is being updated:
        if (clock.id === c.id) return false;
        c.userId === clock.userId
    });

    // check if clock overlaps with existing clocks:
    for (const c of allClocksByUser) {
        if (
            //check if clockIn is between clockIn and clockOut
            new Date(clock.clockIn).getTime() >= new Date(c.clockIn).getTime() &&
            new Date(clock.clockIn).getTime() < new Date(c?.clockOut).getTime()
        )
            throw new ValidationError("Clock overlaps with existing clock");

        if (
            //check if clockOut is between clockIn and clockOut
            new Date(clock?.clockOut).getTime() > new Date(c.clockIn).getTime() &&
            new Date(clock?.clockOut).getTime() <= new Date(c?.clockOut).getTime()
        )
            throw new ValidationError("Clock overlaps with existing clock");
    }

    return true;
}

export default {
    getAllClocks,
    getAllClocksByUserId,
    addClock,
    patchClockOut,
    updateClock,
    deleteClock,
};
