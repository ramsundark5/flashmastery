import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';
import PracticeCard from '../card/PracticeCard';
import EditableCard from '../card/EditableCard';
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';
import CardDao from '../dao/CardDao';

export default class Deck extends Component {
    componentDidMount(){
    }
    
    render(){
        const {deck, isCustom} = this.props;
        let cards = CardDao.getCardsAsPlainObjects(deck.cards);
        console.log('inside render of deck page '+deck.name);
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader(deck, isCustom)}
                <Container style={styles.container}>
                    <SwipeableViews>
                        {cards.map( (card, index) => 
                            this._renderCard(card, index)
                        )}
                    </SwipeableViews>
                </Container>
            </View>
        );
    }

    _renderCard(card, index){
        const {deck, isCustom, practiseMode, practiceSession} = this.props;
        if(isCustom && !practiseMode){
            return(
                <EditableCard key={card.id} card={card} deck={deck}/>
            );
        }else{
            return(
                <PracticeCard key={card.id} card={card} deck={deck} practiceSession={practiceSession}/>
            );
        }
    }

    _renderHeader(deck, isCustom){
        const titleConfig = {title: 'Card', tintColor: '#0076FF'};
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
        backgroundColor: "#E0F2F1"
    },
});