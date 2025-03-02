import React, { useState } from "react";
import { 
  View, Text, TextInput, Button, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

type VehicleData = {
  regNumber: string;
  chassisNumber: string;
  engineCapacity: string;
  engineNumber: string;
  entryNumber: string;
  bodyType: string;
  make: string;
  use: string;
  colour: string;
  model: string;
  logbookNumber: string;
  rating: string;
  fuel: string;
  registrationYear: string;
  manufactureYear: string;
  caveat: string;
  inspection: {
    centre: string;
    date: string;
    expiry: string;
    result: string;
    stickerNo: string;
    type: string;
    status: string;
  };
  rsl: {
    institution: string;
    date: string;
    expiry: string;
    type: string;
    status: string;
  };
  charges: {
    financier: string;
    financierPIN: string;
    commencement: string;
  };
  owner: {
    name: string;
    idNumber: string;
    kraPin: string;
    phoneNumber: string;
    ownerType: string;
  };
};

export default function VehicleSearch() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [regNumber, setRegNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  
  const handleSearch = async () => {
    setLoading(true);

    try {
      // Simulating API request
      setTimeout(() => {
        const mockResponse = {
          regNumber: regNumber.toUpperCase(),
          chassisNumber: "NRE160-458077",
          engineCapacity: "2000cc",
          engineNumber: "1NR-5159984",
          entryNumber: "2021MSA75723",
          bodyType: "SUV",
          make: "VOLKSWAGEN",
          use: "GOK",
          colour: "Gray",
          model: "TIGUAN",
          logbookNumber: "202353198765",
          rating: "3910",
          fuel: "Petrol",
          registrationYear: "2019-10-11T00:00:00",
          manufactureYear: "2019",
          caveat: "None",
          inspection: {
            centre: "Likoni Inspection Centre",
            date: "2020-01-15T12:10:40",
            expiry: "2021-01-15",
            result: "Pass",
            stickerNo: "KKM2020011055",
            type: "Annual Inspection",
            status: "Active",
          },
          rsl: {
            institution: "Uber Kenya Ltd",
            date: "2023-07-01",
            expiry: "2025-07-01",
            type: "Commercial",
            status: "Active",
          },
          charges: {
            financier: "EQUITY BANK",
            financierPIN: "P00045678",
            commencement: "2020-09-10",
          },
          owner: {
            name: "John Kuya",
            idNumber: "19178787",
            kraPin: "A00456789B",
            phoneNumber: "+254700345678",
            ownerType: "Individual",
          },
        };
        setVehicleData(mockResponse);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error fetching vehicle data", error);
      setLoading(false);
    }
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
        <Text style={styles.title}>Vehicle Search</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Registration Number (e.g., GKB956Z)"
          value={regNumber}
          onChangeText={setRegNumber}
        />
        <Button title="Search Vehicle" onPress={handleSearch} disabled={!regNumber} />
        {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}
        {vehicleData && (
          <View style={styles.resultContainer}>
            <Text style={styles.sectionTitle}>Vehicle Details</Text>
            <Text style={styles.detail}>🚗 Plate: {vehicleData.regNumber}</Text>
            <Text style={styles.detail}>🛠 Chassis No: {vehicleData.chassisNumber}</Text>
            <Text style={styles.detail}>⚙️ Engine Capacity: {vehicleData.engineCapacity}</Text>
            <Text style={styles.detail}>🔧 Engine No: {vehicleData.engineNumber}</Text>
            <Text style={styles.detail}>📌 Entry No: {vehicleData.entryNumber}</Text>
            <Text style={styles.detail}>🚘 Body Type: {vehicleData.bodyType}</Text>
            <Text style={styles.detail}>🏭 Make: {vehicleData.make}</Text>
            <Text style={styles.detail}>🛠 Use: {vehicleData.use}</Text>
            <Text style={styles.detail}>🎨 Colour: {vehicleData.colour}</Text>
            <Text style={styles.detail}>📌 Model: {vehicleData.model}</Text>
            <Text style={styles.detail}>📖 Logbook No: {vehicleData.logbookNumber}</Text>
            <Text style={styles.detail}>🔢 Rating: {vehicleData.rating}</Text>
            <Text style={styles.detail}>⛽ Fuel: {vehicleData.fuel}</Text>
            <Text style={styles.detail}>📅 Registration Year: {new Date(vehicleData.registrationYear).toLocaleDateString()}</Text>
            <Text style={styles.detail}>🏭 Manufacture Year: {vehicleData.manufactureYear}</Text>
            <Text style={styles.detail}>⚠️ Caveat: {vehicleData.caveat}</Text>
            <Text style={styles.sectionTitle}>Inspection Details</Text>
            <Text style={styles.detail}>🏢 Centre: {vehicleData.inspection.centre}</Text>
            <Text style={styles.detail}>📆 Inspection Date: {new Date(vehicleData.inspection.date).toLocaleDateString()}</Text>
            <Text style={styles.detail}>📆 Expiry: {new Date(vehicleData.inspection.expiry).toLocaleDateString()}</Text>
            <Text style={styles.detail}>✅ Result: {vehicleData.inspection.result}</Text>
            <Text style={styles.detail}>🔖 Sticker No: {vehicleData.inspection.stickerNo}</Text>
            <Text style={styles.detail}>📌 Type: {vehicleData.inspection.type}</Text>
            <Text style={styles.detail}>📢 Status: {vehicleData.inspection.status}</Text>
            <Text style={styles.sectionTitle}>RSL Details</Text>
            <Text style={styles.detail}>🏢 Institution: {vehicleData.rsl.institution}</Text>
            <Text style={styles.detail}>📆 RSL Date: {new Date(vehicleData.rsl.date).toLocaleDateString()}</Text>
            <Text style={styles.detail}>📆 RSL Expiry: {new Date(vehicleData.rsl.expiry).toLocaleDateString()}</Text>
            <Text style={styles.detail}>📌 Type: {vehicleData.rsl.type}</Text>
            <Text style={styles.detail}>📢 Status: {vehicleData.rsl.status}</Text>
            <Text style={styles.sectionTitle}>Charges</Text>
            <Text style={styles.detail}>🏦 Financier: {vehicleData.charges.financier}</Text>
            <Text style={styles.detail}>🔢 Financier PIN: {vehicleData.charges.financierPIN}</Text>
            <Text style={styles.detail}>📆 Charge Commencement: {new Date(vehicleData.charges.commencement).toLocaleDateString()}</Text>
            <Text style={styles.sectionTitle}>Current Owner</Text>
            <Text style={styles.detail}>👤 Name: {vehicleData.owner.name}</Text>
            <Text style={styles.detail}>🆔 ID/Company: {vehicleData.owner.idNumber}</Text>
            <Text style={styles.detail}>📌 KRA PIN: {vehicleData.owner.kraPin}</Text>
            <Text style={styles.detail}>📞 Phone: {vehicleData.owner.phoneNumber}</Text>
          </View>
        )}
        <View style={styles.logoContainer}>
          <Image source={require('../assets/ntsalogo.png')} style={styles.logo} />
        </View>
      </ScrollView>
    </View>
  );
}

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