// Standard
import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

// Custom
import Background from '../../components/layout/Background';
import Card from '../../components/ui/Card';
import Colors from '../../constants/Colors';

const PLACEHOLDER = "Daily Bear sends you a message \n that changes every month.";

const SayingDetail = props => {
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
    return (
        <Background style={{ flex: 1}}>
            <View style={{ flex: 1,  justifyContent: 'flex-start', alignItems: 'center' }}>
                <Text style={ styles.saying }>
                        { `Do not be afraid to give up \n the good to go for the great` }
                </Text>
                <Card style={ styles.description }>
                    <TextInput 
                        editable={ true }
                        multiline={ true }
                        onChangeText={(text) => { /*ToDo*/ }}
                        placeholder={ PLACEHOLDER }
                    />
                </Card>
            </View>
        </Background>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    saying: {
        textAlign: 'center',
        top: '17%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    },
    description: {
        top: '20%',
        width: '80%',
        height: '15%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        padding: 10
    }
});

export default SayingDetail;