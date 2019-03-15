import React from 'react';
import {Platform, StatusBar, StyleSheet, View, Text, Image, TextInput, ScrollView} from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from "firebase";

export default class App extends React.Component {



  state = {
    isLoadingComplete: false,
  };

  render() {



    return(
    <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
    <View style={styles.header}>
        <Image

        source={require('./assets/images/logo_cakes.png')}
        style={{width: 350, backgroundColor: '#fbf2c1'}}
        />

    </View>


 <View style={styles.container}>

        <TextInput
        placeholder={"  Recherche..."}
        style={{borderBottomColor: '#000000',
            borderWidth: 3, marginTop: 50, width:250, marginLeft:50}}
        />
<View style={{backgroundColor: "#e22565", width: 50, height: 250, marginTop: 50}}>
     <Image

         source={require('./assets/images/add.png')}
         style={{width: 30, marginTop: 25, marginLeft:10}}
     />
     <Image

         source={require('./assets/images/tags.png')}
         style={{width: 30, marginTop: 25, marginLeft:10}}
     />
     <Image

         source={require('./assets/images/favorite.png')}
         style={{width: 30, marginTop: 25, marginLeft:10}}
     />
    <Image

        source={require('./assets/images/shopping.png')}
        style={{width: 30, marginTop: 25, marginLeft:10}}
    />
</View>
     <View style={{left:80, bottom: 270, right:20}}>
        <View style={{backgroundColor:'#fbf2c1', marginTop: 30, width:225}}>
         <Image
             source={require('./assets/images/356299-200.png')}
                style={styles.image}

                 />
         <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Batteur</Text>
     </View>
         <View style={{backgroundColor:'#fbf2c1', marginTop: 30, width:225}}>
         <Image
             source={require('./assets/images/four.png')}
             style={styles.image}
         />
             <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Four</Text>
         </View>
         <View style={{backgroundColor:'#fbf2c1', marginTop: 30, width:225}}>
         <Image
             source={require('./assets/images/gateau_parts.png')}
             style={styles.image}
         />
             <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Parts de gateau firebase {firebase.SDK_VERSION}
             {database.ref('Utilisateurs/').once("value", function (snapshot)

             {
              console.log(snapshot.val())
             })}   </Text>
         </View>
     </View>
    </View>
        </ScrollView>
    </View>

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
    backgroundColor: '#fff',
  },
});

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
var database = firebase.database();