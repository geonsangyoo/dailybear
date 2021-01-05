import { 
    fetchSaying,
    upsertSaying, 
} from '../../helpers/db_saying';

export const OUTER_DB_API_PATH = 'https://dailybear-aacd8-default-rtdb.firebaseio.com/saying.json';
export const LOAD_SAYING = 'LOAD_SAYING';
export const SAVE_SAYING = 'SAVE_SAYING';
const RANDOM_MODE = 'Random';

export const loadSayingFromOuter = (year, month) => {
    return async dispatch => {
        let response = await fetch(OUTER_DB_API_PATH);
        let resData, randIdx, dbResult;
        if (!response.ok) {
            throw new Error('Outer DB Load Failure');
        }
        resData = await response.json();
        randIdx = (Math.floor(Math.random() * 100) + 1) % resData.length;
        dbResult = await upsertSaying(year, month, resData[randIdx].saying, RANDOM_MODE);
        saying = await fetchSaying(year, month);
        dispatch({
            type: SAVE_SAYING,
            saying: saying.rows.item(0).saying,
            mode: RANDOM_MODE
        });
    }
}

export const loadSaying = (year, month) => {
    return async dispatch => {
        let saying;
        try {
            console.log('Load saying...');
            saying = await fetchSaying(year, month);
            console.log('Result Load [number of rows] -> ' + JSON.stringify(saying.rows.item(0)));
            if (saying.rows.length > 0) {
                dispatch({
                    type: LOAD_SAYING,
                    saying: saying.rows.item(0).saying,
                    mode: saying.rows.item(0).mode
                });
            } else {
                dispatch({
                    type: LOAD_SAYING,
                    saying: '',
                    mode: ''
                });
            }
        } catch (err) {
            throw err;
        }
    };
};

export const saveSaying = (year, month, saying, mode) => {
    return async dispatch => {
        let dbResult;
        try {
            console.log('Save Saying...');
            dbResult = await upsertSaying(year, month, saying, mode);
            saying = await fetchSaying(year, month);
            console.log('fetch -> ' + JSON.stringify(saying.rows.item(0)));
            dispatch({
                type: SAVE_SAYING,
                saying: saying.rows.item(0).saying,
                mode: mode
            });
        } catch (err) {
            throw err;
        }
    };
};