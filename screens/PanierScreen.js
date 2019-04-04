import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { NavigationEvents } from 'react-navigation';
import {ToastAndroid} from 'react-native';


let favoris= bdd.ref('/Favoris').orderByChild('id');



export default class PanierScrenn extends React.Component {

    constructor(props){
        super(props);
        this.displayNav=this.displayNav.bind(this);

    }

    static navigationOptions = {
        //  header: null,
        title : 'Ma liste de course'
    };

    state = {
        isLoadingComplete: false,
        recettes_tab: [],



    };

    requetes() {

        favoris.once('value', (snapshot) => {

            let data = snapshot.val();
            let favoris_tab = Object.values(data);
            this.setState({favoris_tab : favoris_tab.reverse()});

            this.setState({isLoadingComplete: true});
        });

    }



    displayNav(id){

        if(id === 1){
            this.props.navigation.navigate("Home");
        }
        else if(id === 2){
            this.props.navigation.navigate("Tags");
        }
        else if(id === 3){
            this.props.navigation.navigate("Favoris");
        }
        else if(id === 4){
            this.props.navigation.navigate("Panier");
        }

    }


    trieFav(){





        let tableau_recettes = [];

        console.log(this.state.favoris_tab.length);
        console.log(this.state.recettes_tab_all.length);

        for(let i=0; i < this.state.favoris_tab.length; i++){

            for(let k=0; k < this.state.recettes_tab_all.length; k++){

                if(this.state.favoris_tab[i].recette === this.state.recettes_tab_all[k].id && this.state.favoris_tab[i].user === 1 && tableau_recettes.length <= taille){


                    tableau_recettes.push(this.state.recettes_tab_all[k]);
                }

            }

        }



        this.setState({recettes_tab : tableau_recettes});

        console.log("tableau_recettes"+ tableau_recettes.length);

        this.setState({isLoadingComplete: true});
    }


    render() {

        return (
            <View style={styles.container}>

                <NavigationEvents onWillFocus={payload => this.requetes()}/>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)){

                    }

                }}>

                    <Header/>

                    <View style={styles.container}>

                        <View style={styles.view}>


                        </View>

                    </View>
                </ScrollView>

                <Sidebar display={this.displayNav}/>

            </View>
        );
    }


}


const
    styles = StyleSheet.create({
        container: {

            marginTop:-15,
            left:0,
            top:0,
            backgroundColor: '#fff',

        },

        contentContainer: {
            paddingTop: 30, justifyContent: 'center',
        },
        view: {
            width: '100%',
            marginTop: 0,
            justifyContent:'center'
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565', width: 300, height: 100, marginTop: 25,
        },
        icon: {
            width: 200, height: 200, marginLeft: 100
        },
        recherche: {
            borderBottomColor: '#000000', borderWidth: 3,
            marginTop: 20,
            width: '70%',
            marginRight: '15%', marginLeft: '15%'
        }
    });
