import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Center, HorizontalRow, Button, EditableText } from '../common/Common';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import RoundCheckbox from 'rn-round-checkbox';

const ADD_NEW_DECK = 'add';
const EDIT_DECK_NAME = 'edit';

export default class DeckTile extends Component {
    constructor(props){
        super(props);
        this.originalDeckAction = props.deck.action;
        this.state = {
            deck: props.deck,
            isEditing: false,
            isCustom: props.isCustom,
            isSelected: false
        };
    }
    
    componentDidMount(){
    }
    
    _onSelectDeck(deck){
        if(this.props.selectionModeEnabled){
            let newSelectedState = !this.state.isSelected;
            this.setState({isSelected: newSelectedState});
            deck.selected = newSelectedState;
        }
        this.props.onSelect(deck);
    }
    
    _onClickAddDeck(deck){
        if(this.props.selectionModeEnabled){
            return;
        }
        deck.action = EDIT_DECK_NAME;
        deck.custom = true;
        this.setState({deck : deck, isCustom: true});
    }

    _showEditDeckName(deck){
        if(this.state.isCustom && !this.props.selectionModeEnabled){
            deck.action = EDIT_DECK_NAME;
            this.setState({deck : deck});
        }
    }

    _finishEditDeckName(finishedText){
        let editedDeck = Object.assign({}, this.state.deck);
        editedDeck.action = null;
        editedDeck.name = finishedText;
        if(this.originalDeckAction === ADD_NEW_DECK){
            this.props.onNewDeckAdd(editedDeck);
        }else{
            this.props.onDeckNameUpdate(editedDeck);
        }
        this.setState({deck : editedDeck});
    }

    _cancelEditDeckName(){
        let editedDeck = Object.assign({}, this.state.deck);
        editedDeck.action = this.originalDeckAction;
        this.setState({deck : editedDeck});
    }

    render(){
        const {bgColor} = this.props;
        const {deck} = this.state;
        
        switch(deck.action){
            case ADD_NEW_DECK: 
                return this._renderAddNewDeck(deck, bgColor);
            case EDIT_DECK_NAME:
                return this._renderEditableDeck(deck, bgColor);
            default:
                return this._renderViewDeck(deck, bgColor);

        }
    }

    _renderViewDeck(deck, bgColor){
        return (
            <TouchableOpacity 
                    onLongPress={() => this._showEditDeckName(deck)}
                    onPress={() => this._onSelectDeck(deck)}
                    style={[styles.tile, {backgroundColor: bgColor}]}>
                <Center>
                    <Text style={styles.nameText}>{deck.name}</Text>
                    {this._renderSelectCheckBox(deck)}
                </Center>
            </TouchableOpacity>
        );
    }

    _renderAddNewDeck(deck, bgColor){
        return (
            <TouchableOpacity onPress={() => this._onClickAddDeck(deck)} 
                style={[styles.tile, {backgroundColor: bgColor}]}>
                <Center>
                    <Icon name='md-add'
                        style={[styles.showAddIcon]}/>
                </Center>
            </TouchableOpacity>
        );
    }

    _renderEditableDeck(deck, bgColor){
        return(
            <EditableText 
                    editable={true}
                    isEditing={true}
                    textContent={deck.name}
                    editInputContainerStyle={[styles.tile, {backgroundColor: bgColor}]}
                    placeholder={'Type here..'}
                    finishEditText={(finishedText) => this._finishEditDeckName(finishedText)}
                    cancelEditText={() => this._cancelEditDeckName()}/>
        );
    }

    _renderSelectCheckBox(deck){
        const {selectionModeEnabled} = this.props;
        if(!(this.state.isCustom && selectionModeEnabled)){
            return null;
        }
        return(
            <View style={styles.checkBoxContainer}>
                <RoundCheckbox
                    size={24}
                    checked={this.state.isSelected}
                    borderColor='white'
                    onValueChange={() => this._onSelectDeck(deck)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tile:{ 
        overflow: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 150,
        margin: 1,
    },
    nameText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
    checkBoxContainer:{
        paddingTop: 15,
    }
});