import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Animated, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.7;

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarAnimation = new Animated.Value(0);

  const toggleSidebar = () => {
    const toValue = isSidebarOpen ? 0 : 1;
    Animated.timing(sidebarAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setSidebarOpen(!isSidebarOpen);
  };

  const handleAvatarClick = () => {
    Alert.alert(
      "Logout",
      "Do you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: () => navigation.navigate("Login")
        }
      ],
      { cancelable: true }
    );
  };

  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-SIDEBAR_WIDTH, 0],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={30} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>NTSA GVCU</Text>
        <TouchableOpacity onPress={handleAvatarClick}>
          <Image 
            source={require('../assets/avatar.jpg')} 
            style={styles.headerAvatar}
          />
        </TouchableOpacity>
      </View>

      {/* Modules Grid */}
      <View style={styles.moduleGrid}>
        <TouchableOpacity 
          style={styles.moduleCard} 
          onPress={() => navigation.navigate("VehicleSearch")}
        >
          <Image 
            source={require('../assets/vehicle-icon.png')} 
            style={styles.moduleImage}
          />
          <Text style={styles.moduleTitle}>Vehicle Search</Text>
          <Text style={styles.moduleDescription}>Search and verify vehicle details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.moduleCard} 
          onPress={() => navigation.navigate("WorkTicket")}
        >
          <Image 
            source={require('../assets/ticket-icon.png')} 
            style={styles.moduleImage}
          />
          <Text style={styles.moduleTitle}>Work Ticket</Text>
          <Text style={styles.moduleDescription}>Manage work tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.moduleCard} 
          onPress={() => navigation.navigate("DriverSearch")}
        >
          <Image 
            source={require('../assets/driver-icon.png')} 
            style={styles.moduleImage}
          />
          <Text style={styles.moduleTitle}>Driver Search</Text>
          <Text style={styles.moduleDescription}>Search driver information</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.moduleCard} 
          onPress={() => navigation.navigate("ActivityHistory")}
        >
          <Image 
            source={require('../assets/history-icon.png')} 
            style={styles.moduleImage}
          />
          <Text style={styles.moduleTitle}>Activity History</Text>
          <Text style={styles.moduleDescription}>View system activity logs</Text>
        </TouchableOpacity>
      </View>

      {/* Logo at bottom */}
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/ntsalogo.png')} 
            style={styles.headerLogo}
          />
        </View>

        {/* Copyright text */}
        <Text style={styles.copyright}>© Alex R</Text>

        {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          { transform: [{ translateX: sidebarTranslateX }] }
        ]}
      >
        <View style={styles.sidebarHeader}>
          <Image 
            source={require('../assets/user-avatar.png')} 
            style={styles.avatar}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userRole}>Administrator</Text>
        </View>

        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="cog" size={24} color={colors.primary} />
          <Text style={styles.sidebarText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sidebarItem}>
          <Icon name="history" size={24} color={colors.primary} />
          <Text style={styles.sidebarText}>Logs</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.sidebarItem, styles.logoutButton]}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon name="logout" size={24} color="white" />
          <Text style={[styles.sidebarText, { color: "white" }]}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Overlay when sidebar is open */}
      {isSidebarOpen && (
        <TouchableOpacity 
          style={styles.overlay} 
          onPress={toggleSidebar}
          activeOpacity={1}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5%',
    paddingTop: '10%', // Increased paddingTop for better spacing
    paddingBottom: '2%', // Increased paddingBottom for better spacing
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000', // Added shadow for better appearance
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 22, // Increased font size for better readability
    fontWeight: "bold",
    color: '#333', // Changed color for better contrast
  },
  headerAvatar: {
    width: 35, // Increased width
    height: 35, // Increased height
    borderRadius: 17.5, // Adjusted borderRadius
  },
  moduleGrid: {
    flex: 1,
    padding: '5%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
  },
  moduleCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: '5%', // Increased padding
    marginBottom: '5%', // Increased margin
    elevation: 5, // Increased elevation
    alignItems: 'center',
    borderColor: '#ccc', // Added border color
    borderWidth: 1, // Added border width
  },
  moduleImage: {
    width: '30%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: '5%',
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '2%',
  },
  moduleDescription: {
    fontSize: 12,
    color: 'black', // Changed color to black
    textAlign: 'center',
  },
  headerLogo: {
    width: '35%',
    height: undefined,
    aspectRatio: 2,
    alignSelf: 'center',
    marginBottom: '5%',
    resizeMode: 'contain',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: SIDEBAR_WIDTH,
    backgroundColor: 'white',
    elevation: 5,
  },
  sidebarHeader: {
    padding: '5%',
    paddingTop: '10%',
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 40,
    marginBottom: '5%',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userRole: {
    fontSize: 14,
    color: '#666',
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '5%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sidebarText: {
    marginLeft: '5%',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 'auto',
    borderBottomWidth: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5%',
  },
  copyright: {
    position: 'absolute',
    bottom: '2%',
    left: '2%',
    fontSize: 15,
    color: 'gray',
  },
});

export default Home;