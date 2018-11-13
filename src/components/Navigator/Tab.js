import React, { Component } from 'react';
import { 
    Text, 
    Image, 
    View, 
    StyleSheet 
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import TabBar from './TabBar';
import HomePage from '../HomePage';
import NewWord from '../NewWord';
import StudyPlan from '../StudyPlan';
import Me from '../Me';

const tabBarOptions = {
    activeTintColor: '#ff2e57',
    inactiveTintColor: '#666',
}

export default TabNavigator(
    {
        Essence: { 
            screen: HomePage,
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_essence_click' : 'tabbar_essence'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '首页',
            } 
        },
        New: { 
            screen: NewWord,
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_new_click' : 'tabbar_new'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '生词库',
            } 
        },
        StudyPlan: {
            screen: StudyPlan,
            navigationOptions: {  
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_friend_click' : 'tabbar_friend'}}  
                        style={styles.item}  
                        />  
                ),
                tabBarLabel: '计划',
            } 
        },
        Me: { 
            screen: Me,
            navigationOptions: {
                tabBarIcon: ({focused}) => (  
                    <Image 
                        source={{uri: focused ? 'tabbar_me_click' : 'tabbar_me'}}  
                        style={styles.item}
                        />  
                ),
                tabBarLabel: '我',   
            } 
        },
    },
    {
        tabBarComponent:(props) => <TabBar {...props} />,// 自定义tab样式
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions,
    }
)

const styles = StyleSheet.create({
    item: {
        width: 27,
        height: 27,
    },
    centerItem: {
        width: 38,
        height: 38,
    },
})