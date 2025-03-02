import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>GVCU Login</Text>
      <View style={styles.avatarContainer}>
        <Image 
          source={require('../assets/avatar.jpg')} 
          style={styles.avatar}
        />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter Username" placeholderTextColor="black" />
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="black" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Enter Password" placeholderTextColor="black" secureTextEntry />
      </View>
      <TouchableOpacity 
        onPress={handleLogin} 
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/ntsalogo.png')} 
          style={styles.logo}
        />
      </View>
      <Text style={styles.copyright}>© Alex R</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Ensure ScrollView takes full height
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: '#FFFFFF', // Add a background color to replace the image
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "green"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "80%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', // Change the background color of the input boxes
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  logoContainer: {
    marginTop: 95,
    alignItems: "center",
  },
  logo: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },
  avatarContainer: {
    marginTop: -20,
    alignItems: "center",
  },
  avatar: {
    width: 85,
    height: 100,
    resizeMode: 'contain',
  },
  copyright: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 12,
    color: '#000',
  },
  loginButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});