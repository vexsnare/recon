import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import { inputTextSize } from '../../themes';
import RNPickerSelect from 'react-native-picker-select';

export class DropdownPicker extends Component {
    constructor({ input }){
        super();
        this.state = {
            value: input.value
        }
    }
    onChange = selectedOption => {
        this.setState({
            value: selectedOption
        });
        this.props.input.onChange(selectedOption)
    }
    render(){
        const { input, label, placeholder, options, meta, ...otherProps } = this.props;
    
        return (
            <View>
                <Text style={{fontSize: inputTextSize}}>{label}</Text>
                <View style={{borderColor: 'gray', borderWidth: 1}}>
                <RNPickerSelect
                    onValueChange={this.onChange}
                    input={input}
                    placeholder={placeholder}
                    onFocus={input.onFocus}
                    onBlur={input.onBlur}
                    value={this.state.value}
                    autoCorrect={false}
                    items={options}
                />
                </View>
                {meta.touched && meta.error && <Text style={{color: 'red', fontSize: inputErrorTextSize}}>{meta.error}</Text>}
            </View>
        );
    }
  };