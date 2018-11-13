import React, { Component } from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import {appColors, wordLevel} from "../../configs/AppConfig";

export default class AddNewWordView extends Component {
    constructor() {
        super();
        this.state = {
            isAdd: false,
            selectedLevel:null
        };
        this.wordLevel = JSON.parse(JSON.stringify(wordLevel));
    }


    render() {
        return (
            <View style={{marginTop:10}}>
                <TouchableOpacity style={styles.addToLib} onPress={() => this.setState({isAdd:!this.state.isAdd})}>
                    <Text>加入生词库</Text>
                </TouchableOpacity>
                {
                    this.state.isAdd ? (
                        <View style={{flexDirection:'row'}}>
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
        );
    }

    _selectLevelClick(item) {
        if (this.state.selectedLevel) {
            let selectedLevel = this.state.selectedLevel;
            selectedLevel['selected'] = false;
        }
        item['selected'] = true;
        this.setState({
            selectedLevel: item
        });
        this.props.selectedCallback && this.props.selectedCallback(item);
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addToLib: {
        paddingTop: 8,
        paddingBottom: 8,
        width: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: appColors.primary,
        borderRadius: 4,
    },
    wordLevelBtn: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: appColors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center',
        marginTop:8,
        marginBottom: 8,
        marginRight: 8,
    }
})


