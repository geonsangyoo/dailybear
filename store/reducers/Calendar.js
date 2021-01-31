// Custom
import * as calendarAction from '../actions/Calendar';

const initialState = {
    activeDate: new Date(),
    emotions: [],
    contents: [],
    isDiaryDetailed: false
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case calendarAction.SET_DATE:
            return {
                ...state,
                activeDate: action.activeDate
            };
        case calendarAction.LOAD_EMOTION:
            return {
                ...state,
                emotions: action.emotions
            };
        case calendarAction.LOAD_CONTENT:
            return {
                ...state,
                contents: action.contents
            };
        case calendarAction.SET_ISDIARYDETAILED:
            return {
                ...state,
                isDiaryDetailed: action.isDiaryDetailed
            }
    }
    return state;
};

export default calendarReducer;
