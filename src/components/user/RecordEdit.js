import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { reduxForm } from 'redux-form'
import RecordForm from './RecordForm';
import { View, StyleSheet } from 'react-native';
import { Button } from '../common';
import { primaryColor } from '../../themes';
import { Container, Loader } from '../common';
import { updateProject } from '../../actions/user/project';
import { workIdMap } from '../../helpers/consts';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class ProjectUpdate extends Component {

  render() {
    const { handleSubmit } = this.props;
    return (
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: 'white'}}
        keyboardShouldPersistTaps='always'
        >
        <Container>
          <Loader visible={this.props.submitting} />
          <View style={styles.button}>
            <Button color={primaryColor} onPress={this.props.handleSubmit((data, dispatch) => this.props.updateProject(data, this.props.project_id, dispatch))}>
              Update
            </Button>
          </View>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}

const convertDate = (dateString) => {
  var dateParts = dateString.split("-");
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

const validate = (values) => {
  const errors = {};
  if(values) {
    if(values.start_date && values.end_date) {
      const start_date = convertDate(values.start_date);
      const end_date = convertDate(values.end_date);
      if(end_date <= start_date) {
        errors.dates = 'Start Date must be before End Date';
      }
    }
    if(values.works) {
      const selected = _.pickBy(values.works, (value, key) => {
        return value == true;
      })
      if(_.isEmpty(selected)) {
        errors.works = 'Select at least one work';
      }
    } else {
      errors.works = 'Select at least one work';
    }
  }
  return errors;
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 30
  },
});

const formatDate = (dateString) => {
  if(dateString) {
    var date = dateString.split("-");
    return `${date[2]}-${date[1]}-${date[0]}`;
  }
  return null;
}
const formatWorks = (works) => {
  let workMap = {};
  for(var i = 0; i < works.length; i++) {
    for(key in workIdMap) {
      if(workIdMap[key] == works[i].id) {
        workMap[key] = true;
        break;
      }
    }
  }
  return workMap;
}

const formatName = (first_name, last_name) => {
  return first_name + ' ' + last_name;
}

const mapStateToProps = (state) => {

  let initialValues = {
    works: {}
  }
  const project_id = state.data.user.project.data.id;
  return { initialValues, project_id };
}

const ProjectUpdateForm = reduxForm({form: 'projectUpdateForm', destroyOnUnmount: true, enableReinitialize: true, validate, updateProject})(ProjectUpdate);

export default connect(mapStateToProps)(ProjectUpdateForm);
