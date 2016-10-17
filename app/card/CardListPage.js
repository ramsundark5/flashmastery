import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ListView, TouchableHighlight, Text} from 'react-native';
import { Container } from '../common/Common';
import CardListItem from './CardListItem';
import { SwipeListView } from 'react-native-swipe-list-view';
import CardDao from '../dao/CardDao';
import AddCardInput from './AddCardInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';

export default class CardListPage extends Component {
    constructor(props){
        super(props);
        let cards = CardDao.getCardsAsPlainObjects(props.deck.cards || []);
        this.state = {
            cards: cards,
        };
        this.cardsDatasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _deleteCard(cardToBeDeleted, secId, rowId, rowMap){
        CardDao.deleteCard(cardToBeDeleted.id);
        let cardsAfterDelete = this.state.cards.filter(card =>
                card.id !== cardToBeDeleted.id
            );
        this.setState({cards: cardsAfterDelete});
        let currentRow = rowMap[`${secId}${rowId}`];
        if(currentRow){
            currentRow.closeRow();
        }
    }

    _addCardToDeck(newCard){
        newCard.lastModified = new Date();
        CardDao.addNewCard(this.props.deck, newCard);
        
        let cardsAfterAdd = this.state.cards.concat(newCard);
        this.setState({cards: cardsAfterAdd});
    }

    render(){
        const {cards} = this.state;
        const cardsDS = this.cardsDatasource.cloneWithRows(cards);
        return(
            <View style={{ flex: 1, }}>
                {this._renderHeader()}
                <Container style={styles.container}>
                    <SwipeListView
                        dataSource={cardsDS}
                        renderRow={ (card) => this._renderCardItem(card)}
                        renderHiddenRow={ (card, secdId, rowId, rowMap) => this._renderSwipeOptions(card, secdId, rowId, rowMap)}
                        disableRightSwipe={true}
                        closeOnRowPress={true}
                        rightOpenValue={-75}/>
                    <AddCardInput addCardToDeck={(newCard) => 
                                    this._addCardToDeck(newCard)} />
                    <KeyboardSpacer/>
                </Container>
            </View>
        );
    }

    _renderCardItem(card){
        return(
            <CardListItem key={card.id} card={card} />
        );
    }

    _renderSwipeOptions(card, secdId, rowId, rowMap){
        return(
            <TouchableHighlight style={[styles.optionsButton, styles.deleteButton]}
                                  onPress={() => this._deleteCard(card, secdId, rowId, rowMap)}>
                <Text style={styles.optionsText}>Delete</Text>
            </TouchableHighlight>
        );
    }

    _renderHeader(){
        const {deck} = this.props;
        const {cards} = this.state;
        const self = this;
        const titleConfig = {title: 'Card', tintColor: '#0076FF'};
        let backButtonHandler = function(){
            Actions.pop();
            setTimeout(() => {
                deck.cards = cards;
                Actions.refresh({deck: deck});
            }, 100);
        };
        const leftButtonConfig = {title: 'Back',
                        handler: () => backButtonHandler()};
        return(
            <NavigationBar title={titleConfig} leftButton={leftButtonConfig}/>
        );
        
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        backgroundColor: "#E0F2F1"
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