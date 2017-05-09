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
import PracticeService from '../service/PracticeService';
import PracticeDao from '../dao/PracticeDao';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Analytics from 'mobile-center-analytics';
import * as Constants from '../common/Constants';

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
        let isCustom = this.props.deckSet.custom;
        if(isCustom){
            let analyticsProps = new Map();
            let deckCount = this.state.decks ? this.state.decks.length : 0;
            analyticsProps.set(Constants.CUSTOM_DECK_COUNT, deckCount);
            Analytics.trackEvent(Constants.CUSTOM_DECK_COUNT, analyticsProps);
        }
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
            if(isCustom){
                Alert.alert(
                    'What do you want to do?',
                    null,
                    [
                        {text: 'Practice All', onPress: () => this._onStartPracticeSession(deck, false)},
                        {text: 'Adaptive Practice', onPress: () => this._onStartPracticeSession(deck, true)},
                        {text: 'Add/Edit Cards', onPress: () => Actions.cardListPage({deck: deck, isCustom: isCustom, practiseMode: false})},
                        {text: 'View Report', onPress: () => Actions.deckReportsPage({deck: deck, user: this.props.user})},
                        {text: 'Cancel'}
                    ]
                );
            }else{
                Alert.alert(
                    'What do you want to do?',
                    null,
                    [
                        {text: 'Practice All', onPress: () => this._onStartPracticeSession(deck, false)},
                        {text: 'Adaptive Practice', onPress: () => this._onStartPracticeSession(deck, true)},
                        {text: 'View Report', onPress: () => Actions.deckReportsPage({deck: deck, user: this.props.user})},
                        {text: 'Cancel'},
                    ]
                );
            }
        }
    }

    _onStartPracticeSession(deck, onlyShowLearningCards){
        //try{
            let isCustom = this.props.deckSet.custom;
            let analyticsProps = new Map();
            analyticsProps.set(Constants.DECK_NAME, deck.name);
            Analytics.trackEvent(Constants.SELECT_DECK + deck.name, analyticsProps);
            let newPracticeSession = PracticeDao.createPracticeSession(deck, this.props.user);
            if(onlyShowLearningCards){
                Analytics.trackEvent(Constants.ADAPTIVE_PRACTICE + ' ' +deck.name, analyticsProps);
                let cardsForPractice = PracticeService.getOnlyLearningCards(deck, this.props.user);
                deck.cards = cardsForPractice.learningCards;
                if(deck.cards.length < 1){
                    Alert.alert(
                        'All cards are mastered!',
                        null,
                        [
                            {text: 'OK'}
                        ]
                    );
                    return;
                }
            }else{
                Analytics.trackEvent(Constants.PRACTICE_ALL  + ' ' + deck.name, analyticsProps);
            }
            
            Actions.deckPage({deck: deck, isCustom: isCustom, practiseMode: true, 
                practiceSession: newPracticeSession, user: this.props.user});
        /*}catch(err){
            console.error("error starting practice session "+err);
        }*/
        
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
        let analyticsProps = new Map();
        analyticsProps.set(Constants.DECKSET_NAME, this.props.deckSet.name);
        Analytics.trackEvent(Constants.UPDATE_DECK, analyticsProps);
    }

    _onNewDeckAdd(addedDeck){
        addedDeck.lastModified = new Date();
        addedDeck.custom = true;
        DeckDao.addNewDeck(this.props.deckSet.id, addedDeck);
        this._addNewDeckOptionAtEnd();
        let decksAfterAdd = this.state.decks.concat(addedDeck);
        this.setState({decks: decksAfterAdd});
        let analyticsProps = new Map();
        analyticsProps.set(Constants.DECKSET_NAME, this.props.deckSet.name);
        Analytics.trackEvent(Constants.ADD_DECK, analyticsProps);
    }

    _onDecksDelete(){
        DeckDao.deleteDecks(this.selectedDecks);
        this._addNewDeckOptionAtEnd();
        this.selectedDecks = new Set();
        let customDeckSet = DeckDao.getDeckSetForId(this.props.deckSet.id);
        let customDecks = DeckDao.getDecksAsPlainObjects(customDeckSet.decks);
        this.setState({decks: customDecks, selectionModeEnabled: false});
        let analyticsProps = new Map();
        analyticsProps.set(Constants.DECKSET_NAME, this.props.deckSet.name);
        Analytics.trackEvent(Constants.DELETE_DECK, analyticsProps);
    }

    render(){
        let {decks} = this.state;
        let contentMarginBottom = this.state.selectionModeEnabled? 45 : 0;
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader()}
                <KeyboardAwareScrollView style={{marginBottom: contentMarginBottom}}>
                    <ResponsiveGrid
                            containerStyle={{ backgroundColor: '#fff',}}
                            columnCount={2}
                            dataSource={decks}
                            extraCellAtEnd = {this.addNewDeck}
                            renderCell={(deck, index) => this._renderDeck(deck, index)} />
                </KeyboardAwareScrollView>
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
        let titleConfig = {title: this.props.deckSet.name, tintColor: '#0076FF'};
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