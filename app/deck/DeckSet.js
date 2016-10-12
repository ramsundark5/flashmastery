import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { Container, Content, Center, Footer, ResponsiveGrid, Button, LeftButton } from '../common/Common';
import {Actions} from 'react-native-router-flux';
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
        let decks = DeckDao.getDecksAsPlainObjects(props.deckSet.decks || []);
        this.state = {
            decks: decks || [],
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
            Alert.alert(
                'What do you want to do?',
                null,
                [
                    {text: 'Start Practise', onPress: () => Actions.deckPage({deck: deck, isCustom: isCustom, practiseMode: true})},
                    {text: 'Edit Cards', onPress: () => Actions.deckPage({deck: deck, isCustom: isCustom, practiseMode: false})},
                ]
            );
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
        DeckDao.updateDeck(updatedDeck);
    }

    _onNewDeckAdd(addedDeck){
        addedDeck.lastModified = new Date();
        addedDeck.custom = true;
        DeckDao.addNewDeck(this.props.deckSet.id, addedDeck);
        this._addNewDeckOptionAtEnd();
        let decksAfterAdd = this.state.decks.concat(addedDeck);
        this.setState({decks: decksAfterAdd});
    }

    _onDecksDelete(){
        DeckDao.deleteDecks(this.selectedDecks);
        this._addNewDeckOptionAtEnd();
        this.selectedDecks = new Set();
        let customDeckSet = DeckDao.getDeckSetForId(this.props.deckSet.id);
        let customDecks = DeckDao.getDecksAsPlainObjects(customDeckSet.decks);
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
        if(this.props.deckSet.custom){
            return(
                <NavigationBar title={titleConfig} rightButton={rightButtonConfig} leftButton={leftButtonConfig}/>
            );
        }else{
            return(
                <NavigationBar title={titleConfig} leftButton={leftButtonConfig}/>
            );
        }
        
    }

    _renderFooter(){
        if(!this.state.selectionModeEnabled){
            return null;
        }
        return(
            <Button onPress={() => this._onDecksDelete()}
                textStyle={styles.buttonText} style={styles.deleteButton}>
                DELETE
            </Button>
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
        flex: 1, 
    },
    deleteButton:{
        bottom: 0,
        marginBottom: 0,
        borderRadius: 0,
        backgroundColor: '#F44336',
        borderColor: '#F44336',
    },
    buttonText:{
        color: 'white', 
        fontSize: 16, 
        fontWeight: 'bold'
    },
});