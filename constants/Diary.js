const Diary = {
    diaryIntro: "How was your day?",
    placeholder: "Write down how you felt today.\nIt's okay though you don't :)",
    cancelMessage: "Your story is not saved.\nAre you sure to close?",
    emotionTitle: {
        ANGRY: 0,
        CALM: 1,
        LOVELY: 2,
        GLOOMY: 3,
        SAD: 4,
        MELANCHOLY: 5
    },
    emotionBears: [
        {
            name: "angry",
            imgPath: require('../assets/images/main_bear_4.png')
        },
        {
            name: "calm",
            imgPath: require('../assets/images/main_bear_1.png')
        },
        {
            name: "lovely",
            imgPath: require('../assets/images/main_bear_3.png')
        },
        {
            name: "gloomy",
            imgPath: require('../assets/images/main_bear_2.png')
        },
        {
            name: "sad",
            imgPath: require('../assets/images/main_bear_5.png')
        },
        {
            name: "melancholy",
            imgPath: require('../assets/images/main_bear_6.png')
        }
    ],
    footerIcons: {
        EDIT: {
            imgPath: require('../assets/icons/diary_edit.png')
        },
        SHARE: {
            imgPath: require('../assets/icons/share.png')
        },
        DELETE: {
            imgPath: require('../assets/icons/delete.png')
        },
        LEFT: {
            imgPath: require('../assets/icons/left.png')
        },
        RIGHT: {
            imgPath: require('../assets/icons/right.png')
        }
    },
    convertDate: (year, month, date, day) => {
        return String(year)
            .concat('.')
            .concat(String(month).padStart(2, '0'))
            .concat('.')
            .concat(String(date).padStart(2, '0'))
            .concat('  ')
            .concat(day);
    }
};
export default Diary;
