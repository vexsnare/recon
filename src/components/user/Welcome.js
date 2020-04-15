/* @flow */
import React, { Component } from 'react';
import { primaryColor } from '../../themes';
import { Card, Button } from 'react-native-elements';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';

export default class Welcome extends Component {

  render() {
    return (
        <ScrollView style={{backgroundColor: 'white'}} >
          <View style={styles.welcome}>
            <Text style={styles.welcomeTitle}>Welcome to Paryavekshan</Text>
            <View>
              <Text style={{paddingTop: 20}}>COVID-19 Guidelines:</Text>
              <Text style={styles.textInfo}><Text>{'\u2022'}</Text> Maintain at least 1 metre distance.</Text>
              <Text style={styles.textInfo}><Text>{'\u2022'}</Text> Avoid non-essential social gatherings</Text>
              <Text style={styles.textInfo}><Text>{'\u2022'}</Text> Avoid shaking hands and hugging as a matter of greeting</Text>
            </View>
            </View>
          <Button
           iconLeft
           fontSize={16}
           containerViewStyle={{marginTop: 20}}
           onPress={() => this.props.navigation.navigate('RecordCreate')}
           backgroundColor={primaryColor}
           title='Add Record' />
          <Card style={{justifyContent: 'center', margin: 10}}>
            <View style={styles.view}>
              <Text style={styles.text}>You don't have any record.</Text>
              <Text style={styles.text}>Please click on + icon to create</Text>
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
  welcomeTitle: {
    fontSize: 30,
    fontWeight: '400',
    color: primaryColor
  },
  welcomeSubTitle: {
    color: '#333333',
    alignSelf: 'center'
  },
  text: {color: 'gray', alignSelf: 'center'},
  
});
