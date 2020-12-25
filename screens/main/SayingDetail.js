// Standard
import React, { useState, useLayoutEffect, useCallback } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput,
    Button,
    ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useHeaderHeight } from '@react-navigation/stack';

// Custom
import * as sayingActions from '../../store/actions/Saying';
import Background from '../../components/layout/Background';
import Card from '../../components/ui/Card';
import IconButton from '../../components/ui/IconButton';
import Colors from '../../constants/Colors';

const SayingDetail = props => {
    
    const placeholder = 'Please enter a message.';
    const dispatch = useDispatch();
    const isDate = useSelector(state => state.calendar.activeDate);
    const saying = useSelector(state => state.saying.saying);
    const [mode, setMode] = useState(props.route.params?.mode);
    const [sayingText, setSayingText] = useState(props.route.params?.saying);
    
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Button
                    color={ Colors.HeaderTitle_gray }
                    title='Save'
                    onPress={ saveModeHandler }
                />
            )
        });
    });

    const saveModeHandler = useCallback(async () => {
        dispatch(sayingActions.saveSaying(isDate.getFullYear(), parseInt(isDate.getMonth()) + 1, sayingText, mode));
        props.navigation.goBack();
    }, [mode, sayingText]);

    const switchModeHandler = ModeName => {
        if (ModeName !== "Write") {
            setSayingText("");
        }
        setMode(ModeName);
    };

    return (
        <Background style={ styles.container }>
            <View style={ styles.container }>
                <ScrollView contentContainerStyle={{ ...styles.container, top: useHeaderHeight() }}>
                    <Text style={ styles.saying }>
                            { saying ? saying : '__' }
                    </Text>
                    <View style={ styles.sayingMode }>
                        <IconButton
                            setting={ mode }
                            name="Random"
                            clickHandler={ switchModeHandler }
                        />
                        <IconButton
                            setting={ mode }
                            name="Write"
                            clickHandler={ switchModeHandler }
                        />
                        <IconButton
                            setting={ mode }
                            name="No"
                            clickHandler={ switchModeHandler }
                        />
                    </View>

                    { (mode === "Write") ?
                        <Card style={ styles.description }>
                                <TextInput
                                    style={ styles.input }  
                                    editable={ true }
                                    multiline={ true }
                                    onChangeText={(text) => { setSayingText(text); }}
                                    value={ sayingText }
                                    placeholder={ placeholder }
                                    keyboardType='default'
                                />
                        </Card>
                        : <View></View>
                    }
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
    sayingMode: {
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