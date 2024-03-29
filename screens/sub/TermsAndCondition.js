// Standard
import React from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

// Custom
import Setting from '../../constants/Setting';
import Background from '../../components/layout/Background';
import Colors from '../../constants/Colors';

const TermsAndCondition = (props) => {
  const fontNameSetting = useSelector((state) => state.settings.fontName);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <Background style={styles.container}>
        <ScrollView style={styles.scrollContainer}>
          <Text
            style={{
              ...styles.contentText,
              fontFamily: fontNameSetting
                ? fontNameSetting
                : Setting.defaultFont,
            }}>
            {Setting.termsAndConditions}
          </Text>
        </ScrollView>
      </Background>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    top: '2%',
    marginTop: 80,
    marginBottom: 80,
  },
  textContainer: {
    marginVertical: 15,
    marginHorizontal: 15,
  },
  contentText: {
    marginHorizontal: 10,
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 19,
    color: Colors.HeaderTitle_gray,
  },
});

export default TermsAndCondition;
