import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  FlatList,
  RefreshControl,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from "react-native-paper";

interface ActivityItem {
  id: string;
  type: 'vehicle' | 'driver' | 'ticket';
  action: string;
  details: string;
  timestamp: string;
  user: string;
  status: 'successful' | 'pending' | 'failed';
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'vehicle',
    action: 'Vehicle Search',
    details: 'Searched vehicle GKB 956Z',
    timestamp: '2024-02-23 14:30',
    user: 'John Kuya',
    status: 'successful'
  },
  {
    id: '2',
    type: 'driver',
    action: 'Driver License Check',
    details: 'Verified license DL-56789012',
    timestamp: '2024-02-23 13:15',
    user: 'Erika Wegesa',
    status: 'successful'
  },
  {
    id: '3',
    type: 'ticket',
    action: 'Work Ticket Created',
    details: 'New ticket #001A',
    timestamp: '2024-02-23 11:45',
    user: 'John Kuya',
    status: 'pending'
  },
  // Add more mock data here
];

const ActivityHistory: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);

  const getIconName = (type: ActivityItem['type']) => {
    switch (type) {
      case 'vehicle':
        return 'car';
      case 'driver':
        return 'account';
      case 'ticket':
        return 'file-document';
      default:
        return 'information';
    }
  };

  const getStatusColor = (status: ActivityItem['status']) => {
    switch (status) {
      case 'successful':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'failed':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderActivityItem = ({ item }: { item: ActivityItem }) => (
    <TouchableOpacity 
      style={styles.activityCard}
      onPress={() => {
        // Handle activity selection
        console.log('Selected activity:', item);
      }}
    >
      <View style={styles.activityIcon}>
        <Icon 
          name={getIconName(item.type)} 
          size={24} 
          color={item.status === 'successful' ? '#28a745' : colors.primary} 
        />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.actionText}>{item.action}</Text>
          <Text style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.detailsText}>{item.details}</Text>
        <View style={styles.activityFooter}>
          <Text style={styles.userText}>{item.user}</Text>
          <Text style={styles.timestampText}>{item.timestamp}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Activity History</Text>
      </View>

      {/* Activity List */}
      <FlatList
        data={activities}
        renderItem={renderActivityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
          />
        }
      />
      <View style={styles.logoContainer}>
        <Image source={require('../assets/ntsalogo.png')} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
    backgroundColor: "white",
    elevation: 4,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  listContainer: {
    padding: 16,
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    elevation: 2,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  activityFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userText: {
    fontSize: 12,
    color: "#666",
  },
  timestampText: {
    fontSize: 12,
    color: "#666",
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
});

export default ActivityHistory;