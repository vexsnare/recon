import React, {Component} from 'react';
import {Image, Button, StyleSheet, View} from 'react-native';
import { createDrawerNavigator, DrawerActions, DrawerItems } from 'react-navigation-drawer';

class RecordList extends Component {
  static navigationOptions = {
    drawerLabel: "Records.",
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./../../../assets/icon.png')}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    ),
  };
  render() {
    return (
      <View style={{padding: 40}}>
      <Button
        onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
        title="Go to notifications"
      />
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

export default RecordList;