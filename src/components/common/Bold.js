import React from 'react';
import { Text } from 'react-native';

const Bold = (props) => {
  return <Text style={[styles.textStyle, props.style]}>{props.children}</Text>;
};

const styles = {
  textStyle: {
    fontWeight: '500'
  }
};

export { Bold };
