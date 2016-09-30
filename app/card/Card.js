import React, { Component } from 'react';
import {View, Text, TextInput, TouchableOpacity, Easing, StyleSheet, Dimensions} from 'react-native';
import { EditableText, Center, Button } from '../common/Common';
import FlipView from 'react-native-flip-view';
import Icon from 'react-native-vector-icons/Ionicons';
const { width } = Dimensions.get('window');

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
        let finishCallBackFunction = (finishedText) => this._finishEditFrontCardText(finishedText);
        if(isBack){
            cardText = card.back;
            finishCallBackFunction = (finishedText) => this._finishEditBackCardText(finishedText);
        }
        
        return(
            <Center>
                <EditableText 
                    editable={this.props.editable}
                    textContent={cardText}
                    editInputContainerStyle={[styles.editInputContainerStyle]}
                    editInputStyle={styles.editText}
                    viewTextStyle={styles.viewText} 
                    finishEditText={(finishedText) => finishCallBackFunction(finishedText)}/>
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
    viewText: {
        fontSize: 32,
        color: '#0277BD'
    },
    editInputContainerStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center', 
        margin: 1,
        width: width - 40
    },
    editText:{
        fontSize: 32,
        color: '#0277BD',
    }
});