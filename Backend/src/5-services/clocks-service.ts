import appConfig from "../2-utils/app-config";
import fs from 'fs-extra';

// const dataFilePath = appConfig.dataFiles.clocks;

/**
 * Get all clocks from clocks.json
 */
async function getAllClocks() {
    const clocks = await fs.readJson(appConfig.dataFiles.clocks);
    return clocks;
}

export default {
  getAllClocks,
};


