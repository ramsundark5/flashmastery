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
    constructor(props){
        super(props);
        this.state={
            swipeIndex: 0
        };
    }

    componentDidMount(){
    }
    
    _onChangeIndex(index){
        let cards = this.props.deck.cards;
        if(index >= cards.length - 1){
            console.log('end of practice session');
            Actions.reportsPage();
        }
        this.setState({swipeIndex: index + 1});
    }

    render(){
        const {deck, isCustom} = this.props;
        let cards = CardDao.getCardsAsPlainObjects(deck.cards);
        console.log('inside render of deck page '+deck.name);
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader(deck, isCustom)}
                <Container style={styles.container}>
                    <SwipeableViews index={this.state.swipeIndex}>
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
                <PracticeCard 
                    key={card.id} 
                    card={card} 
                    deck={deck} 
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
        backgroundColor: "#E0F2F1"
    },
});