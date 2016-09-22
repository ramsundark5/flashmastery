import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Easing, StyleSheet} from 'react-native';
import { Container, Content, Center, Footer, HorizontalRow, Button } from '../common/Common';
import Card from './Card';

export default class EditableCard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){

    }

    render(){
        const {card} = this.props;
        return(
            <Content>
                <Card card={card} editable={true}/>
            </Content>
        );
    }

}

const styles = StyleSheet.create({
});