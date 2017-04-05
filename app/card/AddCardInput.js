import React, { Component } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { HorizontalRow, Button } from '../common/Common';
import uuid from 'react-native-uuid';

export default class AddCardInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            frontText: '',
            backText: ''
        };
    }

    _onAddCard(){
        let newCard = { id: uuid.v1(), front: this.state.frontText, back: this.state.backText };
        newCard.type = 'text';
        newCard.frontType = 'text';
        newCard.backType = 'text';
        this.setState({
            frontText: '',
            backText: ''
        });
        this.props.addCardToDeck(newCard);
    }

    render(){
        return(
            <View>
                <View style={[styles.addTextInputContainer, styles.backTextInputContainer]}>
                    <TextInput
                        ref='frontTextInput'
                        style={[styles.addTextInput, styles.frontTextInput]}
                        placeholder={'Type front card text here..'}
                        value={this.state.frontText}
                        onChangeText={(changedText) => this.setState({frontText: changedText})}/>
                </View>
                <HorizontalRow style={styles.addCardContainer}>
                    <View style={styles.addTextInputContainer}>
                        <TextInput
                            ref='backTextInput'
                            style={[styles.addTextInput]}
                            placeholder={'Type back card text here(optional)..'}
                            value={this.state.backText}
                            onChangeText={(changedText) => this.setState({backText: changedText})}/>
                    </View>

                    <TouchableOpacity style={[styles.addButtonContainer]}>
                        <Button onPress={() => this._onAddCard()} 
                            style={styles.addButton} textStyle={styles.addButtonText}>
                            Add
                        </Button>
                    </TouchableOpacity>
                </HorizontalRow>
            </View>
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
        flexGrow: 1,
    },
    frontTextInput:{
        marginBottom: 25
    },
    backTextInputContainer:{
        marginLeft: 15,
        marginRight: 70,
    }
});