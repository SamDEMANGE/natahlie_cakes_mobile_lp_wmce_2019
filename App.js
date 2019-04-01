import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, Image, TextInput, ScrollView, ListView} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/Navigator';

import ListeRecettes from "./components/ListeRecettes";
import HomeScreen from "./screens/HomeScreen";
import IngrMatScreen from "./screens/IngrMatScreen";
import PrepScreen from "./screens/PrepScreen";
import AstucesCommsScreen from "./screens/AstucesCommsScreen";
import {ReactDom} from 'react-dom';



export default class App extends React.Component {




  state = {
    isLoadingComplete: false,

  };




  render() {



    return(

        <AppNavigator/>



  );
      /*
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
    */
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
/*
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAu9ryP29t_ey5zYrlyOcvFOtACY9O5KPs",
    authDomain: "projettut-3b738.firebaseapp.com",
    databaseURL: "https://projettut-3b738.firebaseio.com",
    projectId: "projettut-3b738",
    storageBucket: "projettut-3b738.appspot.com",
    messagingSenderId: "393046745449"
};
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
const database = firebase.database();

global.bdd=database;


*/