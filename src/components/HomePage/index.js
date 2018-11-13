import React, { Component } from 'react';
import {
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, SafeAreaView, TextInput, FlatList, Image,NativeModules
} from 'react-native';
import {scaleSize, screenW} from "../../configs/ScreenUtil";
import {appColors} from "../../configs/AppConfig";

const  numColumns = 4;


export default class HomePage extends Component {
	static navigationOptions = ({navigation}) => ({
		headerTitle: '小文记单词',
	});

    moduleData = [
        {key: 'mine_icon_manhua', title: '四级词汇'},
        {key: 'mine_icon_random', title: '听力'},
        {key: 'mine_icon_activity', title: '听写'},
        {key: 'mine_icon_hot', title: '记单词'},
        {key: 'mine_icon_preview', title: '口腔学'},
        // {key: 'mine_icon_nearby', title: '附近'},
        // {key: 'mine_icon_feedback', title: '意见反馈'},
        // {key: 'mine_icon_more', title: '更多'},
	];

    constructor(props) {
    	super(props);
    	this.state = {
    		historyWords : [
    			'english',
				'history',
				'random',
				'more',
				'key',
				'publish',
			],
			searchWord:'',
		}
	}

    componentWillMount() {

    }

    _renderItem = ({item}) => {
        return (
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.item}
				onPress={() => {this._gotoModulePageClick(item)}}
			>
				<Image
					source={{uri: item.key}}
					style={styles.itemImage}
				/>
				<Text style={styles.itemText}>{item.title}</Text>
			</TouchableOpacity>
        )
    }

    _renderSectionItem() {
        return (
			<FlatList
				data={this.moduleData}
				numColumns={numColumns}
				renderItem={this._renderItem}
				style={{backgroundColor: '#fff'}}
				scrollEnabled={false}
			/>
        )
    }

	render() {
		const {navigation} = this.props;
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.searchView}>
					<TextInput
						placeholder='搜索'
						clearButtonMode='while-editing'
						underlineColorAndroid='transparent'
						style={styles.searchInput}
						onChangeText={(text) => this.setState({searchWord: text})}
					/>
					<TouchableOpacity style={styles.searchBtn} onPress={() => this._gotoWordDetailsPageClick(this.state.searchWord)}>
						<Text style={{color:'#fff'}}>搜索</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.historyView}>
					{
						this.state.historyWords.map((item, index) => (
							<TouchableOpacity style={styles.historyWordBtn} key={index} onPress={() => this._gotoWordDetailsPageClick(item)}>
								<Text style={{color: '#999'}}>{item}</Text>
							</TouchableOpacity>
						))
					}
				</View>
				<View style={styles.hLine}></View>

				{ this._renderSectionItem()}
			</SafeAreaView>
		)
	}

    _gotoModulePageClick(item) {
    	console.log('item',item);
    	if (item.title == '四级词汇') {
    		this.props.navigation.navigate('CET4WordsPage');
		}
        if (item.title == '口腔学') {
            this.props.navigation.navigate('StomatologyWordsPage');
        }

        if (item.title == '听力') {
            this.props.navigation.navigate('ListenEssayPage');
        }
        if (item.title == '听写') {
            this.props.navigation.navigate('ListenWritePage');
        }
        if (item.title == '记单词') {
            this.props.navigation.navigate('RememberWordPage');
        }
        // if (item.title == '听力') {
        //     const BDVoiceManager = NativeModules.BDVoiceManager;
        //     BDVoiceManager.speak('abc');
        // }
	}

    _gotoWordDetailsPageClick(word) {
    	if(word) {
    		this.props.navigation.navigate('WordDetailsPage', {word: word});
    		let historyWords = this.state.historyWords || [];
            historyWords.remove(word);
    		historyWords = [word].concat(historyWords);
    		this.setState({
				historyWords:historyWords
			})
		}
	}
}
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: '#fff'
    },
	searchView: {
    	flexDirection:'row',
		padding:13,
		marginTop: 10,
	},
    searchInput: {
        flex: 1,
        height: 40,
        padding: 0,
        paddingLeft: 10,
        marginHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: appColors.primary,
    },
	searchBtn: {
    	backgroundColor: appColors.primary,
		width: scaleSize(50),
        height: 40,
		justifyContent: 'center',
		alignItems:'center',
        borderRadius: 5,
	},
    hLine: {
    	height: 1,
		width: screenW,
		// backgroundColor: '#aeaeae'
	},
    historyView: {
    	paddingLeft: 13,
		paddingBottom: 13,
		paddingRight: 13,
		width: screenW,
		flexDirection: 'row',
        flexWrap:'wrap'
	},
    historyWordBtn: {
        paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
        justifyContent: 'center',
        alignItems:'center',
	},

    item: {
        backgroundColor: '#fff',
        width: screenW / numColumns,
        height: scaleSize(90),
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemImage: {
        width: scaleSize(50),
        height: scaleSize(50),
        marginBottom: 5,
    },
    itemText: {
        fontSize: 12,
    }


})
