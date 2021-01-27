// Custom
import { 
    fetchContents,
    fetchEmotions
} from '../../helpers/db_diary';

export const SET_DATE = 'SET_DATE';
export const LOAD_EMOTION = 'LOAD_EMOTION';
export const LOAD_CONTENT = 'LOAD_CONTENT';
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

const initContents = maxDays => {
    console.log("init Contents -> ");
    let contentsState = [];
    for (let i = 1; i <= maxDays; i++) {
        let obj = { 
            date: i,
            content: ''
        };
        contentsState.push(obj);
    }
    return contentsState;
};

export const loadEmotions = (year, month, maxDays) => {
    return async dispatch => {
        let emotions;
        let emotionsState = initEmotions(maxDays);
        try {
            console.log('Load Emotions...');
            emotions = await fetchEmotions(year, month);
            console.log('Result Load [number of rows] -> ' + emotions.rows.length);
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

export const loadContents = (year, month, maxDays) => {
    return async dispatch => {
        let contents;
        let contentsState = initContents(maxDays);
        try {
            console.log('Load contents...');
            contents = await fetchContents(year, month);
            console.log('Result Load [number of rows] -> ' + contents.rows.length);
            if (contents.rows.length > 0) {
                for (let i = 0; i < contents.rows.length; i++) {
                    let obj = { 
                        date: contents.rows.item(i).date,
                        content: contents.rows.item(i).content
                    };
                    contentsState[contents.rows.item(i).date - 1] = obj; 
                }
            }
            dispatch({
                type: LOAD_CONTENT,
                contents: contentsState
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