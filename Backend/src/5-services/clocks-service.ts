import fs from "fs-extra";
import appConfig from "../2-utils/app-config";
import {
  ResourceNotFoundError,
  ValidationError,
} from "../3-models/client-errors";
import ClockModel from "../3-models/clock-model";

const clocksPath = appConfig.dataFiles.clocks;

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
  await checkOverlap(clock, clocks);

  // calculate total hours if clockOut exists:
  clock.totalHours = calcTotalHours(clock);

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

  // create new ClockModel instance:
  const clock = new ClockModel(clocks[index]);

  // calculate total hours if clockOut exists:
  clock.totalHours = calcTotalHours(clock);

  // validate clock:
  clock.validate();

  // check if clock overlaps with existing clocks:
  await checkOverlap(clock, clocks);

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

  // check if clock overlaps with existing clocks:
  await checkOverlap(clock, clocks);

  // find clock index:
  const index = clocks.findIndex((c) => c.id === clock.id);
  // throw error if clock doesn't exist:
  if (index === -1) throw new ResourceNotFoundError(clock.id);

  // update clock:
  clocks[index] = clock;

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
  const index = clocks.findIndex((c) => c.id === id);
  // throw error if clock doesn't exist:
  if (index === -1) throw new ResourceNotFoundError(id);
  // delete clock:
  clocks.splice(index, 1);

  // write clocks to file:
  await fs.writeJson(clocksPath, clocks, { spaces: 2 });
}

/**
 * Calculate total hours
 * @param clock
 * @returns total hours
 */
function calcTotalHours(clock: ClockModel): number {
  if (!clock.clockOut) return 0;

  const timeIn = new Date(clock.clockIn).getTime();
  const timeOut = new Date(clock.clockOut).getTime();

  const diff = timeOut - timeIn;
  const hours = diff / (1000 * 60 * 60);

  return hours;
}

/**
 * Check if clock overlaps with existing clocks
 * @param clock
 * all functions request already allClocks,
 * so to spare call to the database,
 * use allClocks and filter for allClocksByUser
 * @param allClocks
 * @returns boolean
 */
async function checkOverlap(
  clock: ClockModel,
  allClocks: ClockModel[]
): Promise<boolean> {
  // get all clocks by user:
  const allClocksByUser = allClocks.filter((c) => c.userId === clock.userId);
  const overlapError = new ValidationError(
    "Clock overlaps with existing clock"
  );
  // check if clock overlaps with existing clocks:
  for (const c of allClocksByUser) {
    if (
      //check if clockIn is between clockIn and clockOut
      new Date(clock.clockIn).getTime() >= new Date(c.clockIn).getTime() &&
      new Date(clock.clockIn).getTime() <= new Date(c.clockOut).getTime()
    )
      throw new ValidationError("Clock overlaps with existing clock");
    // throw overlapError;

    if (
      //check if clockOut is between clockIn and clockOut
      new Date(clock.clockOut).getTime() >= new Date(c.clockIn).getTime() &&
      new Date(clock.clockOut).getTime() <= new Date(c.clockOut).getTime()
    )
      throw new ValidationError("Clock overlaps with existing clock");
    // throw overlapError;
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
