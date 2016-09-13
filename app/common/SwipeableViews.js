import React, { Component, PropTypes } from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    ScrollView,
    Text,
    TouchableWithoutFeedback
} from "react-native";

const { width } = Dimensions.get("window");

/** taken from https://github.com/machadogj/react-native-carousel-control */
export default class SwipeableViews extends Component {
    
    static defaultProps = {
        initialPage: 0,
        pageStyle: null,
        noItemsText: "Sorry, there are currently \n no items available"
    };

    componentDidMount() {
        if (this.props.children && this.props.initialPage > 0 && this.props.initialPage < this.props.children.length) {
            this.goToPage(this.props.initialPage);
        }
    }

    handleScrollEnd = (e) => {
        let pageOffset = width;
        //select page based on the position of the middle of the screen.
        let currentPosition = e.nativeEvent.contentOffset.x + (width / 2);
        let currentPage = ~~(currentPosition / pageOffset);

        this.scrollView.scrollTo({ y: 0, x: currentPage * pageOffset });
        this._onPageChange(currentPage);
    };

    _onPageChange(position) {
        if (this.props.onPageChange) {
            let currentElement = this.props.children[position];
            this.props.onPageChange(position, currentElement);
        }
    }

    _renderChildren(){
        let children = this.props.children.map((c, index) => {
                return (
                    <View key={ index } style={[styles.page, this.props.pageStyle]}>
                            { c }
                    </View>
                );
            });
        return children;
    }

    render() {
        let children = this._renderChildren();
        return (
            <View style={ styles.container }>
                <ScrollView
                    automaticallyAdjustContentInsets={ false }
                    bounces
                    decelerationRate={ 0.9 }
                    horizontal
                    pagingEnabled
                    onScrollEndDrag={ this.handleScrollEnd }
                    ref={ c => this.scrollView = c }
                    showsHorizontalScrollIndicator={ false }>
                    { children }
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignSelf: "stretch"
    },
    page: {
        flex: 1,
        width: width,
        justifyContent: "center",
    }
});