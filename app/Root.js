import React, {Component} from 'react';
import Routes from './Routes';
//import codePush from "react-native-code-push";
import BackgroundSync from './sync/BackgroundSync';
import { setCustomText } from 'react-native-global-props';
import normalize from './utils/NormalizeText';

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

//iphne 5s - 14, 6s 18, ipad 24 
const customTextProps = { 
  style: { 
    fontSize: normalize(14)
  }
};
export default Root;
//export default codePush(Root);