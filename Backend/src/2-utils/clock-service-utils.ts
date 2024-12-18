import { ValidationError } from "../3-models/client-errors";
import ClockModel from "../3-models/clock-model";
import fs from "fs-extra";
import appConfig from "./app-config";
import UserModel from "../3-models/user-model";

// define the paths to the data files:
export const clocksPath = appConfig.dataFiles.clocks;
export const usersPath = appConfig.dataFiles.users;

// describe the action options:
export enum ActionOptions {
    post,
    patch,
    put
}

/**
 * Check if clock overlaps with existing clocks
 * clock-out and the next clock-in can be in the same time
 * @param clock
 * all functions request already allClocks,
 * so to spare call to the database,
 * use allClocks and filter for allClocksByUser
 * @param allClocks
 * @param action: post, patch, put - skip the clock that is being updated
 * @returns boolean
 */
export function checkOverlap(
    clock: ClockModel,
    allClocks: ClockModel[],
    action: ActionOptions,
): boolean {

    // initiate allClocksByUser:
    let allClocksByUser = [];

    // in case of update and patch -
    // the clock is already in allClocks,
    // it will fail the checkOverlap every time so-->
    // skip the clock that is being updated:
    if (action === ActionOptions.patch || action === ActionOptions.put) {
        // get all clocks by user:
        allClocksByUser = allClocks.filter((c: ClockModel) => {
            if (c.id === clock.id) return false;
            return c.userId === clock.userId
        });
    } else {
        // get all clocks by user:
        allClocksByUser = allClocks.filter((c: ClockModel) =>
            c.userId === clock.userId);
    }

    // check if clock overlaps with existing clocks:
    for (const c of allClocksByUser) {
        if (
            //check if clockIn is between clockIn and clockOut
            new Date(clock.clockIn).getTime() >= new Date(c.clockIn).getTime() &&
            new Date(clock.clockIn).getTime() < new Date(c?.clockOut).getTime()
        ) throw new ValidationError("Clock overlaps with existing clock");

        if (
            //check if clockOut is between clockIn and clockOut
            new Date(clock?.clockOut).getTime() > new Date(c.clockIn).getTime() &&
            new Date(clock?.clockOut).getTime() <= new Date(c?.clockOut).getTime()
        ) throw new ValidationError("Clock overlaps with existing clock");
    }

    return true;
}

/**
 * Check if two clocks objects are equal
 * @param clock1 
 * @param clock2 
 * @returns true if equal, false if not
 */
export function areClocksEqual(clock1: ClockModel, clock2: ClockModel): boolean {
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
 * Check if userId exists
 * throw error if not
 * @param userId 
 * @returns void
 */
export async function validateUserId(userId: number): Promise<void> {
    const users = await fs.readJson(usersPath);
    const user = users.find((u: UserModel) => u.id === userId);
    if (!user) throw new ValidationError("User doesn't exist.");
}
