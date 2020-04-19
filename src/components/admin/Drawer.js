import React, {Component} from 'react';
import { View, StyleSheet, Button, Image, SafeAreaView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import CreateAccount from './CreateAccount';
import UpdateAccount from './UpdateAccount';
import {ProfileScreen} from '../shared/Profile';
import RecordNavigator from './RecordList';
import { primaryColor } from '../../themes';


const ProfileStackNav =  createStackNavigator({
  'Profile': {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: "Profile",
      headerLeft: <TouchableWithoutFeedback
                       onPress={ () => navigation.toggleDrawer()}
                    >
                     <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
                   </TouchableWithoutFeedback>
    })
  }},
  {
    initialRouteName: 'Profile'
  }
)

export default createDrawerNavigator({
  "RecordList": {
    screen: RecordNavigator,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Records',
      drawerIcon: <Icon type='ionicon' name="ios-journal" />
    })
  },
  "Profile": {
    screen: ProfileStackNav,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Profile',
      drawerIcon: <Icon type='ionicon' name="ios-person" />
    })
  },
  "Register": {
    screen: CreateAccount,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Create Account',
      drawerIcon: <Icon type='ionicon' name="ios-ribbon" />
    })
  },
  "UpdateAccount": {
    screen: UpdateAccount,
    navigationOptions: ({navigation}) => ({
      drawerLabel: 'Update Account',
      drawerIcon: <Icon type='ionicon' name="ios-settings" />
    })
  }
}, {
  headerMode: 'screen',
  initialRouteName: 'RecordList',
  drawerPosition: 'Left',
  contentOptions: {
    activeTintColor: primaryColor,
    itemsContainerStyle: {
      marginVertical: 0,
      flex: 1,
      flexDirection: 'column'
    },
    iconContainerStyle: {
      opacity: 1
    }
  }
}
);
