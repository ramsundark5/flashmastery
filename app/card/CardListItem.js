import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, Easing, Text, TouchableOpacity, Dimensions} from 'react-native';
import { EditableText, Center, Button } from '../common/Common';
import CardDao from '../dao/CardDao';
const { width } = Dimensions.get('window');
import FlipCard from 'react-native-flip-card';

export default class CardListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            card: props.card || {},
            isFlipped: false,
        };
    }

    _finishEditFrontCardText(finishedText){
        let cardAfterEdit = Object.assign({}, this.state.card);
        cardAfterEdit.front = finishedText;
        this.setState({card: cardAfterEdit});
        //save card after change
        CardDao.updateCard(cardAfterEdit);
    }

    _finishEditBackCardText(finishedText){
        let cardAfterEdit = Object.assign({}, this.state.card);
        cardAfterEdit.back = finishedText;
        this.setState({card: cardAfterEdit});
        //save card after change
        CardDao.updateCard(cardAfterEdit);
    }

    _flip(){
        if(this.state.card.back){
            this.setState({isFlipped: !this.state.isFlipped});;
        }
    };

    render(){
        const {card} = this.state;
        return(
            <FlipCard 
                style={styles.cardContainer}
                friction={10}
                perspective={1000}
                flipHorizontal={false}
                flipVertical={true}
                flip={this.state.isFlipped}
                onFlipped={(isFlipped)=>{console.log('isFlipped', isFlipped);}}>
                {this._renderCardContent(false)}
                {this._renderCardContent(true)}
            </FlipCard>
        );
    }
    
    _renderCardContent(isBack){
        const {card} = this.state;
        let cardText = card.front;
        let finishCallBackFunction = (finishedText) => this._finishEditFrontCardText(finishedText);
        if(isBack){
            cardText = card.back;
            finishCallBackFunction = (finishedText) => this._finishEditBackCardText(finishedText);
        }

        return(
            <View key={card.id} style={[styles.cardItem]}>
                <EditableText
                    onPress={()=> this._flip()} 
                    editable={true}
                    textContent={cardText}
                    editInputContainerStyle={[styles.editInputContainerStyle]}
                    editInputStyle={styles.editText}
                    viewTextStyle={styles.vocabText} 
                    finishEditText={(finishedText) => finishCallBackFunction(finishedText)}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer:{
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: 'white',
        borderColor: 'white',
        borderTopLeftRadius: 10,
    },
    cardItem:{
    },
    vocabText:{
        padding: 10,
        fontSize: 20,
        color: '#0277BD'
    },
    editInputContainerStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 1,
    },
    editText:{
        fontSize: 20,
        color: '#0277BD'
    }
});