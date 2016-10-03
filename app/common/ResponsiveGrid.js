import React, {Component} from 'react'
import {View,StyleSheet,Dimensions} from 'react-native';

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
        {this._renderExtraCellAtEnd()}
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

  _renderExtraCellAtEnd(){
      const {extraCellAtEnd} = this.props;
      let cellsLength = this.props.dataSource.length;
      if(!extraCellAtEnd){
        return null;
      }
      return (
            <View style={{width: this._columnWidth, }} key={`cell-${(extraCellAtEnd.key != null) ? extraCellAtEnd.key : cellsLength}`}>
                {this.props.renderCell(extraCellAtEnd, cellsLength)}
            </View>
      );
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});