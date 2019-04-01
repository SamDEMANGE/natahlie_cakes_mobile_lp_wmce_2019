import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import ListeRecettes from "../components/ListeRecettes";
import OngletsRecettes from "../components/OngletsRecettes";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SidebarRecette from "../components/SidebarRecette";
import {Toolbar, Button} from 'react-native-material-ui';




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
        /*  if(this.props.navigation.state.params.id < 10){
            zero = '0';
        }
        else{
            zero='';
        }*/
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
                    <Sidebar/>



                        <View style={styles.view}>
                        <View style={styles.onglets}>
                            <Button text={"Ingrédients et matériels"} upperCase={false}
                                    onPress={()=>this.props.navigation.navigate('Ingredients', {id: this.props.navigation.state.params.id})}

                            />
                        </View>
                        <View style={styles.onglets}>
                            <Button text={"Préparation"} upperCase={false}
                                    onPress={()=>this.props.navigation.navigate('Preparation', {id: this.props.navigation.state.params.id})}/>
                        </View>
                        <View style={styles.onglets}>
                            <Button text={"Astuces et commentaires"} upperCase={false}
                                    onPress={()=>this.props.navigation.navigate('Astuces', {id: this.props.navigation.state.params.id})}/>
                        </View>
                    </View>









                        <View style={{left: 55, right: 20, top: -200}}>



                            <Image
                                source={{uri: this.state.recette.image}}
                                style={styles.image}
                            />

                            <View style={{flexDirection: 'row'}}>
                            <Text style={styles.content}>{this.state.recette.nom}</Text>
                            <Image

                                source={require('../assets/images/favorite.png')}
                                style={styles.favorite}
                            />
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/gateau_parts.png')}
                                style={styles.sidebar}
                            />

                                <View style={styles.button}>
                                    <Button raised accent={'#d3d3d3'}
                                text={"-"}
                                onPress={this.diminueParts}


                                />
                                 </View>
                                <Text style={{marginLeft: 10, marginRight: 10}}>{this.state.nb_parts}</Text>
                                <View style={styles.button}>
                                    <Button raised accent={'#d3d3d3'}
                                text={"+"}
                                onPress={this.augmenteParts}

                                    />
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/356299-200.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.state.recette.tps_prep} minutes</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/four.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.state.recette.tps_cuisson} minutes</Text>
                            </View>








                                    <DetailsRecette
                                        ingredients={this.state.ingredients}
                                        materiels={this.state.materiel}
                                        nb_parts={this.state.nb_parts}
                                        nb_parts_init={this.state.recette.nb_pers}
                                    />




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
            borderColor: '#e22565', borderBottomColor: '#ffffff', paddingTop: 10, textAlign: 'center',
            borderWidth: 3, marginTop: 10, width: 110, marginLeft: 2, fontSize: 5, height: 70, left: 50, right: 0, top: -225
        },
        view: {
           flexDirection: 'row'
        },
        image: {
            width: 250, height: 225, marginLeft:0
        },
        favorite: {
            width: 30, marginLeft: 10
        },
        sidebar: {
            width: 50, height: 50, marginLeft: 10
        },
        button:{
            width: 40
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565'
        }

    });