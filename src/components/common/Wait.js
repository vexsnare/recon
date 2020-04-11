/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { primaryColor } from '../../themes';

const Wait = (props) => {

  const { color, size, ...otherProps } = props;
  let indicatorSize = size ? size : 'large';
  let indicatorColor = color ? color : primaryColor;
  return (
    <View style={styles.container}>
      <ActivityIndicator size={indicatorSize} color={indicatorColor} {...otherProps} />
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

export { Wait };
