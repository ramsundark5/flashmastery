import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button } from '../common/Common';
import {Actions, NavBar} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import DeckTile from './DeckTile';
import uuid from 'react-native-uuid';
import ColorGenerator from '../utils/ColorGenerator';
import NavigationBar from 'react-native-navbar';
import DeckDao from '../dao/DeckDao';
import realm from '../database/Realm';

const {deviceWidth} = Dimensions.get('window');
const colors = ["#00B0FF", "#1DE9B6", "#FFC400", "#E65100", "#F44336"];
const ADD_NEW_DECK = 'add';

export default class DeckSet extends Component {
    constructor(props){
        super(props);
        this.selectedDecks = new Set();
        this._addNewDeckOptionAtEnd();
        this.state = {
            decks: props.deckSet.decks || [],
            selectionModeEnabled: false
        };
    }

    componentDidMount(){
    }

    _addNewDeckOptionAtEnd(){
        if(this.props.deckSet.custom){
            this.addNewDeck = {id: uuid.v1(), action: ADD_NEW_DECK, name: ''};
        }
    }

    _onSelectDeck(deck){
        let isCustom = this.props.deckSet.custom;
        if(this.state.selectionModeEnabled){
            if(deck.selected){
                this.selectedDecks.add(deck.id);
            }else{
                this.selectedDecks.delete(deck.id);
            }
        }else{
            Actions.deckPage({deck: deck, isCustom: isCustom});
        }
    }

    _onDeckNameUpdate(updatedDeck){
        let decksAfterUpdate = this.state.decks.map( (existingDeck, index) => 
            existingDeck.id === updatedDeck.id?
                    Object.assign({}, updatedDeck) :
                    existingDeck
            
        );
        this.setState({decks: decksAfterUpdate});
        //save to db
    }

    _onNewDeckAdd(addedDeck){
        console.log('decks length '+this.state.decks);
        addedDeck.lastModified = new Date();
        addedDeck.custom = true;
        DeckDao.addNewDeck(this.props.deckSet.id, addedDeck);
        let decksAfterAdd = Object.assign([], this.state.decks);
        decksAfterAdd = decksAfterAdd.concat(addedDeck);
        this._addNewDeckOptionAtEnd();
        this.forceUpdate();
    }

    _onDecksDelete(){
        DeckDao.deleteDecks(this.selectedDecks);
        this.selectedDecks = new Set();
        let customDecks = DeckDao.getAllDecks();
        this._addNewDeckOptionAtEnd();
        this.setState({decks: customDecks, selectionModeEnabled: false});
    }

    render(){
        let {decks} = this.state;
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader()}
                <ScrollView>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={decks}
                            extraCellAtEnd = {this.addNewDeck}
                            renderCell={(deck, index) => this._renderDeck(deck, index)} />
                </ScrollView>
                <Footer style={styles.footerContainerStyle}>
                    {this._renderFooter()}
                </Footer>
            </View>
        );
    }

    _renderDeck(deck, index){
        const isCustom = this.props.deckSet.custom;
        console.log('deck to be rendered is '+JSON.stringify(deck));
        let bgColor = colors[index];
        if(!bgColor){
            bgColor = ColorGenerator.getColor(deck.name);
        }
        return(
            <DeckTile deck={deck} isCustom={isCustom} bgColor={bgColor} key={deck.id} 
                onDeckNameUpdate={(updatedDeck) => this._onDeckNameUpdate(updatedDeck)}
                onNewDeckAdd={(addedDeck) => this._onNewDeckAdd(addedDeck)}
                onSelect={(deck) => this._onSelectDeck(deck)}
                selectionModeEnabled={this.state.selectionModeEnabled}/>
        );
    }

    _renderHeader(){
        const rightButtonText = this.state.selectionModeEnabled? 'Done': 'Edit';
        let titleConfig = {title: 'Decks', tintColor: '#0076FF'};
        let rightButtonConfig = {title: rightButtonText, 
                        handler: () => this.setState({selectionModeEnabled: !this.state.selectionModeEnabled})};
        let leftButtonConfig = {title: 'Back',
                        handler: () => Actions.pop()};
        return(
           <NavigationBar title={titleConfig} rightButton={rightButtonConfig} leftButton={leftButtonConfig}/>
        );
    }

    _renderFooter(){
        if(!this.state.selectionModeEnabled){
            return null;
        }
        return(
            <Center>
                <TouchableOpacity onPress={() => this._onDecksDelete()}>
                    <Icon name='ios-trash-outline'
                            style={[styles.deleteIcon]}/>
                </TouchableOpacity>
            </Center>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        marginTop: 5,
        marginBottom: 10
    },
    deleteIcon:{
        fontWeight: 'bold',
        fontSize : 40,
        color: 'red'
    },
    footerContainerStyle:{
        flexDirection: 'row', 
        flex: 1, 
        backgroundColor: 'grey'
    }
});