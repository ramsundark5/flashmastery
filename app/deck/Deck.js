import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views-native';
import PracticeCard from '../card/PracticeCard';
import EditableCard from '../card/EditableCard';
import NavigationBar from 'react-native-navbar';
import {Actions, ActionConst} from 'react-native-router-flux';
import CardDao from '../dao/CardDao';
import PracticeDao from '../dao/PracticeDao';
import Analytics from 'mobile-center-analytics';
import * as Constants from '../common/Constants';

export default class Deck extends Component {
    constructor(props){
        super(props);
        this.state={
            swipeIndex: 0,
            practiceSession: props.practiceSession
        };
    }
    
    _onChangeIndex(index){
        let cards = this.props.deck.cards;
        if(index >= cards.length - 1){
            console.log('end of practice session');
            this._showFinishedOptions();
        }
        this.setState({swipeIndex: index + 1});
    }

    _onStartPracticeSession(deck){
        let isCustom = this.props.isCustom;
        let newPracticeSession = PracticeDao.createPracticeSession(deck, this.props.user);
        this.setState({practiceSession: newPracticeSession, swipeIndex: 0});
        if(isCustom){
            let analyticsProps = new Map();
            analyticsProps.set(Constants.CUSTOM_CARDS_COUNT, deck.cards.length);
            Analytics.trackEvent(Constants.CUSTOM_CARDS_COUNT, analyticsProps);
        }
    }

    _showFinishedOptions(){
        Alert.alert(
            'You finished '+this.props.deck.name +'. What do you want to do next?',
            null,
            [
                {text: 'Practice again', onPress: () => this._onStartPracticeSession(this.props.deck)},
                {text: 'View Report', onPress: () => Actions.deckReportsPageFromDeck({deck: this.props.deck, user: this.props.user})},
                {text: 'Back to Dashboard', onPress: () => Actions.homePage({type: ActionConst.RESET})}
            ]
        );
    }

    render(){
        const {deck, isCustom} = this.props;
        let cards = CardDao.getCardsAsPlainObjects(deck.cards);
        console.log('inside render of deck page '+deck.name);
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader(deck, isCustom)}
                <View style={styles.container}>
                    <SwipeableViews index={this.state.swipeIndex}>
                        {cards.map( (card, index) => 
                            this._renderCard(card, index)
                        )}
                    </SwipeableViews>
                </View>
            </View>
        );
    }

    _renderCard(card, index){
        const {deck, isCustom, practiseMode, user} = this.props;
        const {practiceSession} = this.state;
        if(isCustom && !practiseMode){
            return(
                <EditableCard key={card.id} card={card} deck={deck}/>
            );
        }else{
            return(
                <PracticeCard 
                    key={card.id} 
                    card={card} 
                    deck={deck} 
                    user={user}
                    practiceSession={practiceSession} 
                    onChangeIndex={(cardIndex) => this._onChangeIndex(index)}/>
            );
        }
    }

    _renderHeader(deck, isCustom){
        const titleConfig = {title: deck.name, tintColor: '#0076FF'};
        const rightButtonConfig = {title: 'Edit', 
                        handler: () => Actions.cardListPage({deck: deck})};
        const leftButtonConfig = {title: 'Back',
                        handler: () => Actions.pop()};
        if(isCustom){
            return(
                <NavigationBar title={titleConfig} rightButton={rightButtonConfig} leftButton={leftButtonConfig}/>
            );
        }else{
            return(
                <NavigationBar title={titleConfig} leftButton={leftButtonConfig}/>
            );
        }
        
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        backgroundColor: "#E0F2F1",
        flex: 1,
    },
});