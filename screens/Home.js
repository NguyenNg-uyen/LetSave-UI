import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// Set up letter fonts

export default function Splash() {
   return (
      <View style={styles.container}>
         <Text>Hello world</Text>
      </View>
   );
}

// Style
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
   },
});
