import fs from "fs-extra";
import { ActionOptions, areClocksEqual, checkOverlap, clocksPath, validateUserId } from "../2-utils/clock-service-utils";
import { ResourceNotFoundError, ValidationError } from "../3-models/client-errors";
import ClockModel from "../3-models/clock-model";

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
    const userClocks = clocks.filter((clock: ClockModel) => clock.userId === userId);
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

    // validate totalHours:
    clock.validate();

    // add clock:
    clocks.push(clock);
    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return clock;
}

/**
 * Patch clockOut
 * @param clockId
 * @param clockOut
 * @returns clock: ClockModel
 */
async function patchClockOut(clockId: number, clockOut: string): Promise<ClockModel> {
    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c: ClockModel) => c.id === clockId);
    if (index === -1) throw new ResourceNotFoundError(clockId);
    if (clocks[index].clockOut) throw new ValidationError("ClockOut already exists.");

    // update clockOut:
    clocks[index].clockOut = clockOut;

    // check if clock overlaps with existing clocks:
    checkOverlap(clocks[index], clocks, ActionOptions.patch);

    // write clocks to file:
    const updatedClocks = await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return updatedClocks[index];
}

/**
 * Update clock
 * @param clock
 * @returns clock: ClockModel
 */
async function updateClock(clock: ClockModel): Promise<ClockModel> {

    // validate clock:
    clock.validate();

    // validate userId:
    await validateUserId(clock.userId);

    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c: ClockModel) => c.id === clock.id);
    // throw error if clock doesn't exist:
    if (index === -1) throw new ResourceNotFoundError(clock.id);
    // if clock is the same, change nothing:
    if (areClocksEqual(clock, clocks[index])) throw new ValidationError("No change was made.");

    // update clock:
    clocks[index] = clock;

    // check if clock overlaps with existing clocks:
    checkOverlap(clock, clocks, ActionOptions.put);

    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
    return clock;
}

/**
 * Delete clock by id
 * @param id
 */
async function deleteClock(id: number): Promise<void> {
    // get all clocks:
    const clocks = await getAllClocks();

    // find clock index:
    const index = clocks.findIndex((c: ClockModel) => c.id === id);
    // throw error if clock doesn't exist:
    if (index === -1) throw new ResourceNotFoundError(id);
    // delete clock:
    clocks.splice(index, 1);

    // write clocks to file:
    await fs.writeJson(clocksPath, clocks, { spaces: 2 });
}

export default {
    getAllClocks,
    getAllClocksByUserId,
    addClock,
    patchClockOut,
    updateClock,
    deleteClock,
};
