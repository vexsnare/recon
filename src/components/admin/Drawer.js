import React, {Component} from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { Icon } from 'react-native-elements';
import CreateAccount from './CreateAccount';
import UpdateAccount from './UpdateAccount';
import {ProfileScreen} from '../shared/Profile';
import RecordNavigator from './RecordList';
import { primaryColor } from '../../themes';
import DrawerHeader from './DrawerHeader';


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


const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView
      style={styles.container}
      forceInset={{ top: 'always', horizontal: 'never' }}
    >
      <DrawerHeader/>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
  hideStatusBar: false,
  contentOptions: {
    activeTintColor: primaryColor,
    itemsContainerStyle: {
      marginVertical: 0,
      flex: 1,
      flexDirection: 'column'
    },
    labelStyle: {
      fontFamily: 'Roboto'
    },
    iconContainerStyle: {
      opacity: 1
    }
  },
  contentComponent: CustomDrawerContentComponent
}
);
