// Custom
import * as settingsAction from '../actions/Settings';

const initialState = {
    notification: "false",
    iCloudSync: "false",
    fontName: 'SFProText-Regular'
};

const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case settingsAction.LOAD_SETTING:
            return {
                ...state,
                notification: 
                    ( action.setting.function === "notification" ) ? action.setting.setting_detail
                    : state.notification,
                iCloudSync: 
                    ( action.setting.function === "iCloudSync" ) ? action.setting.setting_detail
                    : state.iCloudSync,
                fontName: 
                    ( action.setting.function === "font" ) ? action.setting.setting_detail
                    : state.fontName,
            };
        case settingsAction.RESET_SETTING:
            return initialState;
        default:
            return state;
    }
};

export default settingsReducer;
