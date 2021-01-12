import * as diaryActions from '../actions/Diary';

const initialState = {
    date: {},
    content: '',
    emotion: ''
};

const diaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case diaryActions.LOAD_DIARY:
            return {
                date: action.date,
                content: action.content,
                emotion: action.emotion
            };
        case diaryActions.INIT_DIARY:
            return initialState;
        case diaryActions.SAVE_DIARY:
            if (action.emotion !== null) {
                return {
                    ...state,
                    content: action.content,
                    emotion: action.emotion
                };
            } else {
                console.log('No rows updated!');
                return state;
            }
        default:
            return state;
    }
};

export default diaryReducer;