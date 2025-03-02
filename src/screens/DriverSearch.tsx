import React, { useState } from "react";
import { 
  View, Text, TextInput, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

const MOCK_DRIVERS = {
  "123456": {
    fullName: "John Kuya",
    licenseNumber: "DL-98765432",
    drivingClass: "B, C, E",
    licenseValidity: "Valid until December 2026",
    psv: {
      validity: "Valid until October 2025",
      name: "Super Metro Sacco",
      badgeNumber: "PSV-345678",
    },
  },
  "987654": {
    fullName: "Erika Wegesa",
    licenseNumber: "DL-56789012",
    drivingClass: "A, B, C, D",
    licenseValidity: "Valid until June 2027",
    psv: {
      validity: "Not Enrolled",
      name: "N/A",
      badgeNumber: "N/A",
    },
  },
};

const DriverSearch = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [driverId, setDriverId] = useState("");
  const [loading, setLoading] = useState(false);
  const [driverData, setDriverData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setDriverData(null);

    if (!driverId.trim()) {
      setError("Please enter a valid Driver ID.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (MOCK_DRIVERS[driverId]) {
        setDriverData(MOCK_DRIVERS[driverId]);
      } else {
        setError("No driver found with this ID.");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.mainContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Driver Search</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Driver ID Number"
          placeholderTextColor="#777"
          value={driverId}
          onChangeText={setDriverId}
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: driverId ? colors.primary : "#ccc" }]} 
          onPress={handleSearch} 
          disabled={!driverId}
        >
          <Text style={styles.buttonText}>SEARCH DRIVER</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {driverData && (
          <View style={styles.resultContainer}>
            <Text style={styles.sectionTitle}>🚦 Driver Details</Text>
            <Text style={styles.detail}>👤 Name: {driverData.fullName}</Text>
            <Text style={styles.detail}>🆔 License No: {driverData.licenseNumber}</Text>
            <Text style={styles.detail}>🚗 Driving Class: {driverData.drivingClass}</Text>
            <Text style={styles.detail}>📅 License Expiry: {driverData.licenseValidity}</Text>

            <Text style={styles.sectionTitle}>🚌 PSV Details</Text>
            <Text style={styles.detail}>✅ Validity: {driverData.psv.validity}</Text>
            <Text style={styles.detail}>🏢 Institution: {driverData.psv.name}</Text>
            <Text style={styles.detail}>🆔 Badge No: {driverData.psv.badgeNumber}</Text>
          </View>
        )}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/ntsalogo.png')} style={styles.logo} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 40,
    backgroundColor: "white",
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  placeholder: {
    width: 24, // Same width as the icon to balance the header
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    color: "#007bff",
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
    color: "#333",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});

export default DriverSearch;