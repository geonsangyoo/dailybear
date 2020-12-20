import { fetchSettings } from '../../helpers/db';
import { fetchSetting, upsertSetting, fetchSaying, upsertSaying } from '../../helpers/db_saying';

const FUNCTION_NAME = 'saying';
export const LOAD_SAYING_SETTING = 'LOAD_SAYING_SETTING';
export const SAVE_SAYING_SETTING = 'SAVE_SAYING_SETTING';
export const LOAD_SAYING = 'LOAD_SAYING';
export const SAVE_SAYING = 'SAVE_SAYING';

export const loadSayingSetting = () => {
    return async dispatch => {
        let dbResult;
        try {
            console.log('Load setting...');
            dbResult = await fetchSettings(FUNCTION_NAME);
            console.log('Result Load [number of rows] -> ' + dbResult.rows.length);
            dispatch({
                type: LOAD_SAYING_SETTING,
                setting: dbResult
            });
        } catch (err) {
            throw err;
        }
    };
};

export const saveSayingSetting = (content, setting_detail) => {
    return async dispatch => {
        let dbResult;
        let setting;
        try {
            console.log('Save <Saying> setting...');
            dbResult = await upsertSetting(content, setting_detail);
            setting = await fetchSetting(content);
            console.log('fetch -> ' + JSON.stringify(setting.rows.item(0)));
            dispatch({
                type: SAVE_SAYING_SETTING,
                setting: {
                    content: setting.rows.item(0).content,
                    setting_detail: setting.rows.item(0).setting_detail
                }
            });
        } catch (err) {
            throw err;
        }
    };
};

export const loadSaying = (year, month) => {
    return async dispatch => {
        let dbResult;
        try {
            console.log('Load saying...');
            dbResult = await fetchSaying(year, month);
            console.log('Result Load [number of rows] -> ' + JSON.stringify(dbResult.rows.item(0)));
            if (dbResult.rows.length > 0) {
                dispatch({
                    type: LOAD_SAYING,
                    saying: dbResult.rows.item(0).saying
                });
            } else {
                dispatch({
                    type: LOAD_SAYING,
                    saying: ''
                });
            }
        } catch (err) {
            throw err;
        }
    };
};

export const saveSaying = (year, month, saying) => {
    return async dispatch => {
        let dbResult;
        try {
            console.log('Save Saying...');
            dbResult = await upsertSaying(year, month, saying);
            saying = await fetchSaying(year, month);
            console.log('fetch -> ' + JSON.stringify(saying.rows.item(0)));
            dispatch({
                type: SAVE_SAYING,
                saying: saying.rows.item(0).saying
            });
        } catch (err) {
            throw err;
        }
    };
};