// Custom
import { 
    fetchEmotions
} from '../../helpers/db_diary';

export const SET_DATE = 'SET_DATE';
export const LOAD_EMOTION = 'LOAD_EMOTION';
export const SET_ISDIARYDETAILED = 'SET_ISDIARYDETAILED';

export const setActiveDate = activeDate => {
    return  {
        type: SET_DATE,
        activeDate: activeDate
    }
};

const initEmotions = maxDays => {
    console.log("init Emotions -> ");
    let emotionsState = [];
    for (let i = 1; i <= maxDays; i++) {
        let obj = { 
            date: i,
            emotion: -1
        };
        emotionsState.push(obj);
    }
    return emotionsState;
};

export const loadEmotions = (year, month, maxDays) => {
    return async dispatch => {
        let emotions;
        let emotionsState = initEmotions(maxDays);
        try {
            console.log('Load Emotions...');
            emotions = await fetchEmotions(year, month);
            console.log('Result Load [number of rows] -> ' + JSON.stringify(emotions.rows.item(0)));
            if (emotions.rows.length > 0) {
                for (let i = 0; i < emotions.rows.length; i++) {
                    let obj = { 
                        date: emotions.rows.item(i).date,
                        emotion: emotions.rows.item(i).emotion
                    };
                    emotionsState[emotions.rows.item(i).date - 1] = obj; 
                }
            }
            dispatch({
                type: LOAD_EMOTION,
                emotions: emotionsState
            });
        } catch (error) {
            
        }
    }
};

export const setIsDiaryDetailed = isDiaryDetailed => {
    return {
        type: SET_ISDIARYDETAILED,
        isDiaryDetailed: isDiaryDetailed
    };
};