/* @flow */
import {Icon} from 'react-native-elements';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const SideMenuItem = (props) => {
  const {icon, children} = props;
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Icon name={icon.name} type={icon.type} />
        <Text style={styles.text}>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    height: 45,
  },
  itemContainer: {
    flexDirection: 'row',
    marginLeft: 20
  },
  text: {
    paddingLeft: 35,
    fontSize: 17,
    fontWeight: 'normal',
    color: '#535251',
    paddingTop: 1
  }
});

export { SideMenuItem };
