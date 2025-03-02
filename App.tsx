import React, { useState } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { MainStackNavigator } from "./src/navigation/Stacknavigator";
import { View, StyleSheet } from "react-native";
import SplashScreen from "./src/components/SplashScreen"; // Import the Splash Screen

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  return (
    <PaperProvider>
      {isSplashVisible ? (
        <SplashScreen onFinish={() => setIsSplashVisible(false)} />
      ) : (
        <NavigationContainer>
          <View style={styles.container}>
            <MainStackNavigator />
          </View>
        </NavigationContainer>
      )}
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;