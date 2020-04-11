/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { primaryColor } from '../../themes';

const FetchError = (props) => {
  const { children } = props;
  let msg = 'Error on fetching from server, Please contact system administrator';
  if(children) {
    msg = children;
  }
  return (
    <View style={styles.container}>
      <Text style={{color: 'red', fontSize: 18}}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export { FetchError };
