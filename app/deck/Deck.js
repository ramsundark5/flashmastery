import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';
import PracticeCard from '../card/PracticeCard';
import EditableCard from '../card/EditableCard';

export default class Deck extends Component {
    componentDidMount(){
    }
    
    render(){
        const {deck} = this.props;
        console.log('inside render of deck page '+deck.name);
        return(
            <Container style={styles.container}>
                <SwipeableViews>
                    {deck.cards.map( (card, index) => 
                        this._renderCard(card, index)
                    )}
                </SwipeableViews>
            </Container>
        );
    }

    _renderCard(card, index){
        const {deck, isCustom} = this.props;
        if(isCustom){
            return(
                <EditableCard key={card.id} card={card} />
            );
        }else{
            return(
                <PracticeCard key={card.id} card={card} />
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