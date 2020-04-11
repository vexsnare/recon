import React, {Component} from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class Profile extends Component {
  
  static navigationOptions = {
    drawerLabel: "Profile.",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});
export default Profile;