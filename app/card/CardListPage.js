import React, { Component } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Container } from '../common/Common';
import CardListItem from './CardListItem';

export default class CardListPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: props.deck.cards || [],
        };
    }

    render(){
        const {cards} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    {cards.map( (card, index) => 
                        <CardListItem key={card.id} card={card} />
                    )}
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 80,
        marginLeft: 0
    },
});