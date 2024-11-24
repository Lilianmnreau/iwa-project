import { Provider, useSelector } from 'react-redux';
import HomeView from '../views/home_view';
import ProfileView from '../views/profil/profile_view';
import MapView from '../views/map/map_view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeStackNavigator, MapStackNavigator, MessagesStackNavigator } from '../navigation/stack_navigator';
import { ProfileStackNavigator } from '../navigation/stack_navigator';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  const navigation = useNavigation();
  const isLoggedIn = useSelector((state: any) => state.profil.isLoggedIn); // Assurez-vous que l'état est correct
  const profil_notifications = useSelector((state: any) => state.profil.profil_notifications);
  const messaging_notifications = useSelector(
    (state: any) => state.messages.messaging_notifications
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00796B', // Couleur de l'icône sélectionnée
        tabBarInactiveTintColor: '#8E8E93', // Couleur de l'icône non sélectionnée
      }}
    >
      <Tab.Screen
        name="Home_Stack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map_Stack"
        component={MapStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Messaging_Stack"
        component={MessagesStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarBadge: messaging_notifications,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="chatbubble-ellipses"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile_Stack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
