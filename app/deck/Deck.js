import React, { Component } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import SwipeableViews from 'react-swipeable-views/lib/index.native.scroll';
import Card from '../card/Card';
import {LocalDatabase} from '../database/LocalDatabase';

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
                        <Card key={index} card={card} />
                    )}
                </SwipeableViews>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 0,
        backgroundColor: "#E0F2F1"
    },
});