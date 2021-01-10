import { 
    fetchDiary,
    fetchEmotion,
    upsertDiary
} from '../../helpers/db_diary';

export const LOAD_DIARY = 'LOAD_DIARY';
export const SAVE_DIARY = 'SAVE_DIARY';

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
                    content: saying.rows.item(0).content,
                    emotion: saying.rows.item(0).emotion
                })
            } else {
                dispatch({
                    type: LOAD_SAYING,
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

export const loadEmotion = async (year, month, date) => {
    emotion = await fetchEmotion(year, month, date);
    if (emotion.rows.length > 0) {
        return emotion.rows.item(0).emotion;
    } else {
        return '';
    }
}

export const saveDiary = (year, month, date, content, emotion) => {
    return async dispatch => {
        let dbResult;
        let diary;
        try {
            console.log('Save Diary...');
            dbResult = await upsertDiary(year, month, date, content, emotion);
            diary = await fetchDiary(year, month, date);
            console.log('fetch -> ' + JSON.stringify(diary.rows.item(0)));
            dispatch({
                type: SAVE_DIARY,
                content: saying.rows.item(0).content,
                emotion: saying.rows.item(0).emotion
            });
        } catch (err) {
            throw err;
        }
    };
};