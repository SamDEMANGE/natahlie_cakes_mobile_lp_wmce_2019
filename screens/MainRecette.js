import React from "react";
import {Image, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import DetailsPreparation from "../components/DetailsPreparation";
import DetailsAstucesComms from "../components/DetailsAstucesComms";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {Toolbar, Button} from 'react-native-material-ui';

import { Icon , Card} from 'react-native-material-ui';




export default class MainRecette extends React.Component {



    constructor(props){
        super(props);

        this.diminueParts=this.diminueParts.bind(this);
        this.augmenteParts=this.augmenteParts.bind(this);
        this.displayNav=this.displayNav.bind(this);

        this.favoriteFonction=this.favoriteFonction.bind(this);
        this.addFav=this.addFav.bind(this);
        this.deleteConfirm=this.deleteConfirm.bind(this);
        this.deleteFav=this.deleteFav.bind(this);


        this.checkFavId = this.checkFavId.bind(this);
        this.getId = this.getId.bind(this);


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
        recette:[],
        preparation:[],
        astuces: [],
        commentaires: [],
        status_ingr: true,
        status_prep: false,
        status_comas: false,
        status_pers: false,
        favicon_name: 'favorite-border',
        etat_fav: false,
        idSup : 0,
        id_fav: 0,
    };


    componentDidMount() {

        let zero='';

        let detailrecette= bdd.ref('/Recettes/recette_'+zero+this.props.navigation.state.params.id);


        detailrecette.once('value', (snapshot) => {


            let data = snapshot.val();

            let ingredients=Object.values(data.ingredients);
            let materiels=Object.values(data.materiels);
            let preparation=Object.values(data.preparation);
            let astuces=Object.values(data.publication.astuces);
            let commentaires=Object.values(data.publication.commentaires);

            this.setState({recette:data, ingredients: ingredients, materiel: materiels, preparation: preparation, astuces: astuces, commentaires: commentaires, nb_parts: data.nb_pers});

            this.getId();

        })
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

    getId(){

        bdd.ref('Favoris').on("value", (snapchot) => {

            let data = snapchot.val();
            let resource = Object.values(data);
            let tableId = [];
            let idC = 0;

            for(var i=0; i<resource.length; i++){

                idC = resource[i].id;

                if(i === 0){

                    tableId.push(idC);
                }

                for(let k=0; k<tableId.length; k++){

                    if(idC < tableId[k]){

                        idC = tableId[k];
                    }
                }

                tableId.push(idC);
            }

            this.setState({idSup: idC+1});

            this.checkFavId(resource);


        });

    }

    checkFavId(table_Fav){


        for(let n =0; n < table_Fav.length; n++){

            if(table_Fav[n].recette === this.state.recette.id){


                this.setState({etat_fav: true});
                this.setState({favicon_name: 'favorite'});

                this.setState({id_fav : table_Fav[n].id})
                n = table_Fav.length;

            }
            }
        }

    favoriteFonction(){

        if(this.state.etat_fav===false) {
            this.setState({etat_fav: true});
            this.setState({favicon_name: 'favorite'});
            this.addFav();
        }
        else if(this.state.etat_fav===true){
            this.deleteConfirm();

        }


    }

    addFav() {
        bdd.ref('Favoris/fav_' + this.state.idSup).set({
            id: this.state.idSup,
            recette: this.state.recette.id,
            users : 1
        });

        this.getId();
    }


    deleteConfirm() {

        Alert.alert(
            'Confirmation de suppression',
            'Voulez vous vraiment supprimer ce FavorisScrenn? ',
            [
                {text: 'Supprimer', onPress: () => this.deleteFav()},

                {

                    text: 'Annuler',
                    style: 'cancel',

                }

            ]
        );
    }

    deleteFav() {

        bdd.ref('/Favoris/fav_' + this.state.id_fav).remove();
        this.setState({etat_fav: false});
        this.setState({favicon_name: 'favorite-border'});

    }


    changeComponent(id_component) {



        if(id_component === 1){

            this.setState({status_ingr: true, status_prep: false, status_comas: false, status_pers: false});
        }

        else if(id_component === 2){

            this.setState({status_ingr: false, status_prep: true, status_comas: false, status_pers: true});
        }

        else if(id_component === 3){

            this.setState({status_ingr: false, status_prep: false, status_comas: true, status_pers: true});
        }

        else{

            this.setState({status_ingr: true, status_prep: true, status_comas: true, status_pers: false});
        }

        this.setState({component: this.Component_current});

    }

    displayNav(id){

        if(id === 1){
            this.props.navigation.navigate("Home");
        }
        else if(id === 2){
            this.props.navigation.navigate("Home");
        }
        else if(id === 3){
            this.props.navigation.navigate("Favoris");
        }
        else if(id === 4){
            this.props.navigation.navigate("Home");
        }

    }


    render() {


        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  <Header/>
                    <Sidebar display={this.displayNav}/>

                        <View style={styles.view}>
                            <View style={this.state.status_ingr ? styles.onglets : styles.onglet}>
                                <Button text={"Ingrédients et matériels"} upperCase={false}
                                    onPress={()=> this.changeComponent(1)}
                                />
                            </View>
                            <View style={this.state.status_prep ? styles.onglets : styles.onglet}>
                                <Button text={"Préparation"} upperCase={false}
                                        onPress={()=> this.changeComponent(2)}/>
                            </View>
                            <View style={this.state.status_comas ? styles.onglets : styles.onglet}>
                                <Button text={"Astuces et commentaires"} upperCase={false}
                                    onPress={()=> this.changeComponent(3)}/>
                            </View>
                        </View>


                        <View style={{left: 55, right: 20, top: -200}}>
                            <View style={{width: 300}}>
                                <Card >

                                    <Image source={{uri: this.state.recette.image}} style={styles.image}/>

                                    <View style={styles.favorite}>

                                        <Text style={styles.content}>

                                            {this.state.recette.nom}



                                        </Text>

                                        <TouchableOpacity  onPress={ () => this.favoriteFonction() }>

                                            <Icon name={this.state.favicon_name} />

                                        </TouchableOpacity>

                                    </View>

                                    {this.state.status_ingr ?
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={require('../assets/images/gateau_parts.png')} style={styles.sidebar}/>

                                            <View style={styles.button}>
                                                <Button raised accent={'#d3d3d3'} text={"-"} onPress={this.diminueParts}/>
                                            </View>

                                            <Text style={{marginLeft: 10, marginRight: 10}}>{this.state.nb_parts}</Text>

                                            <View style={styles.button}>
                                                <Button raised accent={'#d3d3d3'} text={"+"} onPress={this.augmenteParts}/>
                                            </View>
                                        </View>

                                        : null}


                                    {this.state.status_pers ?
                                        <View style={{flexDirection: 'row'}}>
                                            <Image source={require('../assets/images/gateau_parts.png')} style={styles.sidebar}/>
                                            <Text>{this.state.recette.nb_pers} personnes</Text>
                                        </View>

                                        : null}


                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={require('../assets/images/356299-200.png')} style={styles.sidebar}/>
                                        <Text>{this.state.recette.tps_prep}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row'}}>
                                        <Image source={require('../assets/images/four.png')} style={styles.sidebar}/>
                                        <Text>{this.state.recette.tps_cuisson}</Text>
                                    </View>

                                </Card>
                            </View>


                            {this.state.status_ingr ?
                                <DetailsRecette ingredients={this.state.ingredients} materiels={this.state.materiel} nb_parts={this.state.nb_parts} nb_parts_init={this.state.recette.nb_pers}/>
                                : null}

                            {this.state.status_prep ?
                                <DetailsPreparation etapes={this.state.preparation} tags={this.state.recette.tags}/>
                                : null}

                            {this.state.status_comas ?
                                <DetailsAstucesComms astuces={this.state.astuces} commentaires={this.state.commentaires}/>
                                : null}


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
        onglet: {
            paddingTop: 10, textAlign: 'center', borderColor: '#ffffff',
            borderWidth: 3, marginTop: 10, width: 110, marginLeft: 2, fontSize: 5, height: 70, left: 50, right: 0, top: -225
        },
        view: {
           flexDirection: 'row'
        },
        image: {
            width: 250, height: 225, marginLeft:0
        },
        favorite: {
            width: 320, marginLeft: 10, flexDirection: 'row',
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