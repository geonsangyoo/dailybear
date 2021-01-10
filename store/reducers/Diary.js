import * as diaryActions from '../actions/Diary';

const initialState = {
    date: {
        year: '',
        month: '',
        date: '',
        day: ''
    },
    content: '',
    emotion: ''
};

const diaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case diaryActions.LOAD_DIARY:
            if (action.emotion) {
                return {
                    ...state,
                    date: action.date,
                    content: action.content,
                    emotion: action.emotion
                }
            } else {
                console.log('Error occurred!');
                return initialState;
            }
        case diaryActions.SAVE_DIARY:
            if (action.emotion) {
                return {
                    ...state,
                    content: action.content,
                    emotion: action.emotion
                }
            } else {
                console.log('No row updated!');
                return initialState;
            }
        default:
            return state;
    }
};

export default diaryReducer;