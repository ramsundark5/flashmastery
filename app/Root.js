import React, {Component} from 'react';
import Routes from './Routes';
import codePush from "react-native-code-push";

class Root extends Component {

    componentDidMount(){
    }

    render() {
        return (
            <Routes />
        );
    }
}

export default codePush(Root);