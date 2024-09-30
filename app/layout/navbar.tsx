
import { Provider, useSelector } from 'react-redux';
import HomeView from '../views/home_view';
import ProfileView from '../views/profil/profile_view';
import MapView from '../views/map_view';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {MapStackNavigator,ProfileStackNavigator} from '../navigation/stack_navigator'; 

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
          headerShown: false,
        }}
      />
      <Tab.Screen  
        name="Map_Stack"
        component={MapStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
          headerShown: false,
        }}
        />
      <Tab.Screen 
        name="Profile_Stack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarBadge: profil_notifications,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}