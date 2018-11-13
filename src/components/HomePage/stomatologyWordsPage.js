import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import {getStomatologyWords} from "../../service/wordsService/words";
import {screenW} from "../../configs/ScreenUtil";


export default class StomatologyWordsPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '口腔医学词汇',
        }
    }

    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
            animating: false,
            nomore: false,
        }
        this.currentPage = 1;
    }

    componentDidMount = () => {
        this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    ListEmptyComponent={this._ListEmptyComponent}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    keyExtractor={this._keyExtractor}
                    ListFooterComponent={this._ListFooterComponent}
                    onEndReachedThreshold={0.2}
                    onEndReached={this._onEndReached}
                />
            </SafeAreaView>
        );
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        });
        this.currentPage = 1;
        getStomatologyWords({
            page: this.currentPage,
            pageSize: 25,
        }).then(res => {
            this.setState({
                refreshing: false,
            });
            if (res && res.result) {
                this.setState({
                    data: res.data,
                })
            }
        }).catch(err => {
            this.setState({
                refreshing: false,
            })
        })
    }

    _onEndReached = () => {
        this.setState({
            animating: true,
        });
        this.currentPage = this.currentPage + 1;
        getStomatologyWords({
            page: this.currentPage,
            pageSize: 25,
        }).then(res => {
            if (res && res.result) {
                if (!res.data || res.data.length == 0) {
                    this.setState({
                        nomore: true
                    })
                }
                this.setState({
                    data: [...this.state.data, ...res.data],
                    animating: false,
                })
            }
        }).catch(err => {
            this.setState({
                animating: false,
            });
        })
    }

    _ItemSeparatorComponent = () => {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor = (item, index) => {
        return '' + item.id;
    }

    _ListFooterComponent = () => {
        return (
            <View style={styles.bottomfoot}>
                {
                    this.state.data.length != 0 ?
                        this.state.nomore ? (
                            <Text style={styles.footText}>- 没有数据了 -</Text>
                        ) : (
                            <View style={styles.activeLoad}>
                                <ActivityIndicator size="small" animating={this.state.animating} />
                                <Text style={[styles.footText, styles.ml]}>加载更多...</Text>
                            </View>
                        )
                        :
                        null
                }

            </View>
        );
    };

    _ListEmptyComponent() {
        return (
            <View style={styles.container}>
                <Text style={styles.noListText}>暂无数据</Text>
            </View>
        );
    }

    _keyExtractor = (item, index) => {
        return '' + item.id;
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => this._gotoDetailsPageClick(item)}>
                <Text style={{fontSize: 18, fontWeight:'bold', color:'#555'}}>{item.word}</Text>
                <Text style={{marginLeft:15, color:'#999'}}>{item.meaning}</Text>
            </TouchableOpacity>
        )
    }

    _gotoDetailsPageClick(item) {
        this.props.navigation.navigate('WordDetailsPage', {word:item.word, meaning:item.meaning});
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    item: {
        paddingLeft:13,
        paddingRight:13,
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    noListText: {
        width: screenW,
        textAlign: 'center',
        paddingTop: 40,
        color:'#999'
    },
    footText: {
        width: screenW,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        color:'#999'
    },
    activeLoad: {
        paddingTop: 15,
    },
})
