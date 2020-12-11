import * as calendarAction from '../actions/Calendar';

const initialState = {
    activeDate: new Date()
};

const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        case calendarAction.SET_DATE:
            return {
                ...state,
                activeDate: action.activeDate
            };
    }
    return state;
};

export default calendarReducer;