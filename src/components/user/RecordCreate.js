import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form'
import RecordForm from './RecordForm';
import { View, StyleSheet } from 'react-native';
import { Button } from './../common';
import { getNested } from '../../utils';
import { primaryColor, secondaryColor } from '../../themes';
import {Loader} from './../common';
import { createRecord } from '../../actions/user/record';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


class RecordCreateForm extends Component {

  componentDidMount() {
    this.props.reset();
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps='always'
        >
        <RecordForm />
        <Loader visible={this.props.submitting} />
        <View style={styles.button}>
          <Button color={primaryColor} onPress={this.props.handleSubmit((data, dispatch) => createRecord(data, dispatch))}>
            SAVE
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 30
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  }
});

export default reduxForm({form: 'recordCreateForm'})(RecordCreateForm);



