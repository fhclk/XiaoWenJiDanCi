import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, ScrollView, Image, NativeModules
} from 'react-native';
import API from '../../configs/API';
import {appColors, wordLevel} from "../../configs/AppConfig";

import AddNewWordView from '../Base/AddNewWordView';
import {addNewWord} from "../../service/wordsService/words";
import {toastTool} from "../../utils/toolUtil";


export default class WordDetailsPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            // headerTitle: navigation.state.params && navigation.state.params.pageTitle
            headerTitle: '词典'
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            wordInfo:null
        };

        this._loadWrod();
    }

    componentDidMount = () => {
        const { navigation } = this.props
        navigation.setParams({
            pageTitle: '词典',
        })
    }

    _loadWrod() {
        let {word} = this.props.navigation.state.params;
        let header={
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": '*'
        };
        fetch(API.youdao.wordTranslate(word),{
            method: 'GET',
            mode: "cors",
            headers: header,
        })
            .then((response) => response.json())
            .then((jsonData) => {
                console.log('jsonData', jsonData);
                if (jsonData.errorCode == 0) {
                    this.setState({
                        wordInfo: jsonData
                    })
                }
            }).catch(err => {

        });
    }

    render() {
        if (!this.state.wordInfo) {
            return (
                <View style={styles.container}/>
            )
        }
        return (
            <ScrollView style={styles.container}>
                <View style={styles.wordTitle}>
                    <Text style={{fontSize: 28, color:'#666', fontWeight:'bold', marginRight:15, }}>{this.state.wordInfo.query}</Text>
                    {
                        this.state.wordInfo.basic && this.state.wordInfo.basic.phonetic ? <Text style={{marginRight:15}}>[ {this.state.wordInfo.basic.phonetic} ]</Text> : null
                    }
                    <TouchableOpacity onPress={() => this._speakWord(this.state.wordInfo.query)}>
                        <Image source={{uri:'voice'}} style={styles.playImg} />
                    </TouchableOpacity>
                </View>
                {
                    this.state.wordInfo.basic && this.state.wordInfo.basic.explains ? (
                        <View>
                            {
                                this.state.wordInfo.basic.explains.map((item, index) => (
                                    <Text key={index} style={{paddingBottom:7}}>{item}</Text>
                                ))
                            }
                        </View>
                    ) : null
                }

                <View style={{marginTop:10, marginBottom:20}}>
                    <View style={styles.otherTitle}>
                        <Text style={{color: '#999'}}>其他</Text>
                    </View>
                    {
                        this.state.wordInfo.web.map((item, index) => (
                            <View key={index} style={{marginTop: 10, marginBottom: 10}}>
                                <View style={{marginBottom: 10, flexDirection: 'row'}}>
                                    <Text>{index + 1 + '. '}</Text>
                                    <Text>{item.key}</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    {
                                        item.value.map((item, index) => (
                                            <Text key={index} style={{fontSize: 13, color: '#999', marginRight: 6}}>{item}</Text>
                                        ))
                                    }
                                </View>
                            </View>
                        ))
                    }
                </View>

                <AddNewWordView selectedCallback={(classify)=> this._selectedClassifyClick(classify)}></AddNewWordView>
            </ScrollView>
        )
    }


    _speakWord(word) {
        const BDVoiceManager = NativeModules.BDVoiceManager;
        BDVoiceManager.setVoiceVolume(0.7);
        BDVoiceManager.setVoiceSpeed(4);
        BDVoiceManager.speak(word);
    }

    _selectedClassifyClick(classify) {
        let {word, meaning} = this.props.navigation.state.params;
        let params = {}
        if (this.state.wordInfo.basic) {
            let meaning = ''
            this.state.wordInfo.basic.explains.map((item) => (
                meaning = meaning + item + ' '
            ));
            params = {
                word : this.state.wordInfo.query || word,
                voice : this.state.wordInfo.basic.phonetic || '',
                meaning : meaning,
                level: classify.key
            }
        }
        else {
            params = {
                word : this.state.wordInfo.query || word,
                voice : '',
                meaning : meaning || '',
                level: classify.key
            }
        }
        addNewWord(params).then(res => {
            if (res && res.result) {
                toastTool('添加成功');
            }
            else {
                toastTool('添加失败');
            }
        }).catch(err => {
            toastTool('添加失败');
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingLeft: 13,
        paddingRight: 13,
    },
    wordTitle: {
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    playImg: {
        width: 22,
        height: 22,
    },
    otherTitle: {
        borderBottomWidth: 1,
        borderBottomColor: appColors.primary,
        paddingTop: 8,
        paddingBottom: 8
    },

})
