import Profile from './Profile';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor} from '../../themes';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import RecordListScreen from './RecordList';
import RecordCreateScreen from './RecordCreate';
import RecordViewScreen from './RecordView';
import RecordEditScreen from './RecordEdit';
import { Icon } from 'react-native-elements'
import {
  View,
  TouchableWithoutFeedback
} from 'react-native';

const RecordStackNavigator = createStackNavigator({
  records: {
    screen: RecordListScreen,
    navigationOptions: ({ navigation }) => ({
         headerLeft: <TouchableWithoutFeedback
                        onPress={ () => navigation.navigate('DrawerOpen') }
                     >
                      <View style={{padding: 10}}><Icon type='ionicon' name="ios-menu" size={35} /></View>
                    </TouchableWithoutFeedback>,

    title: 'Home'
    })
  },
  recordCreate: {
    screen: RecordCreateScreen,
    navigationOptions: {
      title: 'Create'
    }
  },
  recordView: {
    screen: RecordViewScreen,
    navigationOptions: ({navigation}) =>( {
      title: 'View',
      headerRight:
                  <TouchableWithoutFeedback
                     onPress={ () => navigation.navigate('recordEdit') }
                  >
                   <View style={{padding: 10}}><Icon name="mode-edit" size={22} /></View>
                 </TouchableWithoutFeedback>,
    })
  },
  recordEdit: {
    screen: RecordEditScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Edit',
    })
  }
}
);

const TabScreenNavigator = createBottomTabNavigator(
  {
    home: {
      screen: RecordStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-contact' : 'ios-contact'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    
  activeTintColor: primaryColor,
    labelStyle: {
      fontSize: 12,
    },
    style: {
      backgroundColor: 'blue',
    },
  }
);

export default TabScreenNavigator;
