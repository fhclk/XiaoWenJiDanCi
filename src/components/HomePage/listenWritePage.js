import React, { Component } from 'react';
import { StyleSheet, NativeModules, View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {getCet4WordsClassy, getNewWords, getStomatologyWords} from "../../service/wordsService/words";
import {screenW} from "../../configs/ScreenUtil";
import WordFromView from "../Base/WordFromView";
import {appColors} from "../../configs/AppConfig";
import {toastTool} from "../../utils/toolUtil";



export default class ListenWritePage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '听写',
        }
    }


    BDVoiceManager = NativeModules.BDVoiceManager;

    constructor() {
        super();
        this.state = {
            currentWord: null,
            isShowWord: false,
            hasAnswer: false,
            answerContent: '',
            playWay: '发音',
            answerResult:false,
        }
        this.wordsData = [];
        this.currentIndex = 0;
    }

    componentDidMount = () => {

    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    _answerView() {
        return this.state.isShowWord ? (
            <View style={styles.centerView}>
                <Text style={{fontSize: 22, color: '#666'}}>{this.state.currentWord.word}</Text>
                <Text style={{color: '#999', marginTop: 8, fontSize: 16, marginBottom:25}}>{this.state.currentWord.meaning}</Text>
            </View>
        ) : (
            <View style={styles.centerView}>
                <TextInput style={[styles.fillContent, {flex:1}]}
                           onChangeText={(text) => this.setState({answerContent:text})}
                           placeholder={'请输入单词'}
                           placeholderTextColor={'#999'}
                           underlineColorAndroid={'transparent'}
                           multiline = {true}
                />
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={() => this._hasAnswerClick()} style={styles.confirmBtn}>
                        <Text style={{color: '#fff', fontSize: 14}}>确定</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _answerResultView() {
        return (
            <View style={styles.centerView}>
                <View style={{flexDirection:'row', marginBottom: 15, alignItems:'center'}}>
                    <Image source={{uri: this.state.answerResult ? 'answer_success' : 'answer_error'}} style={{width:50, height: 50, marginRight:15}}/>
                    <View>
                        <Text style={{fontSize: 18, color: '#666'}}>{this.state.currentWord.word}</Text>
                        <Text style={{color: '#999', marginTop: 8, fontSize: 14, width: screenW-120}}>{this.state.currentWord.meaning}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={() => this._nextClick()} style={styles.confirmBtn}>
                        <Text style={{color: '#fff', fontSize: 14}}>下一个</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _waysView() {
        let waysList = ['发音', '词义']
        return (
            <View style={{flexDirection: 'row', alignItems:'center', paddingLeft:13, paddingRight:13}}>
                <Text>方式</Text>
                <View style={{flexDirection: 'row',alignItems:'center', marginLeft: 10}}>
                    {
                        waysList.map((item, index) => (
                            <TouchableOpacity key={index} style={styles.waysItemBtn} onPress={() => this.setState({playWay:item})}>
                                <Image source={{uri: this.state.playWay == item ? 'radio_selected' : 'radio_unselected'}}
                                       style={{width:20, height:20, marginRight:4}}/>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        )
    }

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container}>
                <WordFromView selectedCallback={(from, value) => this._selectedFrom(from, value)}/>
                {this._waysView()}
                {
                    this.state.currentWord ? (
                        <View style={styles.wordView}>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>{this.currentIndex == 0 ? 1 : this.currentIndex}</Text>
                                <TouchableOpacity onPress={() => this._playWord(this.state.currentWord)}>
                                    <Image source={{uri:'voice'}} style={styles.playImg} />
                                </TouchableOpacity>
                            </View>
                            {
                                this.state.hasAnswer ? this._answerResultView() : this._answerView()
                            }
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableOpacity onPress={() => this.setState({isShowWord: !this.state.isShowWord})}>
                                    <Text style={{color: appColors.primary, fontSize: 14}}>{this.state.isShowWord ? '隐藏' : '显示'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._gotoDetailsPageClick(this.state.currentWord)}>
                                    <Text style={{color: appColors.primary, fontSize: 14}}>单词详细</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : null
                }
            </KeyboardAwareScrollView>
        );
    }

    _selectedFrom(from, value) {
        this._initWordsData();
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
                this._loopPlay(data)
            });
        }
        else if (from == '生词库') {
            this._getNewWords(value, (data) => {
                this.wordsData = data;
                this._loopPlay(data)
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

    _initWordsData() {
        this.wordsData = [];
        this.currentIndex = 0;
        this.setState({
            currentWord: null
        });
    }

    _loopPlay() {
        if (this.interval) {
            clearInterval(this.interval);
        }
        if (!this.wordsData || this.wordsData.length == 0) {
            this._initWordsData();
            return;
        }
        this.setState({
            currentWord: this.wordsData[0]
        });
        this._playWord(this.wordsData[0]);
        this.currentIndex = (this.currentIndex + 1) % this.wordsData.length;
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

    _hasAnswerClick() {
        if (!this.state.answerContent) {
            toastTool('请输入单词');
            return;
        }
        let fillContent = this.state.answerContent;
        let orfinWord = this.state.currentWord.word;
        let result = false;
        if (fillContent.clearAllSpace().toLowerCase() == orfinWord.clearAllSpace().toLowerCase()) {
            result = true;
        }
        this.setState({
            hasAnswer:true,
            answerResult:result
        })
    }

    _nextClick() {
        let word = this.wordsData[this.currentIndex];
        this.setState({
            hasAnswer:false,
            answerResult:false,
            currentWord: word
        });
        this._playWord(word);
        this.currentIndex = (this.currentIndex + 1) % this.wordsData.length;
    }

    /**
     * 发音
     * @param word
     * @private
     */
    _playWord(word) {
        let content = ''
        if (this.state.playWay == '发音') {
            content = word.word;
        }
        else {
            content = word.meaning;
        }
        this.BDVoiceManager.setVoiceVolume(0.7);
        this.BDVoiceManager.setVoiceSpeed(4);
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
    },
    centerView: {
        flex: 1,
        padding:10,
        justifyContent:'center',
        marginTop: 5,
        marginBottom:5,
    },
    fillContent: {
        color: '#999',
        fontSize: 17,
        height:40,
        textAlignVertical: 'top',
        marginBottom:15,
        backgroundColor:'#fbfbfb',
        padding:5
    },
    playImg: {
        width: 22,
        height: 22,
    },
    waysItemBtn: {
        flexDirection: 'row',
        padding: 5,
        marginRight: 8,
        alignItems: 'center',
    },
    confirmBtn: {
        backgroundColor: appColors.primary,
        paddingRight:8,
        paddingLeft:8,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5
    }
})
