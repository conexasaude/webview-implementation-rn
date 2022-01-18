import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { url } from "./constants";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const allGranted = await Promise.all([
        Camera.requestCameraPermissionsAsync(),
        Camera.requestMicrophonePermissionsAsync(), // Necessário no Android
      ]).then((results) => results.every((result) => result.granted));

      setHasPermission(allGranted);
    })();
  }, []);

  if (!hasPermission) {
    return (
      <View>
        <Text>Grant Permission first</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Poc Conexa Meet webview</Text>

      <WebView
        style={styles.webview}
        javaScriptEnabled
        pullToRefreshEnabled
        source={{
          uri: url,
        }}
        startInLoadingState
        allowsInlineMediaPlayback
        allowsFullscreenVideo
        domStorageEnabled
        useWebKit
        originWhitelist={["*"]}
        mediaPlaybackRequiresUserAction={false}
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
    zIndex: 20,
    flexGrow: 1,
    width: 4000,
    maxWidth: "100%",
  },
});
