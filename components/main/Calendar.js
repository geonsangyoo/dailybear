// Standard
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Custom
import Bear from '../ui/Bear';
import * as calendarConsts from '../../constants/Calendar';
import Colors from '../../constants/Colors';

const Calendar = props => {
    var rows = [];

    const generateDayMatrix = (activeDate) => {
        let matrix = [];
        let year = activeDate.getFullYear();
        let month = activeDate.getMonth();
        let firstDay = new Date(year, month, 1).getDay();
        let maxDays = calendarConsts.nDays[month];
        let counter = 1;
        matrix[0] = calendarConsts.weekDays;
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
              maxDays += 1;
            }
        }
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
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
    
        matrix = generateDayMatrix(activeDate);
        rows = matrix.map((row, rowIndex) => {
            let rowItems = row.map((item, colIndex) => {
                let isValid;
                isValid = (item == -1) ? false : true;
                if (rowIndex == 0) {
                    return (
                        <Text key={ keyCounter++ } style={ styles.Days }>{ matrix[rowIndex][colIndex] }</Text>
                    );
                } else {
                    return (
                        <Bear
                            isValid={ isValid }
                            onPress={ () => { /* ToDo */ } } 
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
    }

    rows = renderCalendar(props.getDate);

    return (
        <View style={ styles.calendarContainer }>
            { rows }
        </View>
    );
};

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 2
    },
    rowConatiner: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    Days: {
        fontSize: 11,
        fontFamily: 'SFProText-Regular',
        fontWeight: '800',
        color: Colors.DaysTitle_white
    }
});

export default Calendar;