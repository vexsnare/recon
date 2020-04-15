import React, { Component, } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

class Container extends Component {

  static defaultProps = {}

  render() {
    const { children, style } = this.props;
    return (
      <ScrollView style={{...styles.container, ...style}}>
        {children}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

export { Container };
