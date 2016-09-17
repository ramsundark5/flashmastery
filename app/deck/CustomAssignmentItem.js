import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { Button } from '../common/Common';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class CustomAssignmentItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            text: props.assignment.word
        };
    }

    _onEditComplete(){
        this.setState({isEditing : false});
    }

    _startEditMode(){
        this.setState({isEditing : true});
    }

    render(){
        const {assignment} = this.props;
        const {text, isEditing} = this.state;
        if(isEditing){
            return this._renderEditableAssignmentItem(assignment);
        }
        return (
            <TouchableOpacity style={[styles.assignmentItem]} onLongPress={() => this._startEditMode()}>
                <Text style={styles.vocabText}>{text}</Text>
            </TouchableOpacity>
        );
    }

    _renderEditableAssignmentItem(assignment){
        return(
            <View style={styles.editTextInputContainer}>
                <TextInput
                    ref='editTextInput'
                    blurOnSubmit
                    style={[styles.editTextInput]}
                    value={this.state.text}
                    onChangeText={(changedText) => this.setState({text: changedText})} 
                    onEndEditing={() => this._onEditComplete()}
                    onBlur={() => this._onEditComplete()}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    assignmentItem:{
        marginBottom: 10,
        backgroundColor: '#EEEEEE'
    },
    vocabText:{
        padding: 10,
        fontSize: 20,
        color: '#0277BD'
    },
    editTextInputContainer: {
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1.5,
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        padding: 10
    },
    editTextInput: {
        height  : 26,
        fontSize: 20,
        flex    : 1,
        color: '#0277BD',
    },
});