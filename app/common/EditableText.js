import React, { Component } from 'react';
import {View, TextInput, Text, TouchableOpacity, StyleSheet} from 'react-native';
import HorizontalRow from './HorizontalRow';
import Icon from 'react-native-vector-icons/Ionicons';

export default class EditableText extends Component {
    constructor(props){
        super(props);
        this.state = {
            editableText: '',
            isEditing: false
        };
    }

    _showEditMode(text){
        if(this.props.editable){
            this.setState({editableText: text, isEditing: true});
        }
    }

    _cancelEditText(){
        this.setState({editableText: '', isEditing: false});
        if(this.props.cancelEditText){
            this.props.cancelEditText();
        }
    }

    _finishEditText(){
        
        //if(this.props.finishEditText){
            this.props.finishEditText(this.state.editableText);
        //}
        this.setState({editableText: '', isEditing: false});
    }

    render(){
        const {isEditing} = this.state;
        if(isEditing){
            return this._renderEditMode();
        }
        else{
            return this._renderViewMode();
        } 
    }

    _renderViewMode(){
        const {textContent} = this.props;
        return(
            <TouchableOpacity style={[styles.inputContainer, this.props.viewInputContainerStyle]} 
                    onLongPress={() => this._showEditMode(textContent)}>
                <Text style={[styles.viewText, this.props.viewTextStyle]}>{textContent}</Text>
            </TouchableOpacity>
        );
    }

	_renderEditMode() {
		return (
			<View style={[styles.inputContainer, this.props.editInputContainerStyle]}>
                <TextInput
                        ref='editCardInput'
                        style={[styles.editInput, this.props.editInputStyle]}
                        value={this.state.editableText}
                        onChangeText={(changedText) => this.setState({editableText: changedText})}/>
                <HorizontalRow style={[styles.editButtonContainer, this.props.editButtonContainerStyle]}>
                    <Icon name='ios-close-circle-outline' style={[styles.cancelIcon, this.props.cancelIconStyle]}
                        onPress={() => this._cancelEditText()}/>
                    <View style={styles.dummySpace}></View>
                    <Icon name='ios-checkmark-circle-outline' style={[styles.okayIcon, this.props.okayIconStyle]}
                        onPress={() => this._finishEditText()}/>
                </HorizontalRow>
            </View>
		);
	}
}

const styles = StyleSheet.create({
    viewText: {
        fontSize: 32,
        color: '#0277BD'
    },
    inputContainer:{
        justifyContent: 'center',
    },
    editInput: {
        height  : 26,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        flex: 1
    },
    editButtonContainer:{
        marginTop: 10,
        alignItems: 'center'
    },
    cancelIcon:{
        fontWeight: 'bold',
        fontSize : 40,
        color: 'red'
    },
    okayIcon:{
        fontWeight: 'bold',
        fontSize : 40,
        color: 'green'
    },
    dummySpace:{
        margin: 10
    }
});
