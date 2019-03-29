import React from 'react';
import { Platform } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PrepScreen from "../screens/PrepScreen";
import IngrMatScreen from "../screens/IngrMatScreen";
import AstucesCommsScreen from "../screens/AstucesCommsScreen";
import ListeRecettes from "../components/ListeRecettes";

const Navigator = createStackNavigator({
  Home: {screen: HomeScreen, component: ListeRecettes},
  Preparation: {screen: PrepScreen},
  Ingredients: {screen: IngrMatScreen},
  Astuces: {screen: AstucesCommsScreen},
});

const AppNavigator=createAppContainer(Navigator);

export default AppNavigator;