import fs from 'fs-extra';
import appConfig from "./app-config";

// same structure as the last-id.json file
export interface LastIds {
    userId: number;
    clockId: number;
}

// closed enum of id name that we can get
export enum IdType {
    userId = "userId",
    clockId = "clockId"
}

/**
 * get the last id from the last-id.json file.
 * return the lastIds object.
 */
export function getLastId(): LastIds {
    try {
        const lastIds = fs.readJsonSync(appConfig.dataFiles.lastId);
        return lastIds;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}

/**
 * get the new id by type.
 * increment the new id and update in the file.
 * return the new id.
 * @param idType: string
 * @returns newId: number
 */
export async function generateUniqueIdByType(idType: IdType): Promise<number> {
    try {
        // get the last ids:
        const lastIds: LastIds = getLastId();

        // auto increment the wanted id:
        const newId = (idType === IdType.userId) ? lastIds.userId + 1 : lastIds.clockId + 1;
        lastIds[idType] = newId;

        // write the new id in the file:
        await fs.writeJson(
            appConfig.dataFiles.lastId, // the path to the file
            lastIds, // the data to write
            { spaces: 2 } // the number of spaces to use for indentation
        );
        return newId;
    } catch (error) {
        console.log(error.message);
        throw error;
    }
}
