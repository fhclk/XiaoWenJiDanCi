import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/Navigator/App';


import SplashScreen from 'react-native-splash-screen'

export default class Root extends Component {
    componentDidMount() {
        SplashScreen.hide();//关闭启动屏幕
    }

	render() {
		return (
			<Provider store={store}>
				<App />
	   		</Provider>
		);
	}
}

AppRegistry.registerComponent('XiaoWenJiDanCi', () => Root);