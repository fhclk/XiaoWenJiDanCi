import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Text, TouchableOpacity, WebView } from 'react-native';
import {getStomatologyWords} from "../../service/wordsService/words";
import {screenW} from "../../configs/ScreenUtil";



export default class ListenEssayPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '听力',
        }
    };


    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
        }
    }

    componentDidMount = () => {
        // this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <WebView
                    source={{uri:'https://www.xiahuang.vip/'}}
                    style={{flex: 1}}
                    scalesPageToFit={true}
                    mediaPlaybackRequiresUserAction={true}
                />
                {/*<FlatList*/}
                    {/*data={this.state.data}*/}
                    {/*renderItem={this._renderItem}*/}
                    {/*ItemSeparatorComponent={this._ItemSeparatorComponent}*/}
                    {/*ListEmptyComponent={this._ListEmptyComponent}*/}
                    {/*refreshing={this.state.refreshing}*/}
                    {/*onRefresh={this.onRefreshing}*/}
                    {/*keyExtractor={this._keyExtractor}*/}
                {/*/>*/}
            </SafeAreaView>
        );
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        });
        this.currentPage = 1;
        getStomatologyWords({
            'classify': this.selectedChar
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

    _ItemSeparatorComponent = () => {
        return (
            <View style={{height: 0.5, backgroundColor: 'rgba(100,100, 100, 0.2)'}} />
        )
    }

    _keyExtractor = (item, index) => {
        return '' + item.id;
    }

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
        this.props.navigation.navigate('WordDetailsPage', {word:item.word});
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
    }
})
