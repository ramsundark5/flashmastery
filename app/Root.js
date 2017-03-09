import React, {Component} from 'react';
import Routes from './Routes';
//import codePush from "react-native-code-push";
import BackgroundSync from './sync/BackgroundSync';
import { setCustomText } from 'react-native-global-props';

class Root extends Component {

    componentDidMount(){
        //BackgroundSync.init();
        setCustomText(customTextProps);
    }

    render() {
        return (
            <Routes />
        );
    }
}

const customTextProps = { 
  style: { 
    fontSize: 16
  }
};
export default Root;
//export default codePush(Root);