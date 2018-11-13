import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, NativeModules, View, Text, TouchableOpacity } from 'react-native';
import {getCet4WordsClassy, getNewWords, getStomatologyWords} from "../../service/wordsService/words";
import {screenW} from "../../configs/ScreenUtil";
import WordFromView from "../Base/WordFromView";
import {appColors} from "../../configs/AppConfig";



export default class RememberWordPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '记单词',
        }
    };


    BDVoiceManager = NativeModules.BDVoiceManager;

    constructor() {
        super();
        this.state = {
            currentWord: null,
        };
        this.wordsData = [];
        this.currentIndex = 0;
        this.stomatologyWordsData = [];
    }

    componentDidMount = () => {
        this.BDVoiceManager.cancelSpeak();
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        this.BDVoiceManager.cancelSpeak();
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <WordFromView selectedCallback={(from, value) => this._selectedFrom(from, value)}/>
                {
                    this.state.currentWord ? (
                        <View style={styles.wordView}>
                            <View></View>
                            <View style={{padding:13, justifyContent:'center'}}>
                                <Text style={{fontSize: 22, color: '#666'}}>{this.state.currentWord.word}</Text>
                                <Text style={{color: '#999', marginTop: 8, fontSize: 16}}>{this.state.currentWord.meaning}</Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <TouchableOpacity onPress={() => this._gotoDetailsPageClick(this.state.currentWord)}>
                                    <Text style={{color: appColors.primary, fontSize: 14}}>单词详细</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null
                }
            </SafeAreaView>
        );
    }

    _selectedFrom(from, value) {
        this.BDVoiceManager.cancelSpeak();
        if (from == '口腔医学') {
            this._getStomatologyWords(1, (data) => {
                if (data && data.length != 0) {
                    this.wordsData = data;
                    this._loopPlay();
                    this._getStomatWordsFunc(2);
                }
            });
        }
        else if (from == '四级') {
            this._getCet4WordsClassy(value, (data) => {
                this.wordsData = data;
                this._loopPlay();
            });
        }
        else if (from == '生词库') {
            this._getNewWords(value, (data) => {
                this.wordsData = data;
                this._loopPlay();
            });
        }
    }

    /**
     * 回归调用
     * @param index
     * @private
     */
    _getStomatWordsFunc(index) {
        this._getStomatologyWords(index, (data) => {
            if (data && data.length != 0) {
                this.wordsData = this.wordsData.concat(data);
                this._getStomatWordsFunc(index+1);
            }
            else {
                console.log('wordsData:', this.wordsData);
                return;
            }
        });
    }

    /**
     * 播放第index单词
     * @param index
     * @private
     */
    _playIndexWord(index) {
        let word = this.wordsData[index];
        this.setState({
            currentWord: word
        });
        this._playWord(word);
        this.currentIndex = (this.currentIndex + 1) % this.wordsData.length;
    }

    /**
     * 初始化数据
     * @private
     */
    _initWordsData() {
        this.currentIndex = 0;
        this.wordsData= [];
        this.setState({
            currentWord: null
        });
    }

    /**
     * 循环播放单词
     * @private
     */
    _loopPlay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (!this.wordsData || this.wordsData.length == 0) {
            this._initWordsData();
            return;
        }
        this._playIndexWord(0);
        this.interval = setInterval(() => {
            this._playIndexWord(this.currentIndex);
        }, 17000)
    }

    _getStomatologyWords(index, success) {
        getStomatologyWords({
            page: index,
            pageSize: 25,
        }).then(res => {
            if (res && res.result) {
                success && success(res.data);
            }
        }).catch(err => {

        })
    }

    _getCet4WordsClassy(classify,success) {
        getCet4WordsClassy({
            'classify': classify
        }).then(res => {
            if (res && res.result) {
                success && success(res.data);
            }
        }).catch(err => {

        })
    }

    _getNewWords(level, success) {
        getNewWords({
            'level': level
        }).then(res => {
            if (res && res.result) {
                success && success(res.data);
            }
        }).catch(err => {

        })
    }

    _gotoDetailsPageClick(item) {
        this.props.navigation.navigate('WordDetailsPage', {word:item.word});
    }

    /**
     * 发音
     * @param word
     * @private
     */
    _playWord(word) {
        let content = ''
        content += word.word;
        content = content + ' ，拼写： ' + word.word.splitWithChar(' , ');
        content = content + ' ，意思： ' + word.meaning;
        this.BDVoiceManager.setVoiceVolume(0.7);
        this.BDVoiceManager.setVoiceSpeed(3);
        this.BDVoiceManager.speak(content);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
    wordView: {
        width: screenW - 20,
        marginTop: 20,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 8,
        height: 200,
        padding: 13,
        // backgroundColor: 'green',
        justifyContent:'space-between'
    }
})
