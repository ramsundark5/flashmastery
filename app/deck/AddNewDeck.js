import React, { Component } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Container } from '../common/Common';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AddNewDeckInput from './AddNewDeckInput';
import CustomCard from '../card/CustomCard';

export default class AddNewDeck extends Component {
    constructor(props){
        super(props);
        this.state = {
            cards: [],
        };
    }

    componentDidMount(){
        
    }
    
    _addCardToDeck(newCard){
        console.log('add card invoked');
        let newCards = this.state.cards.concat(newCard);
        this.setState({
            cards: newCards,
        });
    }

    render(){
        const {cards, text} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    {cards.map( (card, index) => 
                        <CustomCard key={index} card={card} />
                    )}
                </ScrollView>
                    <AddNewDeckInput addCardToDeck={(newCard) => 
                                                        this._addCardToDeck(newcard)} />
                    <KeyboardSpacer/>
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