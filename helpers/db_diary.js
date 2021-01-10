import { executeQuery } from './db';

export const fetchDiary = async (year, month, date) => {
    let diary = await executeQuery(
        `
            SELECT content, emotion FROM diary
            WHERE year = ?
            AND month = ?
            AND date = ?;
        `
    , [year, month, date]);
    return diary;
};

export const fetchEmotion = async (year, month, date) => {
    let emotion = await executeQuery(
        `
            SELECT emotion FROM diary
            WHERE year = ?
            AND month = ?
            AND date = ?;
        `
    , [year, month, date]);
    return emotion;
};

export const upsertDiary = async (year, month, date, content, emotion) => {
    let diaryUpsert = await executeQuery(
        `
            INSERT INTO diary (year, month, date, content, emotion)
            VALUES (?, ?, ?, ?) ON CONFLICT (year, month, date)
            DO UPDATE SET content = excluded.content, emotion = excluded.emotion;
        `
    , [year, month, date, content, emotion]);
    return diaryUpsert;
};