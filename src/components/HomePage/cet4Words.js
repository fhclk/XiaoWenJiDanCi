import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

import OrderlyCet4Words from './components/OrderlyCet4Words.js';
import UnorderlyCet4Words from './components/UnorderlyCet4Words.js';
import ClassifyCet4Words from './components/ClassifyCet4Words.js';


export default class CET4WordsPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            // headerRight: <NavItem
            //     source={{uri: 'nav_random'}}
            //     onPress={navigation.state.params && navigation.state.params._onPress}
            // />,
            headerTitle: '四级词汇',
        }
    }

    _onPress = () => {
        this.lists[this.scroll.state.currentPage].onRefreshing();
    }

    componentDidMount = () => {
        const { navigation } = this.props
        navigation.setParams({
            _onPress: this._onPress,
        })
    }

    render() {
        const {navigation} = this.props;
        this.lists = [];
        return (
            <ScrollableTabView
                renderTabBar={this._renderTabBar}
                ref={scroll => this.scroll = scroll}
            >
                <OrderlyCet4Words
                    tabLabel="顺序"
                    navigation={navigation}
                />
                <UnorderlyCet4Words
                    tabLabel="无序"
                    navigation={navigation}
                />
                <ClassifyCet4Words
                    tabLabel="字母"
                    navigation={navigation}
                />
            </ScrollableTabView>
        )
    }

    _renderTabBar = () => {
        return <DefaultTabBar
            backgroundColor={'#ff2e57'}
            activeTextColor={'#fff'}
            inactiveTextColor={'#fff'}
            textStyle={styles.tabBarText}
            underlineStyle={styles.tabBarUnderline}
            style={{height: 35}}
        />
    }
}

const styles = StyleSheet.create({
    tabBarText: {
        fontSize: 13,
        textAlign: 'center',
    },
    tabBarUnderline: {
        // width: 24,
        // marginHorizontal: (width-24*5)/10,
        backgroundColor: '#fff',
        borderRadius: 4,
        marginBottom: 2,
    }
})
