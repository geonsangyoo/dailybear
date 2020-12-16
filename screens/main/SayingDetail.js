// Standard
import React, { useState, useLayoutEffect } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Button,
    ScrollView
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';

// Custom
import Background from '../../components/layout/Background';
import Card from '../../components/ui/Card';
import IconButton from '../../components/ui/IconButton';
import Colors from '../../constants/Colors';

const SayingDetail = props => {
    
    const placeholder = "Please enter a message.";
    const [setting, setSetting] = useState("Random");

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    color={ Colors.HeaderTitle_gray }
                    title='Save'
                    onPress={() => {
                        // To-Do
                    }}
                />
            )
        })
    });

    const switchSettingHandler = settingName => {
        setSetting(settingName);
    };

    return (
        <Background style={ styles.container }>
            <View style={ styles.container }>
                <ScrollView contentContainerStyle={{ ...styles.container, top: useHeaderHeight() }}>
                    <Text style={ styles.saying }>
                            { `Do not be afraid to give up \n the good to go for the great` }
                    </Text>
                    <View style={ styles.sayingSetting }>
                        <IconButton
                            setting={ setting }
                            name='Random'
                            clickHandler={ switchSettingHandler }
                        />
                        <IconButton
                            setting={ setting }
                            name="Write"
                            clickHandler={ switchSettingHandler }
                        />
                        <IconButton
                            setting={ setting }
                            name="No"
                            clickHandler={ switchSettingHandler }
                        />
                    </View>
                    <Card style={ styles.description }>
                        <TextInput
                            style={ styles.input }
                            editable={ true }
                            multiline={ true }
                            onChangeText={(text) => { /*ToDo*/ }}
                            placeholder={ placeholder }
                            keyboardType='default'
                        />
                    </Card>
                </ScrollView>
            </View>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        margin: 5,
        height: "100%"
    },
    sayingSetting: {
        top: '20%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    saying: {
        textAlign: 'center',
        top: '5%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    },
    description: {
        top: '13%',
        width: '80%',
        height: '20%',
        padding: 10,
        alignSelf: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        paddingTop: 0,
        paddingBottom: 0
    }
});

export default SayingDetail;