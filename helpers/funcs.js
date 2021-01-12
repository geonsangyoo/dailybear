// Standard
import { useState } from 'react';

// Custom
import * as calendarConsts from '../constants/Calendar';

export const useConstructor = async (callback = () => {}) => {
    const [called, setCalled] = useState(false);
    if (called) {
        return;
    }
    callback();
    setCalled(true);
};

export const getMaxDays = (year, month) => {
    let maxDays = calendarConsts.nDays[month];
    if (month == 1) { // February
        if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            maxDays += 1;
        }
    }
    return maxDays;
};