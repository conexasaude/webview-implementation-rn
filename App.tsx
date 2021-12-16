import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { url } from "./url";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Poc Conexa Meet webview</Text>
      <WebView
        style={styles.webview}
        javaScriptEnabled
        javaScriptCanOpenWindowsAutomatically
        source={{
          uri: url,
        }}
        onNavigationStateChange={console.log}
        startInLoadingState
        scalesPageToFit
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  webview: {
    backgroundColor: "#fff",
    flexGrow: 1,
    width: 4000,
    maxWidth: "100%",
  },
});
