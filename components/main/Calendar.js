// Standard
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

// Custom
import Bear from '../ui/Bear';
import * as calendarConsts from '../../constants/Calendar';

const Calendar = props => {
    const [getDate, setDate] = useState(new Date());
    const generateDayMatrix = () => {
        let matrix = [];
        let year = getDate.getFullYear();
        let month = getDate.getMonth();
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

    var matrix = [];
    var rows = [];

    matrix = generateDayMatrix();
    rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {
            let isValid;
            isValid = (item == -1) ? false : true;
            return (
                <Bear
                    isValid={ isValid }
                    onPress={ () => { /* ToDo */ } } 
                />
            );
        });
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                padding: 15,
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                { rowItems }
            </View>
        );
    });
    return (
        <View>
            { rows }
        </View>
    );
};

export default Calendar;