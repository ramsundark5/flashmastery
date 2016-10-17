import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Text, TouchableOpacity} from 'react-native';

export default class CardListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            card: props.card || {},
        };
    }

    render(){
        const {card} = this.state;
        return(
            <View key={card.id} style={[styles.cardItem]}>
                <Text style={styles.vocabText}>{card.front}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardItem:{
        marginBottom: 10,
        backgroundColor: '#EEEEEE'
    },
    vocabText:{
        padding: 10,
        fontSize: 20,
        color: '#0277BD'
    },
});