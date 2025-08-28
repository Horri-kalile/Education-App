import React from "react";
import { View, Text, StyleSheet } from "react-native";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚀 MR Naim App Loading...</Text>
      <Text style={styles.subtitle}>
        If you see this, React Native is working!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default App;
