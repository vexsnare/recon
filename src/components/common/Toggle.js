import React, { useState } from "react";
import { primaryColor, secondaryColor } from '../../themes';
import { View, Switch, StyleSheet } from "react-native";

const Toggle = (props) => {
  
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "gray", true: secondaryColor }}
        thumbColor={isEnabled ? primaryColor : 'gray'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export {Toggle};