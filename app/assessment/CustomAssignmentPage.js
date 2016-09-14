import React, { Component } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import { Container } from '../common/Common';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AddCustomAssignmentFooter from './AddCustomAssignmentFooter';
import CustomAssignmentItem from './CustomAssignmentItem';

export default class CustomAssignmentPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            assignments: [],
        };
    }

    componentDidMount(){
    }
    
    _addAssignmentToList(newAssignment){
        console.log('add assignment invoked');
        let assignments = this.state.assignments;
        assignments.push(newAssignment);
        this.setState({
            assignments: assignments,
        });
    }

    render(){
        const {assignments, text} = this.state;
        return(
            <Container style={styles.container}>
                <ScrollView>
                    {assignments.map( (assignment, index) => 
                        <CustomAssignmentItem key={index} assignment={assignment} />
                    )}
                </ScrollView>
                    <AddCustomAssignmentFooter addAssignmentToList={(newAssignment) => 
                                                        this._addAssignmentToList(newAssignment)} />
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