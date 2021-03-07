// Standard
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, StatusBar, Image, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { openComposer } from 'react-native-email-link';
import InAppReview from 'react-native-in-app-review';

// Custom
import * as settingsAction from '../../store/actions/Settings';
import SettingConstants from '../../constants/Setting';
import Colors from '../../constants/Colors';
import Background from '../../components/layout/Background';

const Setting = props => {
    
    const saying = useSelector(state => state.saying.saying);
    const sayingMode = useSelector(state => state.saying.mode);
    const notificationSetting = useSelector(state => state.settings.notification);
    const iCloudSyncSetting = useSelector(state => state.settings.iCloudSync);
    const fontNameSetting = useSelector(state => state.settings.fontName);
    const [notificationState, setNotificationState] = useState('');
    const [iCloudSyncState, setiCloudSyncState] = useState('');
    const [fontNameState, setFontNameState] = useState('');
    const dispatch = useDispatch();

    const changeNotification = useCallback((val) => {
        dispatch(settingsAction.saveSetting("notification", "flag", val ? "true" : "false"));
    }, [notificationState]);

    const changeiCloudSync = useCallback((val) => {
        dispatch(settingsAction.saveSetting("iCloudSync", "flag", val ? "true" : "false"));
    }, [iCloudSyncState]);

    useEffect(() => {
        setNotificationState(notificationSetting);
        setiCloudSyncState(iCloudSyncSetting);
        setFontNameState(fontNameSetting);
    }, [notificationSetting, iCloudSyncSetting, fontNameSetting]);

    return (
        <View style={ styles.container }>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
            <Background style={ styles.container }>
                <View style={ styles.headerContainer }>
                    <Text style={{ ...styles.headerTitle,
                        fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                    }}>
                        Setting
                    </Text>
                </View>
                <View style={ styles.contentContainer }>
                    <Pressable style={ styles.contentRow }
                        onPress={() => { 
                            props.navigation.navigate("SayingDetail", {
                                saying: saying,
                                mode: sayingMode
                            });
                        }}
                    >
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            A word of this month
                        </Text>
                        <View style={ styles.settingContainer }>
                            <Text style={{ ...styles.settingText,
                                fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont }}>
                                { sayingMode }
                            </Text>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </View>
                    </Pressable>
                    <View style={ styles.contentRow }>
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Notification
                        </Text>
                        <Switch
                            style={ styles.settingSwitch }
                            ios_backgroundColor={ Colors.SettingSwitchOff_brown }
                            trackColor={{ true: Colors.SettingTitle_brown }}
                            value={ notificationState === "true" ? true : false }
                            onValueChange={(newValue) => {
                                setNotificationState(newValue ? "true" : "false");
                                changeNotification(newValue);
                            }}
                        />
                    </View>
                    {/*
                    <View style={ styles.contentRow }>
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Synchronize iCloud
                        </Text>
                        <Switch
                            style={ styles.settingSwitch }
                            ios_backgroundColor={ Colors.SettingSwitchOff_brown }
                            trackColor={{ true: Colors.SettingTitle_brown }}
                            value={ iCloudSyncState === "true" ? true : false }
                            onValueChange={(newValue) => {
                                setiCloudSyncState(newValue ? "true" : "false");
                                changeiCloudSync(newValue);
                            }}
                        />
                    </View>
                    */}
                    <Pressable style={ styles.contentRow }
                        onPress={() => { 
                            props.navigation.navigate("FontSetting");
                        }}
                    >
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Font
                        </Text>
                        <View style={ styles.settingContainer }>
                            <Text style={{ ...styles.exampleText,
                                fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                            }}>
                                ABCDEFGHI..
                            </Text>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </View>
                    </Pressable>
                    <Pressable style={ styles.contentRow }
                        onPress={() => {
                            if (InAppReview.isAvailable()) {
                                InAppReview.RequestInAppReview();
                            } else {
                                Alert.alert(
                                    'Warning',
                                    'Rating screen is not provided!',
                                    [
                                        {
                                            text: 'OK',
                                            style: 'destructive',
                                        }
                                    ],
                                    {
                                        cancelable: false
                                    }
                                );
                            }
                        }}
                    >
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Praise the Developer
                        </Text>
                        <View style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </View>
                    </Pressable>
                    <Pressable style={ styles.contentRow }
                        onPress={() => {
                            openComposer({
                                to: 'geonsangyoo@gmail.com',
                                cc: 'strawchoo@naver.com',
                                subject: '【Daily Bear】> 건의사항',
                            }).then(res => {
                                console.log("Email is opened!")
                            }, err => {
                                Alert.alert(
                                    'Error',
                                    'Email Application is not found!',
                                    [
                                        {
                                            text: 'OK',
                                            style: 'destructive'
                                        }
                                    ],
                                    {
                                        cancelable: false
                                    }
                                );
                            });
                        }}
                    >
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Send any good opinion
                        </Text>
                        <View style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </View>
                    </Pressable>
                    <Pressable style={ styles.contentRow }
                        onPress={() => { 
                            props.navigation.navigate("TermsAndCondition");
                        }}
                    >
                        <Text style={{ ...styles.contentText,
                            fontFamily: fontNameState ? fontNameState : SettingConstants.defaultFont
                        }}>
                            Terms and conditions
                        </Text>
                        <View style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </View>
                    </Pressable>
                </View>
            </Background>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        top: '12%',
        alignSelf: 'center'
    },
    headerTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 26,
        color: Colors.HeaderTitle_gray
    },
    contentContainer: {
        top: '11%',
        left: '7%',
        marginTop: 50,
    },
    contentRow: {
        flexDirection: 'row',
    },
    contentText: {
        marginVertical: 20,
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.HeaderTitle_gray
    },
    exampleText: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.HeaderTitle_gray
    },
    settingContainer: {
        position: 'absolute',
        flexDirection: 'row',
        right: '13%',
        marginTop: 20,
    },
    settingText: {
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        color: Colors.SettingTitle_brown,
    },
    settingSwitch: {
        position: 'absolute',
        right: '13%',
        marginTop: 12,
    },
    image: {
        marginTop: 3,
        marginLeft: 3,
        width: 16,
        height: 16,
    },
});

export default Setting;
