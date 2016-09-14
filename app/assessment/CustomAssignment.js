import React, { Component } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';

export default class CustomAssignment extends Component {
    constructor(){
        let assignmentList = realm.objects('TodoList');
        this.state = {
            vocabTexts: [],
            text: ''
        };
    }
    componentDidMount(){

    }
    
    render(){
        const {vocabTexts, text} = this.state;
        return(
            <Content>
                <Center>
                    <View style={{marginBottom: 100}}>
                        <Text style={styles.vocabText}>{assignment.word}</Text>
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
});