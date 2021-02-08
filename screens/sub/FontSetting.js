// Standard
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

// Custom
import Setting from '../../constants/Setting';
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const FontSetting = props => {
    return (
        <View style={ styles.container }>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent={ true }/>
            <Background style={ styles.container }>
                <View style={ styles.rectangleBoxContainer }>
                    <RectangleBox style={ styles.rectangleBox }>
                        <View style={ styles.container }>
                            <Image
                                style={ styles.image }
                                source={ Diary.emotionBears[Diary.emotionTitle.CALM].imgPath }
                            />
                            <Text style={ styles.previewTextStyle }>
                                { Setting.fontPreviewText }
                            </Text>
                        </View>
                    </RectangleBox>
                </View>
                <View style={ styles.contentContainer }>
                    <View style={ styles.contentRow }>
                        <Text style={ styles.contentText }>Default font</Text>
                        <View style={ styles.settingContainer }>
                            <Image 
                                style={ styles.checkIcon }
                                source={ require('../../assets/icons/setting_check.png') }
                            />
                            <Text style={ styles.settingText }>Selected</Text>
                        </View>
                    </View>
                </View>
            </Background>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rectangleBoxContainer: {
        flex: 1,
        top: '13%',
        alignSelf: 'center',
    },
    rectangleBox: {
        width: 335,
        height: 214,
        borderRadius: 10,
    },
    contentContainer: {
        flex: 2,
        left: '6%',
        marginHorizontal: 15,
        marginTop: 80,
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
        fontFamily: Setting.bmJua,
        fontWeight: 'normal',
        fontSize: 16,
        lineHeight: 19,
        marginLeft: 5,
        color: Colors.SettingTitle_brown,
    },
    checkIcon: {
        marginLeft: 3,
        width: 20,
        height: 20,
    },
    image: {
        width: 95,
        height: 87.5,
        alignSelf: 'center',
        marginTop: 35,
        marginBottom: 18,
        marginHorizontal: 18
    },
    previewTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 14,
        fontFamily: Setting.seoulHangang,
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
});

export default FontSetting;
