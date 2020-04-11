import React, { Component } from 'react';
import _ from 'lodash';
import { reduxForm } from 'redux-form'
import RecordForm from './RecordForm';
import { View, StyleSheet } from 'react-native';
import { Button } from '../common';
import { primaryColor } from '../../themes';
import { createProject } from '../../actions/user/project';
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
        <View style={styles.button}>
          <Button color={primaryColor} onPress={this.props.handleSubmit((data, dispatch) => this.props.createProject(data, dispatch))}>
            SAVE
          </Button>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


const validate = (values) => {
  const errors = {};
  return errors;
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

export default reduxForm({ form: 'recordCreateForm', validate, createProject })(RecordCreateForm);
