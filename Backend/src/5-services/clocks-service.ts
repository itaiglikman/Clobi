import fs from "fs-extra";
import appConfig from "../2-utils/app-config";
import { ResourceNotFoundError } from "../3-models/client-errors";
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
  
  const clocks = await getAllClocks();
  // add clock:
  clocks.push(clock);
  // write clocks to file:
  await fs.writeJson(clocksPath, clocks, { spaces: 2 });
  return clock;
}

/**
 * Update clock
 * @param clock
 * @returns
 */
async function updateClock(clock: ClockModel): Promise<ClockModel> {
  // validate clock:
  clock.validate();
  const clocks = await getAllClocks();
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

export default {
  getAllClocks,
  getAllClocksByUserId,
  addClock,
  updateClock,
  deleteClock,
};
