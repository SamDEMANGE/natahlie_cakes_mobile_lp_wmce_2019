import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import ListeRecettes from "../components/ListeRecettes";
import DetailsPreparation from "../components/DetailsPreparation";
import DetailsAstucesComms from "../components/DetailsAstucesComms";
import SidebarRecette from "../components/SidebarRecette";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";





export default class AstucesCommsScreen extends React.Component {


    constructor(){
        super();
    }




    static navigationOptions = {
     //   header: null,
        title : 'Astuces et commentaires'
    };

    state = {
        isLoadingComplete: false,

        astuces: [],
        commentaires: [],
        recette : []
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

            console.log(data);

            let astuces=Object.values(data.publication.astuces);
            let commentaires=Object.values(data.publication.commentaires);



            this.setState({recette: data, astuces: astuces, commentaires: commentaires});

            //    console.log(this.state.recette);
        })
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

                                style={
                                  styles.onglets
                                }
                            >Astuces et commentaires</Text>
                        </TouchableOpacity>



                  <Sidebar/>
                        <View style={styles.view}>


                            <SidebarRecette items={this.state.recette}/>


                        </View>

                        <View style={styles.view}>


                            <View>

                                <DetailsAstucesComms astuces={this.state.astuces} commentaires={this.state.commentaires}/>

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
        }

    });