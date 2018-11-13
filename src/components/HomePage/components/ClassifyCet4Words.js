import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';
import {screenW} from "../../../configs/ScreenUtil";
import {appColors} from "../../../configs/AppConfig";
import {getCet4WordsClassy} from "../../../service/wordsService/words";

export default class ClassifyCet4Words extends Component {
    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
        }
        this.selectedChar = 'A';
        this.classifyChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }
    componentWillMount = () => {
        this.onRefreshing();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.classifyView}>
                    {
                        this.classifyChars.map((item, index) => (
                            <TouchableOpacity style={styles.charView} key={index} onPress={() => this._selectedClassifyClick(item)}>
                                <Text style={{color:'#fff'}}>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    ListEmptyComponent={this._ListEmptyComponent}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefreshing}
                    keyExtractor={this._keyExtractor}
                />
            </SafeAreaView>
        );
    }

    onRefreshing = () => {
        this.setState({
            refreshing: true,
        });
        getCet4WordsClassy({
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
        this.props.navigation.navigate('WordDetailsPage', {word:item.word, meaning:item.meaning});
    }

    _selectedClassifyClick(char) {
        this.selectedChar = char;
        this.onRefreshing();
    }
};

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
    classifyView: {
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    charView: {
        width: screenW / 9.0 - 5,
        height: screenW / 9.0 - 5,
        borderRadius: (screenW / 9.0 - 5) / 2.0,
        margin: 2,
        backgroundColor: appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noListText: {
        width: screenW,
        textAlign: 'center',
        paddingTop: 40,
        color:'#999'
    }
})


