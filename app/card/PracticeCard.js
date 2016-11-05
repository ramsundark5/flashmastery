import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Easing, StyleSheet} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import PracticeDao from '../dao/PracticeDao';
import Card from './Card';

export default class PracticeCard extends Component {
    constructor(props) {
        super(props);
    }

    markAsLearning(card, practiceSession, user){
        PracticeDao.addNewPraciseCardResult(card, practiceSession, false, user);
        this.props.onChangeIndex();
    }

    markAsMastered(card, practiceSession, user){
        PracticeDao.addNewPraciseCardResult(card, practiceSession, true, user);
        this.props.onChangeIndex();
    }

    render(){
        const {card, practiceSession, user} = this.props;
        return(
            <Content>
                <Card card={card}/>
                <Footer>
                    <HorizontalRow style={styles.answerButtonContainer}>
                        <Button onPress={() => this.markAsLearning(card, practiceSession, user)} style={styles.answerButton} textStyle={styles.answerText}>
                            Learning
                        </Button>
                        <View style={styles.dummySpace}></View>
                        <Button onPress={() => this.markAsMastered(card, practiceSession, user)} style={styles.answerButton} textStyle={styles.answerText}>
                            Mastered
                        </Button>
                    </HorizontalRow>
                </Footer>
            </Content>
            
        );
    }

}

const styles = StyleSheet.create({
    answerButtonContainer:{
        margin: 10,
    },
    answerButton:{
        flex: 1,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
    },
    answerText:{
        color: 'white',
        textAlign: 'center'
    },
    dummySpace:{
        margin: 10
    }
});