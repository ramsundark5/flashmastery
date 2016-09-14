import React, { Component } from 'react';
import {View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class CustomAssignmentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
            text: ''
        };
    }

    componentDidMount(){
    }
    
    _onAddAssignment(){
        console.log('on add assignment called');
        let newAssignment = { word: this.state.text };
        let assignments = this.state.assignments;
        assignments.push(newAssignment);
        this.setState({
            assignments: assignments,
            text: ''
        });
    }

    render(){
        const {assignments, text} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    {assignments.map( (assignment, index) => 
                        this._renderAssignmentItem(assignment, index)
                    )}
                </ScrollView>
                <Footer>
                    {this._renderAddAssignment()}
                    <KeyboardSpacer/>
                </Footer>
            </Container>
        );
    }

    _renderAssignmentItem(assignment, index){
            return (
                <View key={index} style={[styles.assignmentItem]}>
                    <Text style={styles.vocabText}>{assignment.word}</Text>
                </View>
            );
    }

    _renderAddAssignment(){
        return(
            <HorizontalRow style={styles.addAssignmentContainer}>
                <View style={styles.addTextInputContainer}>
                    <TextInput
                            ref='addTextInput'
                            style={[styles.addTextInput]}
                            placeholder={'Type here..'}
                            value={this.state.text}
                            onChange={(event) => this.setState({text: event.nativeEvent.text})} />
                </View>

                <TouchableOpacity style={[styles.addButtonContainer]}>
                    <Button onPress={() => this._onAddAssignment()} 
                        style={styles.addButton} textStyle={styles.addButtonText}>
                        Add
                    </Button>
                </TouchableOpacity>
            </HorizontalRow>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 80
    },
    assignmentItem:{
        marginBottom: 10,
        backgroundColor: '#EEEEEE'
    },
    vocabText:{
        padding: 10,
        fontSize: 20,
        color: '#0277BD'
    },
    addButtonContainer:{
        marginLeft: 10
    },
    addButton:{
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        width: 50,
        height: 30
    },
    addButtonText:{
        color: 'white',
        fontSize: 14
    },
    addAssignmentContainer:{
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 5 
    },
    addTextInputContainer: {
        borderBottomColor: '#48BBEC',
        borderBottomWidth: 1.5,
        flex: 1,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    addTextInput: {
        height  : 26,
        fontSize: 14,
        flex    : 1,
    },
});