import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View
} from 'react-native';

const Button = (props) => {

    const { onPress, children, color, disabled, textColor, backgroundColor, size } = props;
    const buttonStyle = [styles.button];
    const textStyle = [styles.text];
    const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

    if (color) {
      if (Platform.OS === 'ios') {
        textStyle.push({ color: color });
      } else {
        buttonStyle.push({ backgroundColor: color });
      }
    }
    if (textColor) {
      textStyle.push({ color: textColor });
    }
    if (backgroundColor) {
      buttonStyle.push({ backgroundColor: backgroundColor });
    }
    if(size === 'small') {
      textStyle.push({padding: 9, fontWeight: '400'});
      buttonStyle.push({width: 90});
    }
    if (disabled) {
     buttonStyle.push(styles.buttonDisabled);
     textStyle.push(styles.textDisabled);
   }

   const formattedTitle = Platform.OS === 'android' ? children.toUpperCase() : children;

    return (
        <Touchable
          style={styles.buttonStyle}
          disabled={disabled}
          onPress={onPress}
        >
          <View style={buttonStyle}>
            <Text style={textStyle}>{formattedTitle}</Text>
          </View>
        </Touchable>
    );
};

let defaultColor = '#f46d21';
if (Platform.OS === 'ios') {
  defaultColor = '#fc620b';
}

const styles = StyleSheet.create({
  button: Platform.select({
    ios: {
      borderRadius: 5,
      backgroundColor: '#f1f1f1',
      overflow: 'hidden'
    },
    android: {
      backgroundColor: defaultColor,
      borderRadius: 2,
    },
  }),
  text: Platform.select({
    ios: {
      color: defaultColor,
      textAlign: 'center',
      padding: 13,
      fontSize: 18,
    },
    android: {
      textAlign: 'center',
      color: 'white',
      fontSize: 18,
      padding: 13,
      fontWeight: '500',
    },
  }),
  buttonDisabled: Platform.select({
    ios: {
      backgroundColor: '#c3c3c3'
    },
    android: {
      elevation: 0,
      backgroundColor: '#dfdfdf',
    }
  }),
  textDisabled: Platform.select({
    ios: {
      color: '#ffffff',
    },
    android: {
      color: '#a1a1a1',
    }
  }),
});


export { Button };
