import React, { Component } from 'react';
import { 
	SafeAreaView,
	StyleSheet,
	Image 
} from 'react-native';
import {screenW} from "../../configs/ScreenUtil";

export default class Me extends Component {
	static navigationOptions = {
		headerTitle: '小文',
	};

	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Image style={styles.img} source={{uri: 'back_girl'}}/>
			</SafeAreaView>
		)
	}

};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'center'
	},
	img: {
		width: screenW,
		height: screenW / 1080.0 * 1528
	}

})

  
