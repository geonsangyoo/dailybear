import {executeQuery} from './db';

export const fetchDiary = async (year, month, date) => {
  let diary = await executeQuery(
    `
        SELECT content, emotion FROM diary
        WHERE year = ?
        AND month = ?
        AND date = ?;
    `,
    [year, month, date],
  );
  return diary;
};

export const fetchEmotions = async (year, month) => {
  let emotions = await executeQuery(
    `
        SELECT date, emotion FROM diary
        WHERE year = ?
        AND month = ?;
    `,
    [year, month],
  );
  return emotions;
};

export const fetchContents = async (year, month) => {
  let contents = await executeQuery(
    `
        SELECT date, content FROM diary
        WHERE year = ?
        AND month = ?;
    `,
    [year, month],
  );
  return contents;
};

export const upsertDiary = async (year, month, date, day, content, emotion) => {
  let diaryUpsert = await executeQuery(
    `
        INSERT INTO diary (year, month, date, day, content, emotion)
        VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT (year, month, date)
        DO UPDATE SET content = excluded.content, emotion = excluded.emotion;
    `,
    [year, month, date, day, content, emotion],
  );
  return diaryUpsert;
};

export const deleteDiary = async (year, month, date) => {
  let diaryDelete = await executeQuery(
    `
        DELETE FROM diary
        WHERE year = ?
        AND month = ?
        AND date = ?;
    `,
    [year, month, date],
  );
  return diaryDelete;
};
