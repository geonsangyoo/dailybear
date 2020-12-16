// Standard
import React, { useLayoutEffect } from 'react';
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
import Colors from '../../constants/Colors';

const placeholder = "Please enter a message.";

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
        <Background style={ styles.container }>
            <View style={ styles.container }>
                <ScrollView contentContainerStyle={{ ...styles.container, top: useHeaderHeight() }}>
                    <Text style={ styles.saying }>
                            { `Do not be afraid to give up \n the good to go for the great` }
                    </Text>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollView: {
        margin: 5,
        height: "100%"
    },
    saying: {
        textAlign: 'center',
        top: '5%',
        fontFamily: 'SFProText-Regular',
        fontSize: 15,
        color: Colors.HeaderTitle_gray
    },
    description: {
        alignSelf: 'center',
        top: '15%',
        width: '80%',
        height: '15%',
        marginTop: 20,
        padding: 10
    },
    input: {
        width: '100%',
        height: '100%',
        paddingTop: 0,
        paddingBottom: 0
    }
});

export default SayingDetail;