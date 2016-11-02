import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, ListView, TouchableHighlight, Text} from 'react-native';
import { Container } from '../common/Common';
import CardListItem from './CardListItem';
import CardDao from '../dao/CardDao';
import AddCardInput from './AddCardInput';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import NavigationBar from 'react-native-navbar';
import {Actions} from 'react-native-router-flux';
import SwipeitemView from 'react-native-swipe-left';

export default class CardListPage extends Component {
    constructor(props){
        super(props);
        this._dataRow = {};
        this.openRowId = '';
        let cards = CardDao.getCardsAsPlainObjects(props.deck.cards || []);
        this.state = {
            cards: cards,
            scrollEnable: true,
            hasIdOpen: false
        };
        this.cardsDatasource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    }

    _deleteCard(cardToBeDeleted){
        CardDao.deleteCard(cardToBeDeleted.id);
        let cardsAfterDelete = this.state.cards.filter(card =>
                card.id !== cardToBeDeleted.id
            );
        this.setState({cards: cardsAfterDelete});
        this._dataRow[this.openRowId]._closeRow();
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
                <View style={styles.container}>
                    <ListView
                        dataSource={cardsDS}
                        renderRow={ (card, sectionId, rowId) => this._renderCardItem(card, sectionId, rowId)}
                        ref="listview"
                        renderScrollComponent={(props)=>{
                            return <ScrollView scrollEnabled={this.state.scrollEnable} {...props}/>;
                        }}
                        renderSeparator={this._renderSeperator}/>
                    <AddCardInput addCardToDeck={(newCard) => this._addCardToDeck(newCard)} />
                    <KeyboardSpacer/>
                </View>
            </View>
        );
    }

    _renderCardItem(card, sectionId, rowId){
        let id = '' +sectionId + rowId;
        let rightBtn = [{id: 1, text: 'Delete', width: 75, color: 'white', bgColor: 'rgba(231,76,60,1)',
                            onPress: () =>{this._deleteCard(card);}
                        }];

        return(
            <SwipeitemView 
                root={this}
                ref={(row)=>this._dataRow[id] = row}
                id={id}
                data={card}
                boxbgColor='#E0F2F1'
                rowbgColor='#E0F2F1'
                rightBtn={rightBtn}>
              <CardListItem key={card.id} card={card} />
            </SwipeitemView>
            
        );
    }

    _renderSeperator(sectionID, rowID){
        return(
            <View key={`${sectionID}-${rowID}`} style={styles.separator}></View>
        );
    }

    _renderHeader(){
        const {deck} = this.props;
        const {cards} = this.state;
        const self = this;
        const titleConfig = {title: deck.name, tintColor: '#0076FF'};
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
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#E0F2F1",
    },
    separator:{
        margin: 10
    }
});