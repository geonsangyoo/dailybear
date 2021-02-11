// Standard
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import Bear from '../ui/Bear';
import * as calendarConsts from '../../constants/Calendar';
import * as funcs from '../../helpers/funcs';
import Diary from '../../constants/Diary';
import Colors from '../../constants/Colors';

const Calendar = props => {

    var rows = [];
    const emotions = useSelector(state => state.calendar.emotions);
    const maxDays = funcs.getMaxDays(props.getDate.getFullYear(), props.getDate.getMonth());

    const generateDayMatrix = (activeDate) => {
        let matrix = [];
        let year = activeDate.getFullYear();
        let month = activeDate.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let counter = 1;
        
        matrix[0] = calendarConsts.weekDays;

        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if ((row == 1 && col >= firstDay) || (row > 1 && counter <= maxDays)) {
                    matrix[row][col] = counter++;
                }
            }
        }

        return matrix;
    };

    const renderCalendar = (activeDate) => {
        let matrix = [];
        let rows = [];
        let keyCounter = 1;
        let emotion;

        matrix = generateDayMatrix(activeDate);

        rows = matrix.map((row, rowIndex) => {
            let rowItems = row.map((item, colIndex) => {
                let isValid;
                isValid = (item == -1) ? false : true;
                if (rowIndex == 0) {
                    return (
                        <View key={ keyCounter++ } style={ styles.viewDays }>
                            <Text style={ styles.Days }>
                                { matrix[rowIndex][colIndex] }
                            </Text>
                        </View>
                    );
                } else {
                    if (isValid) {
                        emotion = emotions[matrix[rowIndex][colIndex] - 1].emotion;
                        emotion = (emotion === -1) ? Diary.emotionTitle.NONE : emotion;
                    } else {
                        emotion = Diary.emotionTitle.NONE;
                    }
                    return (
                        <Bear
                            isValid={ isValid }
                            emotionTitle={ emotion }
                            onPress={() => {
                                props.diaryHandler.call(
                                    props.parent,
                                    activeDate.getFullYear(),
                                    activeDate.getMonth() + 1,
                                    matrix[rowIndex][colIndex],
                                    calendarConsts.weekDaysLong[colIndex],
                                    emotions[matrix[rowIndex][colIndex] - 1].emotion
                                );
                            }}
                            key={ keyCounter++ }
                        />
                    );
                }
            });
            return (
                <View key={ rowIndex } style={ styles.rowConatiner }>
                    { rowItems }
                </View>
            );
        });

        return rows;
    };

    if (emotions.length === maxDays) {
        rows = renderCalendar(props.getDate);
    }

    return (
        <View style={ styles.calendarContainer }>
            { rows }
        </View>
    );

};

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 2,
        marginTop: '5%',
    },
    rowConatiner: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 25,
        marginVertical: 12,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    viewDays: {
        top: 20,
        marginBottom: 15
    },
    Days: {
        paddingLeft: 10,
        fontSize: 11,
        fontFamily: 'SFProText-Regular',
        fontWeight: '800',
        color: Colors.DaysTitle_white
    }
});

export default Calendar;
