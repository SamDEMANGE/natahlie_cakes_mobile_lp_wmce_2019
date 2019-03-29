import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import ListeRecettes from "../components/ListeRecettes";
import OngletsRecettes from "../components/OngletsRecettes";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SidebarRecette from "../components/SidebarRecette";




export default class IngrMatScreen extends React.Component {


    constructor(){
        super();
        this.displayOngletPreparation=this.displayOngletPreparation.bind(this);
        this.displayOngletAstuces=this.displayOngletAstuces.bind(this);

        this.diminueParts=this.diminueParts.bind(this);
        this.augmenteParts=this.augmenteParts.bind(this);

    }





    static navigationOptions = {
      //  header: null,
        title: 'Ingrédients et Matériels'
    };

    state = {
        isLoadingComplete: false,
        nb_parts: 0,
        ingredients: [],
        materiel:[],
        recette:[]
    };

    componentDidMount() {
        let zero='';
        if(this.props.navigation.state.params.id < 10){
            zero = '0';
        }
        else{
            zero='';
        }
        let detailrecette= bdd.ref('/Recettes/recette_'+zero+this.props.navigation.state.params.id);


        detailrecette.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});

            let data = snapshot.val();

            let ingredients=Object.values(data.ingredients);
            let materiels=Object.values(data.materiels);

         //   console.log(ingredients);

            this.setState({recette:data, ingredients: ingredients, materiel: materiels, nb_parts: data.nb_pers});
            console.log('image : ' +this.state.recette.image);

        })
    }


    displayOngletPreparation(){
     //   console.log('test: '+ this.props.navigation.state.params.id);
        this.props.navigation.navigate('Preparation', {id: this.props.navigation.state.params.id})
    }

    displayOngletAstuces(){
        this.props.navigation.navigate('Astuces', {id: this.props.navigation.state.params.id})
    }

    augmenteParts(){
        this.setState({nb_parts: (this.state.nb_parts + 1)});

    }


    diminueParts(){
        if(this.state.nb_parts === 0){
            this.setState({nb_parts : 0});
        }
        else{
            this.setState({nb_parts: (this.state.nb_parts - 1)});
        }


    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Header/>


                    <View style={styles.container}>

                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Ingredients', {id: this.props.navigation.state.params.id})}>
                            <Text

                                style={styles.onglets}
                            >Ingrédients et matériels</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Preparation', {id: this.props.navigation.state.params.id})}>
                            <Text

                                style={styles.onglets}
                            >Préparation</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Astuces', {id: this.props.navigation.state.params.id})}>
                            <Text

                                style={styles.onglets}


                            >Astuces et commentaires</Text>
                        </TouchableOpacity>






                    <Sidebar/>
                        <View style={styles.view}>



                            <Image
                                source={{uri: this.state.recette.image}}
                                style={styles.image}
                            />
                            <Text style={styles.content}>{this.state.recette.nom}</Text>
                            <Image

                                source={require('../assets/images/favorite.png')}
                                style={styles.favorite}
                            />

                            <Image

                                source={require('../assets/images/gateau_parts.png')}
                                style={styles.sidebar}
                            />
                            <Button
                                title={"-"}
                                onPress={this.diminueParts}
                                style={styles.button}
                                />
                            <Text>{this.state.nb_parts} personnes</Text>
                            <Button
                                title={"+"}
                                onPress={this.augmenteParts}
                                style={styles.button}
                            />
                            <Image

                                source={require('../assets/images/356299-200.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.state.recette.tps_prep} minutes</Text>

                            <Image

                                source={require('../assets/images/four.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.state.recette.tps_cuisson} minutes</Text>






                        </View>

                        <View style={styles.view}>


                            <View>

                                    <DetailsRecette
                                        ingredients={this.state.ingredients}
                                        materiels={this.state.materiel}
                                        nb_parts={this.state.nb_parts}
                                        nb_parts_init={this.state.recette.nb_pers}
                                    />

                            </View>


                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }


}


const
    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },

        contentContainer: {
            paddingTop: 30,
        },
        onglets: {
            borderColor: '#e22565', borderBottomColor: '#ffffff', padding: 15, textAlign: 'center',
            borderWidth: 3, marginTop: 10, width: 250, marginLeft: 10
        },
        view: {
            left: 80, bottom: 270, right: 20
        },
        image: {
            width: 225, height: 200, marginLeft:0
        },
        favorite: {
            width: 30, marginTop: 25, marginLeft: 10
        },
        sidebar: {
            width: 150, marginTop: 10, marginLeft: 10
        },
        button:{
            width: 40
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565'
        }

    });