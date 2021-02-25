// Standard
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

// Custom
import Colors from '../../constants/Colors';
import SettingConstants from '../../constants/Setting';

const Header = props => {

    const maxLine = 4;
    const fontNameSetting = useSelector(state => state.settings.fontName);
    const [truncateText, setTruncateText] = useState();
    
    useEffect(() => {
        setTruncateText(null);
    }, [props.saying]);
    
    return (
        <View style={ styles.container }>
            <Text style={{ ...styles.year,
                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}>
                { props.getDate.getFullYear() }
            </Text>
            <Text style={{ ...styles.month,
                fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont}}>
                { props.getDate.getMonth() + 1 }
            </Text>
            <Pressable 
                style={ styles.sayingContainer } 
                onPress={
                    () => { 
                            props.parentProps.navigation.navigate("SayingDetail", {
                                saying: props.saying,
                                mode: props.mode
                        })
                    }
                }
            >
                <Text
                    style={{ ...styles.saying,
                        fontFamily: fontNameSetting ? fontNameSetting : SettingConstants.defaultFont }}
                    numberOfLines={ 4 }
                    ellipsizeMode='tail'
                    onTextLayout={ ({ nativeEvent: { lines } }) => {
                        if (lines.length === maxLine) {
                            if (lines[maxLine-1].text.indexOf('\n') !== -1) {
                                let editedTruncateText = '';
                                lines[maxLine-1].text = lines[maxLine-1].text.replace('\n', "...");
                                (async function() {
                                    for await (let line of lines) {
                                        editedTruncateText = editedTruncateText.concat(line.text);
                                        setTruncateText(editedTruncateText);
                                    }
                                })();
                            }
                        }
                    }}
                >
                    {  ( truncateText ) ? 
                        ( truncateText ) : 
                        ( props.saying ? props.saying : '__' ) 
                    }
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    },
    year: {
        textAlign: 'center',
        top: '15%',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 20,
        color: Colors.HeaderTitle_gray
    },
    month: {
        textAlign: 'center',
        top: '15%',
        fontWeight: '900',
        fontSize: 45,
        color: Colors.HeaderTitle_gray
    },
    sayingContainer: {
        marginTop: '5%',
        marginLeft: 40,
        marginRight: 40
    },
    saying: {
        textAlign: 'center',
        top: '25%',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    }
});

export default Header;