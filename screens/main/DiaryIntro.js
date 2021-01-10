// Standard
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import Diary from '../../constants/Diary';
import Background from '../../components/layout/Background';
import RectangleBox from '../../components/ui/RectangleBox';
import Colors from '../../constants/Colors';

const DiaryIntro = props => {
    const date = useSelector(status => status.diary.date);
    const dateString = Diary.convertDate(date.year, date.month, date.date, date.day);
    const navigateDetail = emotion => {
        props.navigation.navigate("DiaryDetail", {
            dateString: dateString,
            emotion: emotion
        })
    }
    return (
        <Background style={ styles.container }>
            <View style={ styles.container }>
                <View style={ styles.textContainer }>
                    <Text style={ styles.dateTextStyle }>
                        { dateString }
                    </Text>
                    <Text style={ styles.diaryIntroTextStyle }>
                        { Diary.diaryIntro }
                    </Text>
                </View>
                <View style={ styles.contentContainer }>
                    <RectangleBox style={ styles.rectangleBoxContainer }>
                        <View style={ styles.emotionBearContainer }>
                            <View style={ styles.emotionBearRow }>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.ANGRY) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.ANGRY].imgPath }
                                    />
                                </Pressable>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.CALM) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.CALM].imgPath }
                                    />
                                </Pressable>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.LOVELY) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.LOVELY].imgPath }
                                    />
                                </Pressable>
                            </View>
                            <View style={ styles.emotionBearRow }>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.GLOOMY) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.GLOOMY].imgPath }
                                    />
                                </Pressable>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.SAD) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.SAD].imgPath }
                                    />
                                </Pressable>
                                <Pressable onPress={ navigateDetail.bind(this, Diary.emotionTitle.MELANCHOLY) }>
                                    <Image 
                                        style={ styles.image }
                                        source={ Diary.emotionBears[Diary.emotionTitle.MELANCHOLY].imgPath }
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </RectangleBox>
                </View>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textContainer: {
        flex: 1,
        top: '12%'
    },
    image: {
        width: 76,
        height: 70,
        marginHorizontal: 18
    },
    dateTextStyle: {
        color: Colors.HeaderTitle_gray,
        fontSize: 13,
        fontFamily: 'SFProText-Bold',
        fontStyle: 'normal',
        fontWeight: '900',
        textAlign: 'center'
    },
    diaryIntroTextStyle: {
        marginTop: 8,
        color: Colors.HeaderTitle_gray,
        fontSize: 24,
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '400',
        textAlign: 'center'
    },
    contentContainer: {
        flex: 4,
    },
    rectangleBoxContainer: {
        alignSelf: 'center',
        marginTop: 15
    },
    emotionBearContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    emotionBearRow: {
        flexDirection: 'row',
        alignContent: 'center',
        marginVertical: 20
    }
});

export default DiaryIntro;