import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { url } from "./url";
import { Camera } from "expo-camera";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
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
        source={{
          uri: url,
        }}
        onNavigationStateChange={(e) => console.log(e.url.split("?")[0])}
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
    width: 320,
    height: 400,
    maxWidth: "100%",
  },
});
