// Standard
import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, StatusBar, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

// Custom
import * as settingsAction from '../../store/actions/Settings';
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

    const changeFontName = useCallback(() => {
        dispatch(settingsAction.saveSetting("font", "name", fontNameState));
    }, [fontNameState]);

    useEffect(() => {
        setNotificationState(notificationSetting);
        setiCloudSyncState(iCloudSyncSetting);
        setFontNameState(fontNameSetting);
    }, []);

    useEffect(() => {
        if (fontNameState !== '') {
            styles.settingText = {
                ...styles.settingText,
                fontFamily: fontNameState
            };
        }
    }, [fontNameState]);

    return (
        <View style={ styles.container }>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
            <Background style={ styles.container }>
                <View style={ styles.headerContainer }>
                    <Text style={ styles.headerTitle }>Setting</Text>
                </View>
                <View style={ styles.contentContainer }>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>A word of this month</Text>
                        <Pressable style={ styles.settingContainer }
                            onPress={() => { 
                                props.navigation.navigate("SayingDetail", {
                                    saying: saying,
                                    mode: sayingMode
                                });
                            }}
                        >
                            <Text style={ styles.settingText }>{ sayingMode }</Text>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Notification</Text>
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
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Synchronize iCloud</Text>
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
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Font</Text>
                        <Pressable style={ styles.settingContainer }>
                            <Text style={ styles.settingText }>ABCDEFGHI..</Text>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Praise the Developer</Text>
                        <Pressable style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Send any good opinion</Text>
                        <Pressable style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </Pressable>
                    </View>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Terms and conditions</Text>
                        <Pressable style={ styles.settingContainer }>
                            <Image 
                                style={ styles.image }
                                source={ require('../../assets/icons/setting_arrow.png') }
                            />
                        </Pressable>
                    </View>
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
        fontFamily: 'SFProText-Bold',
        fontWeight: '900',
        fontSize: 26,
        color: Colors.HeaderTitle_gray
    },
    contentContainer: {
        top: '11%',
        marginTop: 50,
        left: '7%',
    },
    contentRow: {
        flexDirection: 'row',
    },
    contentText: {
        marginVertical: 20,
        fontFamily: 'SFProText-Regular',
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
        fontFamily: 'SFProText-Regular',
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
