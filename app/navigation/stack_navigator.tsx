import React from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import EmplacementDetails from "../views/emplacement_details/emplacement_details_view";
import Login from "../views/login_register/login_view";
import Register from "../views/login_register/register_view";
import Reservation_details from "../views/profil/Reservation_details";
import ProfilEmplacementDetails from "../views/profil/profil_emplacement_details/profil_emplacement_details_view";
import SettingsView from "../views/profil/settings/settings_view";
import ProfileView from "../views/profil/profile_view";
import EmplacementDetailsAllRatings from "../views/emplacement_details/emplacement_details_all_ratings";

import { useSelector } from "react-redux";
import AddEmplacement from "../views/profil/add_emplacement_view";
import AllEmplacementReservation from "../views/profil/profil_emplacement_details/all_emplacement_reservations_view";
import EmplacementReservationDetails from "../views/profil/profil_emplacement_details/emplacement_reservation_details_view";
import MessagingView from "../views/messaging/messaging_view";
import MessagesDetail from "../views/messaging/messaging_detail";
import ContactDetail from "../views/messaging/contact_detail";
import LocationMapView from "../views/map/map_view";
import HomeView from "../views/home/home_view";
import ArticleDetails from "../views/home/article_details_view";
import FavoritesPage from "../views/home/all_favorite_view";
import ArticlesPage from "../views/home/all_article_view";
import AddArticleView from "../views/home/add_article_view";
import TranslationView from "../views/profil/settings/translation_view";

const Stack = createStackNavigator();
const EmplacementDetailsStack = createStackNavigator();

function EmplacementDetailsStackNavigator({ route }) {
  const { marker } = route.params;
  return (
    <EmplacementDetailsStack.Navigator initialRouteName="EmplacementDetailsMain">
      <EmplacementDetailsStack.Screen
        name="EmplacementDetailsMain"
        component={EmplacementDetails}
        initialParams={{ marker }}
        options={{ headerShown: false }}
      />
      <EmplacementDetailsStack.Screen
        name="EmplacementDetailsAllRatings"
        component={EmplacementDetailsAllRatings}
        options={{ headerShown: false }}
      />
    </EmplacementDetailsStack.Navigator>
  );
}

export function MapStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={LocationMapView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmplacementDetails"
        component={EmplacementDetailsStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function ProfileStackNavigator() {
  const isLoggedIn = useSelector((state: any) => state.profil.isLoggedIn);
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Profile" : "Login"}>
      <Stack.Screen
        name="Profile"
        component={ProfileView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Reservation_detail"
        component={Reservation_details}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Emplacement_detail"
        component={ProfilEmplacementDetailsStackNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add_emplacement"
        component={AddEmplacement}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function SettingsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Translation"
        component={TranslationView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function MessagesStackNavigator() {
  const isLoggedIn = useSelector((state: any) => state.profil.isLoggedIn);

  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? "Messages" : "Login"}>
      <Stack.Screen
        name="Messages"
        component={MessagingView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessagesDetail"
        component={MessagesDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function HomeStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FavoritesPage"
        component={FavoritesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArticlesPage"
        component={ArticlesPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddArticle"
        component={AddArticleView}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="EmplacementDetails"
        component={EmplacementDetailsStackNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function ProfilEmplacementDetailsStackNavigator({ route }) {
  const { emplacement } = route.params;
  return (
    <Stack.Navigator initialRouteName="ProfilEmplacementDetails">
      <Stack.Screen
        name="ProfilEmplacementDetails"
        component={ProfilEmplacementDetails}
        initialParams={{ emplacement }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllEmplacementReservation"
        component={AllEmplacementReservation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmplacementReservationDetails"
        component={EmplacementReservationDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export function AllEmplacementReservationStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="AllEmplacementReservation">
      <Stack.Screen
        name="AllEmplacementReservation"
        component={AllEmplacementReservation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmplacementReservationDetails"
        component={EmplacementReservationDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
