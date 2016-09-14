import React, {Component} from 'react'
import {View,StyleSheet,Dimensions} from 'react-native'

const { width: deviceWidth } = Dimensions.get('window');

export default class ResponsiveGrid extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      this._columnWidth = (props.rowWidth || deviceWidth) / props.columnCount;
    }

  render() {
    return (
      <View style={[this.props.style, styles.container, {width: this.props.rowWidth,}]}>
        {this._renderCells()}
      </View>
    );
  }

  _renderCells() {
      return this.props.dataSource.map((data, index, dataList) => {
          return (
            <View style={{width: this._columnWidth, }} key={`cell-${(data.key != null) ? data.key : index}`}>
              {this.props.renderCell(data, index, dataList)}
            </View>
          );
      });
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});