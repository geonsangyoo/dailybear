// Standard
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

// Custom
import Colors from '../../constants/Colors';

const Header = props => {
    const maxLine = 4;
    const [truncateText, setTruncateText] = useState();
    
    useEffect(() => {
        setTruncateText(null);
    }, [props.saying]);
    
    return (
        <View style={ styles.container }>
            <Text style={ styles.year }>
                { props.getDate.getFullYear() }
            </Text>
            <Text style={ styles.month }>
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
                    style={ styles.saying }
                    numberOfLines={ 4 }
                    ellipsizeMode='tail'
                    onTextLayout={ ({ nativeEvent: { lines } }) => {
                        console.log("Text Layout -> " + lines.length);
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
        flex: 1
    },
    year: {
        textAlign: 'center',
        top: '15%',
        fontFamily: 'SFProText-Regular',
        fontStyle: 'normal',
        fontWeight: '900',
        fontSize: 20,
        color: Colors.HeaderTitle_gray
    },
    month: {
        textAlign: 'center',
        top: '15%',
        fontFamily: 'SFProText-Bold',
        fontWeight: '900',
        fontSize: 45,
        color: Colors.HeaderTitle_gray
    },
    sayingContainer: {
        flex: 1,
        marginTop: '5%',
        marginLeft: 40,
        marginRight: 40
    },
    saying: {
        textAlign: 'center',
        top: '25%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    }
});

export default Header;