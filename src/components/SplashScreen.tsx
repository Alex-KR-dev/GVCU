import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated, ImageStyle } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fadeAnim] = useState(new Animated.Value(1)); // Fade animation

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        onFinish(); // Call the function to navigate after animation
      });
    }, 1000); // Display for 3 seconds

    return () => clearTimeout(timer);
  }, [fadeAnim, onFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image source={require("../assets/splash-image2.png")} style={styles.logo} />
      <LottieView 
        source={require("../assets/loading-animation.json")} 
        autoPlay 
        loop 
        style={[styles.animation, styles.animationTop]} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  logo: {
    width: 650,
    height: 650,
    transform: [{ translateX: 50 }, { translateY: -90 }],
    resizeMode: "contain",
  } as ImageStyle,
  animation: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
  animationTop: {
    position: "absolute",
  },
});
