import { 
    LOAD_SAYING_SETTING,
    SAVE_SAYING_SETTING,
    LOAD_SAYING,
    SAVE_SAYING 
} from '../actions/Saying';
import Setting from '../../models/Setting';

const FUNCTION_NAME = 'saying';
const initialState = {
    setting: [],
    saying: ''
};

const findSetting = (state, settingName) => {
    let settingIndex;
    state.setting.forEach((val, idx) => {
        if (val.content === settingName) {
            settingIndex = idx;
        }
    });
    return settingIndex;
}

const sayingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SAYING_SETTING:
            if (action.setting.rows.length > 0) {
                let setting = [];
                let rows = action.setting.rows;
                for (let i = 0; i < rows.length; i++) {
                    let item = rows.item(i);
                    setting.push(new Setting(FUNCTION_NAME, item.content, item.setting_detail));
                }
                return {
                    ...state,
                    setting: setting
                };
            } else {
                console.log('No row fetched!');
                return state;
            }
        case SAVE_SAYING_SETTING:
            let newSetting = new Setting(FUNCTION_NAME, action.setting.content, action.setting.setting_detail);
            let settingIndex = findSetting(state, action.setting.content);
            if (settingIndex >= 0) {
                state.setting.splice(settingIndex, 1, newSetting);
                return {
                    ...state,
                    setting: JSON.parse(JSON.stringify(state.setting))
                }
            } else {
                return {
                    ...state,
                    setting: state.setting.concat(newSetting)
                }
            }
        case LOAD_SAYING:
            return {
                ...state,
                saying: action.saying
            }
        case SAVE_SAYING:
            return {
                ...state,
                saying: action.saying
            }
        default:
            return state;
    }
};

export default sayingReducer;