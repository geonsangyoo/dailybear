import SQLite from 'react-native-sqlite-storage';
import { executeQuery } from './db';

const FUNCTION_NAME = "saying";

export const fetchSetting = async (content) => {
    let setting = await executeQuery(
        `
            SELECT * FROM setting
            WHERE function = ?
            AND content = ?;
        `
    , [FUNCTION_NAME, content]);
    return setting;
};

export const upsertSetting = async (content, setting_detail) => {
    let singleUpsert = await executeQuery(
        `
            INSERT OR REPLACE INTO setting (function, content, setting_detail)
            VALUES (?, ?, ?);
        `
    , [FUNCTION_NAME, content, setting_detail]);
    return singleUpsert;
};

export const fetchSaying = async (year, month) => {
    let saying = await executeQuery(
        `
            SELECT saying from saying
            WHERE year = ?
            AND month = ?;
        `
    , [year, month]);
    return saying;
};

export const upsertSaying = async (year, month, saying) => {
    let sayingUpsert = await executeQuery(
        `
            INSERT OR REPLACE INTO saying (year, month, saying)
            VALUES (?, ?, ?);
        `
    , [year, month, saying]);
    return sayingUpsert;
};