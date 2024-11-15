
import { Provider, useSelector } from 'react-redux';
import HomeView from '../views/home_view';
import ProfileView from '../views/profile_view';
import MapView from '../views/map_view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapStackNavigator from './stack_navigator'; 

const Tab = createBottomTabNavigator();

export default function Navbar() {
  const profil_notifications = useSelector((state: any) => state.profil_notifications);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeView}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Carte"
        component={MapStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
        />
      <Tab.Screen 
        name="Profile"
        component={ProfileView}
        options={{
          tabBarLabel: '',
          tabBarBadge: profil_notifications,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}