import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';

export default class Card extends Component {
    componentDidMount(){

    }
    
    markAsLearning(){

    }

    markAsMastered(){

    }

    render(){
        const {card} = this.props;
        return(
            <Content>
                <Center>
                    <View style={{marginBottom: 100}}>
                        <Text style={styles.vocabText}>{card.front}</Text>
                    </View>
                </Center>
                <Footer>
                    <HorizontalRow style={styles.answerButtonContainer}>
                        <Button onPress={() => this.markAsLearning()} style={styles.answerButton} textStyle={styles.answerText}>
                            Learning
                        </Button>
                        <View style={styles.dummySpace}></View>
                        <Button onPress={() => this.markAsMastered()} style={styles.answerButton} textStyle={styles.answerText}>
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
    vocabText: {
        fontSize: 32,
        color: '#0277BD'
    },
    dummySpace:{
        margin: 10
    }
});