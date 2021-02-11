import { 
    fetchDiary,
    upsertDiary,
    deleteDiary
} from '../../helpers/db_diary';

export const LOAD_DIARY = 'LOAD_DIARY';
export const INIT_DIARY = 'INIT_DIARY';
export const SAVE_DIARY = 'SAVE_DIARY';
export const DELETE_DIARY = 'DELETE_DIARY';

export const loadDiary = (year, month, date, day) => {
    return async dispatch => {
        let diary;
        try {
            console.log('Load Diary...');
            diary = await fetchDiary(year, month, date);
            console.log('Result Load [Diary] -> ' + JSON.stringify(diary.rows.item(0)));
            if (diary.rows.length > 0) {
                dispatch({
                    type: LOAD_DIARY,
                    date: {
                        year: year,
                        month: month,
                        date: date,
                        day: day
                    },
                    content: diary.rows.item(0).content,
                    emotion: diary.rows.item(0).emotion
                })
            } else {
                dispatch({
                    type: LOAD_DIARY,
                    date: {
                        year: year,
                        month: month,
                        date: date,
                        day: day
                    },
                    content: '',
                    emotion: ''
                });
            }
        } catch (err) {
            throw err;
        }
    };
};

export const initDiary = () => {
    console.log("init Diary!!");
    return {
        type: INIT_DIARY
    };
};

export const saveDiary = (year, month, date, day, content, emotion) => {
    return async dispatch => {
        let dbResult;
        let diary;
        try {
            console.log('Save Diary...');
            dbResult = await upsertDiary(year, month, date, day, content, emotion);
            diary = await fetchDiary(year, month, date);
            console.log('fetch -> ' + JSON.stringify(diary.rows.item(0)));
            dispatch({
                type: SAVE_DIARY,
                content: diary.rows.item(0).content,
                emotion: diary.rows.item(0).emotion
            });
        } catch (err) {
            throw err;
        }
    };
};

export const removeDiary = (year, month, date) => {
    return async dispatch => {
        let dbResult;
        try {
            console.log('Delete Diary...');
            dbResult = await deleteDiary(year, month, date);
            console.log("diary is deleted... ", year, month, date);
            dispatch({
                type: DELETE_DIARY
            });
        } catch (err) {
            throw err;
        }
    };
};
