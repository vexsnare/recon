/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Card } from './Card';

class NotFound extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Card style={{justifyContent: 'center', alignItems: 'center', height: 200, margin: 10}}>
          <Text style={{color: 'gray'}}>No Record Found</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
 export {NotFound};
