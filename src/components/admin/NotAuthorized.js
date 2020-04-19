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
            <Text style={{fontSize: 15, textAlign: 'justify', paddingHorizontal: 20}}>You have been assigned to collect record. You can't add or update users in system</Text>
          <Card style={{justifyContent: 'center', margin: 10}}>
            <View style={styles.view}>
              <Text style={styles.text}>Please ccontact Administrator</Text>
              <Text style={styles.text}>To add or update Users.</Text>
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
    padding: 10,
    flex: 1,
    alignItems: 'center'
  },
  NotAuthorizedTitle: {
    fontSize: 30,
    color: primaryColor,
  },
  welcomeSubTitle: {
    color: '#333333',
    alignSelf: 'center'
  },
  text: {color: 'gray', alignSelf: 'center'},
  
});
