import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Picker,
  Platform,
  StyleSheet,
  Text,
  Alert,
  TouchableWithoutFeedback,
  TouchableNativeFeedback
} from 'react-native';
import SimplePicker from '../lib/ios-simple-picker';
import { primaryColor, inputTextSize } from '../../themes';
import { TextInput } from './TextInput';

class PickerInput extends Component {
  // state = { inputGroupStyle: { borderBottomColor: 'gray', borderWidth: 0.5 } };
  //
  // onFocus() {
  //   this.setState({
  //     inputGroupStyle: {
  //       borderBottomColor: primaryColor,
  //       borderWidth: 0.5
  //     }
  //   });
  // }
  // onBlur() {
  //  this.setState({
  //    inputGroupStyle: {
  //      borderBottomColor: 'gray',
  //      borderWidth: 0.2
  //    }
  //  });
  // }
  state = {val : null}

  renderOptions(options, value) {
    var items = [];

    if(!value) {
      items.push(<Picker.Item label="Select" value={null} key={999} />);
    }
    for(var i = 0; i < options.labels.length; i++) {
      items.push(<Picker.Item label={options.labels[i]} value={options.values[i]} key={i+1} />);
    }
    return items;
  }

  getOptionsLabelByValue(options, value) {
    for(let i = 0; i < options.labels.length; i++) {
      if(options.values[i] === value) {
        return options.labels[i];
      }
    }
    return 'Select';
  }

  renderPicker() {
    const { options, value, onSelect, ...otherProps} = this.props;
    if (Platform.OS === 'ios') {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <TouchableWithoutFeedback
                onPress={() => {
                  this.refs.picker.show();
                }}
              >
              <View style={styles.itemContainer}>
                  <Text style={styles.value}>{this.getOptionsLabelByValue(options, value)}</Text>
                  <Icon name='angle-down' size={22} />
              </View>
              </TouchableWithoutFeedback>
          <SimplePicker
            ref={'picker'}
            options={options.values}
            labels={options.labels}
            buttonColor={primaryColor}
            onSubmit={onSelect}
          />
        </View>
      );
    }
    // for android
    return (
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Picker
          {...otherProps}
          selectedValue={this.state.val ? this.state.val : value}
          onValueChange={(val, index) => {onSelect(val); this.setState({val: val})}}>
          {this.renderOptions(options, this.state.val)}
        </Picker>
      </View>
    );
  }

  render() {
    return this.renderPicker();
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row'
  },
  value: {
    fontSize: inputTextSize,
    paddingRight: 5
  }
});

export { PickerInput };
