import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form'
import RecordForm from './RecordForm';
import { View, StyleSheet } from 'react-native';
import { Button } from '../common';
import { primaryColor } from '../../themes';
import { Container, Loader } from '../common';
import { updateRecord } from '../../actions/user/record';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class RecordUpdate extends Component {
  
  render() {
    const {recordId, handleSubmit, submitting, mode} = this.props;
    return (
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        keyboardShouldPersistTaps='always'
        style={styles.container}
        >
        <RecordForm />
        <Container>
          <Loader visible={submitting} />
          <View style={styles.button}>
            <Button color={primaryColor} onPress={handleSubmit((data, dispatch) => updateRecord(data, recordId, mode, dispatch))}>
              Update
            </Button>
          </View>
        </Container>
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

const mapStateToProps = (state) => {
  const { toEditRecord } = state.data.user.records.record;
  let initialValues = {...toEditRecord, age: (toEditRecord.age +'')} ;
  return { initialValues, recordId: toEditRecord.id,  mode: toEditRecord.mode };
}

const RecordUpdateForm = reduxForm({form: 'recordUpdateForm', destroyOnUnmount: true})(RecordUpdate);

export default connect(mapStateToProps)(RecordUpdateForm);
