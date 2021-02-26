// Standard
import { Dimensions } from 'react-native';

const Statistics = {
    emotionSize: {
        size1_min_number: 1,
        size1_max_number: 7,
        size2_min_number: 8,
        size2_max_number: 15,
        size3_min_number: 16,
        size3_max_number: 22,
        size4_min_number: 23,
        size1_width: 46,
        size1_height: 40,
        size2_width: 66,
        size2_height: 60,
        size3_width: 86,
        size3_height: 80,
        size4_width: 106,
        size4_height: 100,
    },
    emotionWidthRange: Math.floor( Dimensions.get('window').width / 4 ),
    emotionHeightRange: Math.floor( Dimensions.get('window').height / 20 ),
};

export default Statistics;
