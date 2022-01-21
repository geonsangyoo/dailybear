/* eslint-disable radix */
// Standard
import React, {useReducer, useState, useLayoutEffect, useCallback} from 'react';
import {StyleSheet, View, Text, TextInput, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {useHeaderHeight} from '@react-navigation/stack';

// Custom
import * as sayingActions from '../../store/actions/Saying';
import SettingConstants from '../../constants/Setting';
import Background from '../../components/layout/Background';
import Card from '../../components/ui/Card';
import IconButton from '../../components/ui/IconButton';
import Colors from '../../constants/Colors';
import Sayings from '../../constants/Saying';

const SayingDetail = (props) => {
  const INPUT_CHANGE = 'INPUT_CHANGE';
  const sayingHeader = Sayings.sayingHeader;
  const placeholder = Sayings.placeholder;
  const randomTextInfo = Sayings.randomTextInfo;
  const fontNameSetting = useSelector((state) => state.settings.fontName);
  const isDate = useSelector((state) => state.calendar.activeDate);
  const [mode, setMode] = useState(props.route.params?.mode);
  const dispatch = useDispatch();

  const inputReducer = (state, action) => {
    switch (action.type) {
      case INPUT_CHANGE:
        return {
          ...state,
          value: action.value,
        };
      default:
        return state;
    }
  };

  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: props.route.params?.saying ? props.route.params?.saying : '',
  });

  const saveModeHandler = useCallback(async () => {
    if (mode !== Sayings.writeMode) {
      inputState.value = '';
    }
    dispatch(
      sayingActions.saveSaying(
        isDate.getFullYear(),
        parseInt(isDate.getMonth()) + 1,
        inputState.value,
        mode,
      ),
    );
    props.navigation.goBack();
  }, [mode, dispatch, isDate, inputState.value, props.navigation]);

  const switchModeHandler = (ModeName) => {
    setMode(ModeName);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
          type="clear"
          titleStyle={{
            ...styles.headerRightText,
            fontFamily: fontNameSetting
              ? fontNameSetting
              : SettingConstants.defaultFont,
          }}
          onPress={saveModeHandler}
        />
      ),
      headerRightContainerStyle: styles.headerRightContainer,
    });
  });

  return (
    <Background style={styles.container}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{...styles.container, top: useHeaderHeight()}}
          bounces={false}>
          <Text
            style={{
              ...styles.saying,
              fontFamily: fontNameSetting
                ? fontNameSetting
                : SettingConstants.defaultFont,
            }}>
            {sayingHeader}
          </Text>
          <View style={styles.sayingMode}>
            <IconButton
              setting={mode}
              name={Sayings.randomMode}
              clickHandler={switchModeHandler}
            />
            <IconButton
              setting={mode}
              name={Sayings.writeMode}
              clickHandler={switchModeHandler}
            />
            <IconButton
              setting={mode}
              name={Sayings.noneMode}
              clickHandler={switchModeHandler}
            />
          </View>
          {mode === Sayings.randomMode ? (
            <Card style={styles.descriptionRandom}>
              <TextInput
                style={{
                  ...styles.input,
                  fontFamily: fontNameSetting
                    ? fontNameSetting
                    : SettingConstants.defaultFont,
                }}
                editable={false}
                multiline={true}
                value={randomTextInfo}
                placeholder={placeholder}
              />
            </Card>
          ) : null}
          {mode === Sayings.writeMode ? (
            <Card style={styles.description}>
              <TextInput
                style={{
                  ...styles.input,
                  fontFamily: fontNameSetting
                    ? fontNameSetting
                    : SettingConstants.defaultFont,
                }}
                editable={true}
                multiline={true}
                onChangeText={(text) => {
                  dispatchInput({
                    type: INPUT_CHANGE,
                    value: text,
                  });
                }}
                value={inputState.value}
                placeholder={placeholder}
                keyboardType="default"
              />
            </Card>
          ) : null}
        </ScrollView>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 14,
  },
  scrollView: {
    margin: 5,
    height: '100%',
  },
  sayingMode: {
    top: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  saying: {
    textAlign: 'center',
    top: '5%',
    fontSize: 15,
    color: Colors.HeaderTitle_gray,
  },
  descriptionRandom: {
    justifyContent: 'center',
    top: '10%',
    width: '80%',
    height: '20%',
    margin: 20,
    alignSelf: 'center',
  },
  description: {
    top: '10%',
    width: '80%',
    height: '20%',
    margin: 20,
    alignSelf: 'center',
  },
  input: {
    margin: 20,
    textAlign: 'center',
  },
  headerRightText: {
    color: Colors.HeaderTitle_gray,
    fontSize: 17,
  },
});

export default SayingDetail;
