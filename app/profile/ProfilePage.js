import React, { Component } from 'react';
import { Header, Title, Container, Content, InputGroup, Input, Button, Icon, View } from 'native-base';

export default class ProfilePage extends Component {
    render(){
        return(
            <Container>
                <Header/>
                <Content>
                    <InputGroup>
                        <Input stackedLabel label='Name' placeholder='Name' />
                    </InputGroup>
                </Content>
            </Container>
        );
    }
}