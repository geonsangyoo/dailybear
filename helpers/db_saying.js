import { executeQuery } from './db';

export const fetchMode = async (year, month) => {
    let mode = await executeQuery(
        `
            SELECT mode FROM saying
            WHERE year = ?
            AND month = ?;
        `
    , [year, month]);
    return mode;
};

export const fetchSaying = async (year, month) => {
    let saying = await executeQuery(
        `
            SELECT saying, mode from saying
            WHERE year = ?
            AND month = ?;
        `
    , [year, month]);
    return saying;
};

export const upsertSaying = async (year, month, saying, mode) => {
    let sayingUpsert = await executeQuery(
        `
            INSERT INTO saying (year, month, saying, mode)
            VALUES (?, ?, ?, ?) ON CONFLICT (year, month)
            DO UPDATE SET saying = excluded.saying, mode = excluded.mode;
        `
    , [year, month, saying, mode]);
    return sayingUpsert;
};