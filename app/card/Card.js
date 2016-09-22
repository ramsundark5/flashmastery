import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Easing, StyleSheet} from 'react-native';
import { EditableText, Center, Button } from '../common/Common';
import FlipView from 'react-native-flip-view';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: props.card,
            isFlipped: false,
        };
    }

    componentDidMount(){

    }
    
    _finishEditFrontCardText(finishedText){
        let cardAfterEdit = Object.assign({}, this.state.card);
        cardAfterEdit.front = finishedText;
        this.setState({card: cardAfterEdit});
        //save card after change
    }

    _finishEditBackCardText(finishedText){
        let cardAfterEdit = Object.assign({}, this.state.card);
        cardAfterEdit.back = finishedText;
        this.setState({card: cardAfterEdit});
        //save card after change
    }

    _flip(){
        this.setState({isFlipped: !this.state.isFlipped});
    };

    render(){
        return(
            <FlipView style={{flex: 1}}
                    front={this._renderCardContent(false)}
                    back={this._renderCardContent(true)}
                    isFlipped={this.state.isFlipped}
                    onFlipped={(val) => {console.log('Flipped: ' + val);}}
                    flipAxis="y"
                    flipEasing={Easing.out(Easing.ease)}
                    flipDuration={500}
                    perspective={1000}/>
        );
    }

    _renderCardContent(isBack){
        const {card} = this.state;
        let  flipButtonText = 'Flip card';
        let cardText = card.front;
        let finishCallBackFunction = this._finishEditFrontCardText;
        if(isBack){
            cardText = card.back;
            finishCallBackFunction = this._finishEditBackCardText;
        }
        return(
            <Center>
                <EditableText 
                    editable={true}
                    textContent={cardText} 
                    editInputStyle={styles.vocabText}
                    finishEditText={(finishedText) => this._finishEditFrontCardText(finishedText)}/>
            </Center>
        );
    };

    _renderFlipButton(){
        const {isFlipEnabled} = this.props;
        if(!isFlipEnabled){
            return null;
        }
        return(
            <TouchableOpacity style={{backgroundColor: 'black', padding: 20}} onPress={() => this._flip()}>
                    <Text style={{fontSize: 32, color: 'white'}}>{flipButtonText}</Text>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
});