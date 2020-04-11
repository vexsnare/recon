import React from 'react';
import { Text, View, Platform, StyleSheet } from 'react-native';

const Header = (props) => {
  const textStyle = [styles.text];
  const viewStyle = [styles.view];
  const containerStyle = [styles.container];
  const { headerText, color, renderLeftButton, renderRightButton } = props;
  return (
    <View style={[containerStyle, {backgroundColor: color}]}>
    <View style={viewStyle} >
      {renderLeftButton ? renderLeftButton() : null}
      <Text style={textStyle}>{headerText}</Text>
      {renderRightButton ? renderRightButton() : null}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: Platform.select({
    ios: {
      fontSize: 20,
      flexDirection: 'row',
      alignSelf: 'center'
    },
    android: {
      fontSize: 20
    },
  }),
  view: Platform.select({
    ios: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 25,
    },
    android: {
      flexDirection: 'row',
      marginTop: 20
    }
  }),
  container: Platform.select({
    ios: {
      height: 60,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#F8F8F8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
    },
    android: {
      height: 70,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#F8F8F8',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      elevation: 2,
    }
  })
});


export { Header };
