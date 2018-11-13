import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import {wordLevel} from "../../configs/AppConfig";
import NewWordsList from './components/NewWordsList';


export default class NewWord extends Component {
	static navigationOptions = ({navigation}) => ({
		headerTitle: '生词库',
	});

	render() {
		const {navigation} = this.props;
		return (
			<ScrollableTabView
				renderTabBar={this._renderTabBar}
				ref={scroll => this.scroll = scroll}
			>
				{
                    wordLevel.map((item, index) => (
						<NewWordsList
							key={index}
							tabLabel={item.level}
							navigation={navigation}
							level={item.key}
						/>
					))
				}
			</ScrollableTabView>
		)
	}

    _renderTabBar = () => {
        return <DefaultTabBar
			backgroundColor={'#ff2e57'}
			activeTextColor={'#fff'}
			inactiveTextColor={'#fff'}
			textStyle={styles.tabBarText}
			underlineStyle={styles.tabBarUnderline}
			style={{height: 35}}
		/>
    }

}
  
const styles = StyleSheet.create({
	tabBarText: {
		fontSize: 13, 
		textAlign: 'center',
	},
	tabBarUnderline: {
		backgroundColor: '#fff',
		borderRadius: 4,
		marginBottom: 2,
	}
})
