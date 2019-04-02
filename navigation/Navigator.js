import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';


import HomeScreen from '../screens/FavorisScreen';
import MainRecette from "../screens/MainRecette";
import ListeRecettes from "../components/ListeRecettes";

const Navigator = createStackNavigator({
  Home: {screen: HomeScreen, component: ListeRecettes},
  Ingredients: {screen: MainRecette},
});


const AppNavigator=createAppContainer(Navigator);

export default AppNavigator;
