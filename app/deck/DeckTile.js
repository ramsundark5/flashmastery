import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Center, HorizontalRow, Button } from '../common/Common';
import Icon from 'react-native-vector-icons/Ionicons';

const ADD_NEW_DECK = 'add';
const EDIT_DECK_NAME = 'edit';

export default class DeckTile extends Component {
    constructor(props){
        super(props);
        this.originalDeckAction = props.deck.action;
        this.state = {
            deck: props.deck,
            editableDeckText: ''
        };
    }
    
    componentDidMount(){
    }
    
    _showEditDeckName(deck){
        deck.action = EDIT_DECK_NAME;
        this.setState({deck : deck});
    }

    _finishEditDeckName(deck){
        deck.action = null;
        deck.name = this.state.editableDeckText;
        this.setState({deck : deck, editableDeckText: ''});
        //this.props.onDeckNameUpdate(deck);
        this.props.onNewDeckAdd(deck);
    }

    _cancelEditDeckName(deck){
        deck.action = this.originalDeckAction;
        deck.name = this.state.editableDeckText;
        this.setState({deck : deck, editableDeckText: ''});
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
            <TouchableOpacity onPress={() => this._onSelectDeck(deck)}
                    style={[styles.tile, {backgroundColor: bgColor}]}>
                <Center>
                    <Text style={styles.nameText}>{deck.name}</Text>
                </Center>
            </TouchableOpacity>
        );
    }

    _renderAddNewDeck(deck, bgColor){
        return (
            <TouchableOpacity onPress={() => this._showEditDeckName(deck)} 
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
            <TouchableOpacity onLongPress={() => this._onSelectDeck(deck)}
                        style={[styles.tile, {backgroundColor: bgColor}]}>
                    <HorizontalRow style={styles.editNameInputContainer}>
                        <TextInput
                            ref='editDeckNameInput'
                            style={[styles.editNameInput]}
                            placeholder={'Type here..'}
                            value={this.state.editableDeckText}
                            onChangeText={(changedText) => this.setState({editableDeckText: changedText})}/>
                    </HorizontalRow>
                    <HorizontalRow style={styles.editNameButtonContainer}>
                        <Icon name='ios-close-circle-outline' style={[styles.cancelIcon]}
                            onPress={() => this._cancelEditDeckName(deck)}/>
                        <View style={styles.dummySpace}></View>
                        <Icon name='ios-checkmark-circle-outline' style={[styles.okayIcon]}
                            onPress={() => this._finishEditDeckName(deck)}/>
                    </HorizontalRow>
            </TouchableOpacity>
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
    editNameInputContainer:{
        justifyContent: 'center',
        marginTop: 50
    },
    editNameInput: {
        height  : 26,
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'center',
        flex: 1
    },
    showAddIcon: {
        padding: 2,
        fontWeight: 'bold',
        fontSize : 40,
        color: 'white'
    },
    editNameButtonContainer:{
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