/* @flow */
import React, { Component } from 'react';
import { primaryColor, secondaryColor } from '../../themes';
import { Card, Button } from 'react-native-elements';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

export default class NotAuthorized extends Component {

  render() {
    return (
        <ScrollView style={{backgroundColor: 'white'}} >
          <View style={styles.welcome}>
            <Text style={styles.NotAuthorizedTitle}>Not Authorized</Text>
            </View>
          <Card style={{justifyContent: 'center', margin: 10}}>
            <View style={styles.view}>
              <Text style={styles.text}>You don't have permission to perform this action.</Text>
              <Text style={styles.text}>Please ccontact Administrator</Text>
            </View>
          </Card>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  textInfo: {
    paddingTop: 10,
    paddingBottom: 10
  },
  welcome: {
    padding: 20,
  },
  NotAuthorizedTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: secondaryColor
  },
  welcomeSubTitle: {
    color: '#333333',
    alignSelf: 'center'
  },
  text: {color: 'gray', alignSelf: 'center'},
  
});
