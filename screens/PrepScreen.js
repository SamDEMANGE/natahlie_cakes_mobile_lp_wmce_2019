import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import ListeRecettes from "../components/ListeRecettes";
import DetailsPreparation from "../components/DetailsPreparation";


let detailrecette= bdd.ref('/Recettes/recette_01');


export default class PrepScreen extends React.Component {






    static navigationOptions = {
        header: null,
    };

    state = {
        isLoadingComplete: false,

        preparation:[],
        recette: []
    };

    componentDidMount() {
        detailrecette.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});

            let data = snapshot.val();

            let etapes=Object.values(data.preparation);
         //   let materiels=Object.values(data.materiels);

         //   console.log(ingredients);

            this.setState({recette: data, preparation:etapes});

            //    console.log(this.state.recette);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <View style={styles.header}>
                        <Image

                            source={require('../assets/images/logo_cakes.png')}
                            style={{width: 350, backgroundColor: '#fbf2c1'}}
                        />

                    </View>


                    <View style={styles.container}>

                        <Text

                            style={{
                                borderColor: '#e22565', borderBottomColor: '#ffffff', padding: 15, textAlign: 'center',
                                borderWidth: 3, marginTop: 10, width: 250, marginLeft: 10
                            }}
                        >Ingrédients et matériels</Text>

                        <Text

                            style={{
                                borderColor: '#e22565', borderBottomColor: '#ffffff', padding: 15, textAlign: 'center',
                                borderWidth: 3, marginTop: 10, width: 250, marginLeft: 10
                            }}
                        >Préparation</Text>

                        <Text

                            style={{
                                borderColor: '#e22565', borderBottomColor: '#ffffff', padding: 15, textAlign: 'center',
                                borderWidth: 3, marginTop: 10, width: 250, marginLeft: 10
                            }}
                        >Astuces et commentaires</Text>




                        <View style={{backgroundColor: "#e22565", width: 50, height: 250, marginTop: 50}}>
                            <Image

                                source={require('../assets/images/add.png')}
                                style={{width: 30, marginTop: 25, marginLeft: 10}}
                            />
                            <Image

                                source={require('../assets/images/tags.png')}
                                style={{width: 30, marginTop: 25, marginLeft: 10}}
                            />
                            <Image

                                source={require('../assets/images/favorite.png')}
                                style={{width: 30, marginTop: 25, marginLeft: 10}}
                            />
                            <Image

                                source={require('../assets/images/shopping.png')}
                                style={{width: 30, marginTop: 25, marginLeft: 10}}
                            />
                        </View>
                        <View style={{left: 80, bottom: 270, right: 20}}>


                            <View>
                                <Image
                                    source={{uri: this.state.recette.image}}
                                    style={{width: 225, height: 200, marginLeft:0}}
                                />
                                <Text style={{fontWeight: 'bold', fontSize:20, color: '#e22565'}}>{this.state.recette.nom}</Text>
                                <Image

                                    source={require('../assets/images/favorite.png')}
                                    style={{width: 30, marginTop: 25, marginLeft: 10}}
                                />

                                <Image

                                    source={require('../assets/images/gateau_parts.png')}
                                    style={{width: 150, marginTop: 10, marginLeft: 10}}
                                />
                                <Text>{this.state.recette.nb_pers} personnes</Text>

                                <Image

                                    source={require('../assets/images/356299-200.png')}
                                    style={{width: 150, marginTop: 10, marginLeft: 10}}
                                />
                                <Text>{this.state.recette.tps_prep} minutes</Text>

                                <Image

                                    source={require('../assets/images/four.png')}
                                    style={{width: 150, marginTop: 10, marginLeft: 10}}
                                />
                                <Text>{this.state.recette.tps_cuisson} minutes</Text>


                            </View>


                        </View>

                        <View style={{left: 80, bottom: 270, right: 20}}>


                            <View>

                               <DetailsPreparation etapes={this.state.preparation}/>

                            </View>


                            <View style={{marginTop: 20}}>

                                <Text>Tags : {this.state.recette.tags}</Text>

                            </View>


                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }

    /*
      _maybeRenderDevelopmentModeWarning() {
        if (__DEV__) {
          const learnMoreButton = (
            <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
              Learn more
            </Text>
          );

          return (
            <Text style={styles.developmentModeText}>
              Development mode is enabled, your app will be slower but you can use useful development
              tools. {learnMoreButton}
            </Text>
          );
        } else {
          return (
            <Text style={styles.developmentModeText}>
              You are not in development mode, your app will run at full speed.
            </Text>
          );
        }
      }

      _handleLearnMorePress = () => {
        WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
      };

      _handleHelpPress = () => {
        WebBrowser.openBrowserAsync(
          'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
        );
      };
    }
    */

}
const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        developmentModeText: {
            marginBottom: 20,
            color: 'rgba(0,0,0,0.4)',
            fontSize: 14,
            lineHeight: 19,
            textAlign: 'center',
        },
        contentContainer: {
            paddingTop: 30,
        },
        welcomeContainer: {
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
        },
        welcomeImage: {
            width: 100,
            height: 80,
            resizeMode: 'contain',
            marginTop: 3,
            marginLeft: -10,
        },
        getStartedContainer: {
            alignItems: 'center',
            marginHorizontal: 50,
        },
        homeScreenFilename: {
            marginVertical: 7,
        },
        codeHighlightText: {
            color: 'rgba(96,100,109, 0.8)',
        },
        codeHighlightContainer: {
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 3,
            paddingHorizontal: 4,
        },
        getStartedText: {
            fontSize: 17,
            color: 'rgba(96,100,109, 1)',
            lineHeight: 24,
            textAlign: 'center',
        },
        tabBarInfoContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOffset: {height: -3},
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                },
                android: {
                    elevation: 20,
                },
            }),
            alignItems: 'center',
            backgroundColor: '#fbfbfb',
            paddingVertical: 20,
        },
        tabBarInfoText: {
            fontSize: 17,
            color: 'rgba(96,100,109, 1)',
            textAlign: 'center',
        },
        navigationFilename: {
            marginTop: 5,
        },
        helpContainer: {
            marginTop: 15,
            alignItems: 'center',
        },
        helpLink: {
            paddingVertical: 15,
        },
        helpLinkText: {
            fontSize: 14,
            color: '#2e78b7',
        },
    });