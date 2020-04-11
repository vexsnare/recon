import React, { Component, } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

class Container extends Component {

  static defaultProps = {}

  render() {
    const { children } = this.props;
    return (
      <ScrollView style={styles.container}>
        {children}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  }
});

export { Container };
