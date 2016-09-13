import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';

export default class AssessmentItem extends Component {
    componentDidMount(){

    }
    
    markAsLearning(){

    }

    markAsMastered(){

    }

    render(){
        return(
            <Content>
                <Center>
                    <Text style={styles.vocabText}>Car</Text>
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
    },
    dummySpace:{
        margin: 10
    }
});