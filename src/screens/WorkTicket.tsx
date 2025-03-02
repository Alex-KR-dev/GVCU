import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Image, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

interface WorkTicketData {
  vehicleReg: string;
  driverName: string;
  origin: string;
  destination: string;
  numDays: number;
  passengers: number;
  ticketNumber: string;
  detailsofjourney: string;
  fueldrawn: string;
  kilomtrescovered: string;
}

const WorkTicket = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [ticketNumber, setTicketNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [workTicketData, setWorkTicketData] = useState<WorkTicketData | null>(null);

  // Mock data function (Will be replaced with API)
  const handleSearch = () => {
    if (!ticketNumber.trim()) {
      alert("Please enter a valid work ticket number.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const mockData = {
        vehicleReg: "GKB 956Z",
        driverName: "John Kuya",
        origin: "Nairobi",
        destination: "Mombasa",
        numDays: 5,
        detailsofjourney: "Test Evaluation",
        fueldrawn: "70litres",
        kilomtrescovered: "600km",
        passengers: 4,
        ticketNumber: ticketNumber,
      };

      setWorkTicketData(mockData);
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
        <Text style={styles.title}>WorkTicket Search</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Work Ticket Number"
          placeholderTextColor="#999"
          value={ticketNumber}
          onChangeText={setTicketNumber}
        />
        <Button title="Search Ticket" onPress={handleSearch} disabled={!ticketNumber.trim()} />
        {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 15 }} />}
        {workTicketData && (
          <View style={styles.resultContainer}>
            <Text style={styles.sectionTitle}>Work Ticket Details</Text>
            <Text style={styles.detail}>🎫 Ticket Number: {workTicketData.ticketNumber}</Text>
            <Text style={styles.detail}>🚗 Vehicle Reg: {workTicketData.vehicleReg}</Text>
            <Text style={styles.detail}>👨‍✈️ Driver: {workTicketData.driverName}</Text>
            <Text style={styles.detail}>📍 From: {workTicketData.origin} → {workTicketData.destination}</Text>
            <Text style={styles.detail}>📅 Days: {workTicketData.numDays}</Text>
            <Text style={styles.detail}>🧳 Details of Journey: {workTicketData.detailsofjourney}</Text>
            <Text style={styles.detail}>⛽ Fuel Drawn: {workTicketData.fueldrawn}</Text>
            <Text style={styles.detail}>🚲 Kilometers Covered: {workTicketData.kilomtrescovered}</Text>
            <Text style={styles.detail}>🧑‍🤝‍🧑 Passengers: {workTicketData.passengers}</Text>
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
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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
});

export default WorkTicket;