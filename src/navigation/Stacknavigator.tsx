import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import Login from "../screens/Login";
import Home from "../screens/Home";
import WorkTicket from "../screens/WorkTicket";
import DriverSearch from "../screens/DriverSearch";
import VehicleSearch from "../screens/VehicleSearch";
import ActivityHistory from "../screens/ActivityHistory";
// Add this line

// Define the type for your stack parameter list
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  VehicleSearch: undefined;
  WorkTicket: undefined;
  DriverSearch: undefined;
  ActivityHistory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainStackNavigator = () => {
  const { colors } = useTheme();

  const screenOptionStyle = {
    headerStyle: {},
    headerShown: false,
    headerTintColor: colors.primary,
    headerBackTitle: "Back",
  };

  return (
    <Stack.Navigator id={undefined} initialRouteName="Login" screenOptions={screenOptionStyle}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="VehicleSearch" component={VehicleSearch} />
      <Stack.Screen name="WorkTicket" component={WorkTicket} />
      <Stack.Screen name="DriverSearch" component={DriverSearch} />
      <Stack.Screen name="ActivityHistory" component={ActivityHistory} />
    </Stack.Navigator>
  );
};

export { MainStackNavigator };