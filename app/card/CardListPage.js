import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ListView, TouchableHighlight, Text} from 'react-native';
import { Container } from '../common/Common';
import CardListItem from './CardListItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import CardDao from '../dao/CardDao';
import AddCardInput from './AddCardInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import realm from '../database/Realm';

export default class CardListPage extends Component {
    constructor(props){
        super(props);
        let cards = CardDao.getCardsAsPlainObjects(props.deck.cards || []);
        this.state = {
            cards: cards,
        };
        this.cardsDatasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _deleteCard(cardToBeDeleted){
        CardDao.deleteCard(cardToBeDeleted.id);
        let cardsAfterDelete = this.state.cards.filter(card =>
                card.id !== cardToBeDeleted.id
            );
        this.setState({cards: cardsAfterDelete});
    }

    _addCardToDeck(newCard){
        newCard.lastModified = new Date();
        newCard.type = 'text';
        newCard.frontType = 'text';
        CardDao.addNewCard(this.props.deck, newCard);
        
        let cardsAfterAdd = this.state.cards.concat(newCard);
        this.setState({cards: cardsAfterAdd});
    }

    render(){
        const {cards} = this.state;
        const cardsDS = this.cardsDatasource.cloneWithRows(cards);
        return(
            <Container style={styles.container}>
                <SwipeListView
                    enableEmptySections={true}
                    dataSource={cardsDS}
                    renderRow={ (card) => this._renderCardItem(card)}
                    renderHiddenRow={ (card) => this._renderSwipeOptions(card)}
                    disableRightSwipe={true}
                    rightOpenValue={-75}/>
                <AddCardInput addCardToDeck={(newCard) => 
                                this._addCardToDeck(newCard)} />
                <KeyboardSpacer/>
            </Container>
        );
    }

    _renderCardItem(card){
        return(
            <CardListItem key={card.id} card={card} />
        );
    }

    _renderSwipeOptions(card){
        return(
            <TouchableHighlight style={[styles.optionsButton, styles.deleteButton]}
                                  onPress={() => this._deleteCard(card)}>
                <Text style={styles.optionsText}>Delete</Text>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 80,
        marginLeft: 0
    },
    optionsButton: {
        alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
        marginBottom: 10,
    },
    deleteButton: {
        justifyContent: 'center',
        backgroundColor: 'rgba(231,76,60,1)',
        right: 0
    },
    optionsText:{
        textAlign: 'center',
        color: 'white'
    }
});