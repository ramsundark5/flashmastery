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

export default class SwipeableViews extends Component {
    
    static defaultProps = {
        initialPage: 0,
        pageStyle: null,
        pageWidth: width,
        noItemsText: "Sorry, there are currently \n no items available"
    };

    componentDidMount() {
        if (this.props.children && this.props.initialPage > 0 && this.props.initialPage < this.props.children.length) {
            this.goToPage(this.props.initialPage);
        }
    }

    goToPage(position) {
        let { pageWidth } = this.props;
        let pagePosition = position * (pageWidth);
        // in android, you can't scroll directly in componentDidMount
        // (http://stackoverflow.com/questions/33208477/react-native-android-scrollview-scrollto-not-working)
        // however this doesn't work in android for some reason:
        // InteractionManager.runAfterInteractions(() => {
        //     this.scrollView.scrollTo({ y: 0, x: pagePosition}, true);
        //     console.log('scrollView.scrollTo x:', pagePosition);
        // });
        // So I was left with an arbitrary timeout.
        setTimeout(()=> {
            this.scrollView.scrollTo({ y: 0, x: pagePosition}, true);
        }, 200);
        this._onPageChange(position);
    }

    handleScrollEnd = (e) => {
        let { pageWidth } = this.props;
        let pageOffset = pageWidth;
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
                    <TouchableWithoutFeedback
                        key={ index }
                        onPress={ () => this.goToPage(index) }>
                        <View
                            style={ [ styles.page, this.props.pageStyle ] }>
                            { c }
                        </View>
                    </TouchableWithoutFeedback>
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