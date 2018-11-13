import React, { Component } from 'react';
import {  
    SafeAreaView,
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TextInput,
    FlatList,
} from 'react-native';
import NavItem from "../Navigator/NavItem";
import {toastTool} from "../../utils/toolUtil";



export default class StudyPlan extends Component {
    static navigationOptions = (navigation) => ({
        headerTitle: '计划',
        headerRight: <NavItem source={{uri: 'nav_add'}}
                              onPress={navigation.navigation.state.params && navigation.navigation.state.params.addNewPlanClick}/>,
    });

    _addNewPlanClick = () => {
        toastTool('敬请期待');
    }

    componentWillMount() {
        this.props.navigation.setParams({'addNewPlanClick':this._addNewPlanClick });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{marginTop:100, color:'#888', fontSize:16}}>还未想好做成什么样，敬请期待！</Text>
            </SafeAreaView>
        );
    }


};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center'
    }
})
  
