// Custom
import * as calendarAction from '../actions/Calendar';

const initialState = {
    activeDate: new Date(),
    emotions: []
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
            }
    }
    return state;
};

export default calendarReducer;