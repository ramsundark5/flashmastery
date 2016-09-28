import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { HorizontalRow, Button } from '../common/Common';
import uuid from 'react-native-uuid';

export default class AddCardInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: ''
        };
    }

    _onAddCard(){
        let newCard = { id: uuid.v1(), front: this.state.text };
        this.setState({
            text: ''
        });
        this.props.addCardToDeck(newCard);
    }

    render(){
        return(
            <HorizontalRow style={styles.addCardContainer}>
                <View style={styles.addTextInputContainer}>
                    <TextInput
                            ref='addTextInput'
                            style={[styles.addTextInput]}
                            placeholder={'Type here..'}
                            value={this.state.text}
                            onChangeText={(changedText) => this.setState({text: changedText})}/>
                </View>

                <TouchableOpacity style={[styles.addButtonContainer]}>
                    <Button onPress={() => this._onAddCard()} 
                        style={styles.addButton} textStyle={styles.addButtonText}>
                        Add
                    </Button>
                </TouchableOpacity>
            </HorizontalRow>
        );
    }
}

const styles = StyleSheet.create({
    addButtonContainer:{
        marginLeft: 10
    },
    addButton:{
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        width: 50,
        height: 30
    },
    addButtonText:{
        color: 'white',
        fontSize: 14
    },
    addCardContainer:{
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 5 
    },
    addTextInputContainer: {
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1.5,
        flex: 1,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    addTextInput: {
        height  : 26,
        fontSize: 14,
        flex    : 1,
    },
});