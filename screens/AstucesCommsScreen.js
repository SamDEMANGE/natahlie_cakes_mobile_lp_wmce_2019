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
import {Button} from "react-native-material-ui";





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








                            <SidebarRecette items={this.state.recette}/>



                    <View style={{left: 55, top: -150}}>





                                <DetailsAstucesComms astuces={this.state.astuces} commentaires={this.state.commentaires}/>





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
        }

    });