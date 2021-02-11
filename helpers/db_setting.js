import { executeQuery } from './db';

export const fetchSetting = async (_function = null, content = null) => {
    let setting;
    if (_function) {
        setting = await executeQuery(
            `
                SELECT function, content, setting_detail
                FROM setting
                WHERE function = ?
                AND content = ?;
            `
        , [_function, content]);
    } else {
        setting = await executeQuery(
            `
                SELECT function, content, setting_detail
                FROM setting;
            `
        , []);
    }
    return setting;
};

export const upsertSetting = async (function_, content, setting_detail) => {
    let settingUpsert = await executeQuery(
        `
            INSERT INTO setting (function, content, setting_detail)
            VALUES (?, ?, ?) ON CONFLICT (function, content)
            DO UPDATE SET setting_detail = excluded.setting_detail;
        `
    , [function_, content, setting_detail]);
    return settingUpsert;
};
