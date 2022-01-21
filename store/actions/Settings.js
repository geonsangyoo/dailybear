import {fetchSetting, upsertSetting} from '../../helpers/db_setting';

export const LOAD_SETTING = 'LOAD_SETTING';
export const SAVE_SETTING = 'SAVE_SETTING';
export const RESET_SETTING = 'RESET_SETTING';

export const loadSetting = () => {
  return async (dispatch) => {
    let setting;
    try {
      console.log('Load Setting...');
      setting = await fetchSetting();
      console.log(
        'Result Load [Setting] -> the number of entries ' + setting.rows.length,
      );
      if (setting.rows.length > 0) {
        for (let i = 0; i < setting.rows.length; i++) {
          await dispatch({
            type: LOAD_SETTING,
            setting: {
              function: setting.rows.item(i).function,
              content: setting.rows.item(i).content,
              setting_detail: setting.rows.item(i).setting_detail,
            },
          });
        }
      } else {
        console.log('No entry fetched! -> Resetting......');
        dispatch({
          type: RESET_SETTING,
        });
      }
    } catch (err) {
      console.log('DB transasction error!!');
      throw err;
    }
  };
};

export const saveSetting = (function_, content, setting_detail) => {
  return async (dispatch) => {
    let setting;
    try {
      console.log('Save [Setting] -> ' + function_);
      await upsertSetting(function_, content, setting_detail);
      setting = await fetchSetting(function_, content);
      if (setting.rows.length > 0) {
        console.log('fetch -> ' + JSON.stringify(setting.rows.item(0)));
        dispatch({
          type: LOAD_SETTING,
          setting: {
            function: setting.rows.item(0).function,
            content: setting.rows.item(0).content,
            setting_detail: setting.rows.item(0).setting_detail,
          },
        });
      } else {
        console.log('No entry fetched! -> Resetting......');
        dispatch({
          type: RESET_SETTING,
        });
      }
    } catch (err) {
      console.log('DB transasction error!!');
      throw err;
    }
  };
};
