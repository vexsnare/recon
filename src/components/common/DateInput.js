import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { inputFloatingLabelFontSize, inputLabelFontSize, placeholderTextColor, inputTextSize } from '../../themes';

import DatePicker from '../lib/datepicker';

class DateInput extends Component {

  renderLabel(value, label) {
    if(value && Platform.OS === "android") {
      return <Text style={styles.label}>{label}</Text>
    }
    return null;
  }

  render() {
    const { date, onDateChange, label, ...otherProps } = this.props;
    return (
      <View style={styles.container}>
        {
          label && this.renderLabel(date, label)
        }
          <View>
            <DatePicker
              {...otherProps}
              date={date}
              mode="date"
              customStyles={{
                placeholderText: {
                  fontSize: inputLabelFontSize,
                  color: placeholderTextColor,
                },
                dateText: {
                  fontSize: inputTextSize
                }
              }}
              placeholder={label}
              format="DD-MM-YYYY"
              minDate="01-01-2014"
              maxDate="01-01-2034"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={true}
              onDateChange={onDateChange}
            />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: Platform.select({
    ios: {
      borderColor: 'gray',
      borderBottomWidth: 0.5,
    },
    android: {
      borderColor: 'gray',
      borderBottomWidth: 0.5,
      paddingTop: 10
    }
  })
  ,
  label: {
    color: 'gray',
    fontSize: inputFloatingLabelFontSize
  },
});

export { DateInput };
