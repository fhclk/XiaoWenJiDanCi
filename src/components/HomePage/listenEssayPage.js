import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, WebView } from 'react-native';



export default class ListenEssayPage extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: '听力',
        }
    };

    constructor() {
        super();
        this.state = {
            refreshing: false,
            data: [],
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <WebView
                    source={{uri:'https://www.xiahuang.vip/'}}
                    style={{flex: 1}}
                    scalesPageToFit={true}
                    mediaPlaybackRequiresUserAction={true}
                />
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff'
    },
})
