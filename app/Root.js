import React, {Component} from 'react';
import Routes from './Routes';
import codePush from "react-native-code-push";
import BackgroundSync from './sync/BackgroundSync';

class Root extends Component {

    componentDidMount(){
        BackgroundSync.init();
    }

    render() {
        return (
            <Routes />
        );
    }
}

export default codePush(Root);