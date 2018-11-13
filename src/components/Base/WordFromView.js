import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,StyleSheet, Image
} from 'react-native';
import {appColors, wordLevel} from "../../configs/AppConfig";
import {screenW} from "../../configs/ScreenUtil";

export default class WordFromView extends Component {
    constructor() {
        super();
        this.state = {
            isShowFrom: true,
            selectedFrom: '',
            selectedChar: ''
        };
        this.wordLevel = JSON.parse(JSON.stringify(wordLevel));
        this.classifyChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    }


    render() {
        let fromList = ['四级', '口腔医学', '生词库']
        return (
            <View style={styles.fromView}>
                <TouchableOpacity style={styles.titleBtn} onPress={() => this.setState({isShowFrom:!this.state.isShowFrom})}>
                    <Text>来源</Text>
                    <Image source={{uri: 'arrow_right'}} style={{width:7, height:12}}/>
                </TouchableOpacity>
                {
                    this.state.isShowFrom ? (
                        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight:10, paddingBottom:10}}>
                            {
                                fromList.map((item, index) => (
                                    <TouchableOpacity key={index} style={styles.fromItemBtn} onPress={() => this._selectedFromClick(item)}>
                                        <Image source={{uri: this.state.selectedFrom == item ? 'radio_selected' : 'radio_unselected'}}
                                               style={{width:20, height:20, marginRight:4}}/>
                                        <Text>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ) : null
                }
                {
                    this.state.isShowFrom && this.state.selectedFrom == '四级' ? (
                        <View style={styles.classifyView}>
                            {
                                this.classifyChars.map((item, index) => (
                                    <TouchableOpacity style={[styles.charView,{backgroundColor: this.state.selectedChar == item ? appColors.primary : '#fff'}]} key={index} onPress={() => this._selectedClassifyClick(item)}>
                                        <Text style={{color:this.state.selectedChar == item ? '#fff' : '#666'}}>{item}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ) : null
                }
                {
                    this.state.isShowFrom && this.state.selectedFrom == '生词库' ? (
                        <View style={{flexDirection:'row', paddingLeft: 10, paddingRight: 10}}>
                            {
                                this.wordLevel.map((item, index) => (
                                    <TouchableOpacity key={index} style={[styles.wordLevelBtn, {backgroundColor: item['selected'] ? appColors.primary : '#fff'}]}
                                                      onPress={() => this._selectLevelClick(item)}>
                                        <Text style={{fontSize: 12, color: item['selected'] ? '#fff' : '#666'}}>{item.level}</Text>
                                    </TouchableOpacity>
                                ))
                            }
                        </View>
                    ) : null
                }
            </View>
        )
    }

    _selectedFromClick(item) {
        this.setState({
            selectedFrom:item,
            selectedChar: '',
        });
        if (this.state.selectedLevel) {
            let selectedLevel = this.state.selectedLevel;
            selectedLevel['selected'] = false;
        }
        if (item == '口腔医学') {
            this.props.selectedCallback && this.props.selectedCallback(item, '');
        }
    }

    _selectedClassifyClick(item) {
        this.setState({
            selectedChar: item
        })
        this.props.selectedCallback && this.props.selectedCallback(this.state.selectedFrom, item);
    }

    _selectLevelClick(item) {
        if (this.state.selectedLevel) {
            let selectedLevel = this.state.selectedLevel;
            selectedLevel['selected'] = false;
        }
        item['selected'] = true;
        this.setState({
            selectedLevel: item
        })
        this.props.selectedCallback && this.props.selectedCallback(this.state.selectedFrom, item.key);
    }

};

const styles = StyleSheet.create({
    fromView: {
        width: screenW,
        backgroundColor: '#fff'
    },
    titleBtn: {
        padding:13,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    fromItemBtn: {
        flexDirection: 'row',
        padding: 5,
        marginRight: 8,
        alignItems: 'center',
    },
    classifyView: {
        paddingBottom:10,
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    charView: {
        width: screenW / 9.0 - 5,
        height: screenW / 9.0 - 5,
        borderRadius: (screenW / 9.0 - 5) / 2.0,
        margin: 2,
        // backgroundColor: appColors.primary,
        borderWidth: 1,
        borderColor: appColors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordLevelBtn: {
        width: 50,
        height: 30,
        borderWidth: 1,
        borderColor: appColors.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems:'center',
        marginTop:8,
        marginBottom: 8,
        marginRight: 8,
    }
})


