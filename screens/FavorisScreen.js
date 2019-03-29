import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


let favoris= bdd.ref('/Favoris').orderByChild('user').equalTo(1).limitToFirst(20);
let recettes= bdd.ref('/Recettes');

export default class FavorisScreen extends React.Component {

    constructor(){
        super();
        this.displayDetail=this.displayDetail.bind(this);
        this.search=this.search.bind(this);
        this.trieFav=this.trieFav.bind(this);

    }



    static navigationOptions = {
        //  header: null,
        title : 'Mes Favoris'
    };


    state = {
        isLoadingComplete: false,
        recette: [],
        recettes_tab: [],
        favoris_tab: [],
    };


    search(value){
        console.log(value);
        let recettes= bdd.ref('/Recettes').orderByChild('nom').startAt(value).limitToFirst(20);

        recettes.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});

            let data = snapshot.val();
            if(!data){
                data=[];
            }
            let recette = Object.values(data);
            this.setState({recette});

            //  console.log(this.state.recette);
        })
    }

    displayDetail(id){

        console.log(this.props.navigation);
        console.log('index'+ id);
        this.props.navigation.navigate("Ingredients", {id: id});

        this.setState({recette: this.state.recette});

    }

    componentDidMount() {


        favoris.once('value', (snapshot) => {

            let data = snapshot.val();
            let favoris_tab = Object.values(data);
            this.setState({favoris_tab : favoris_tab});


        });

        recettes.once('value', (snapshot) => {

            let data = snapshot.val();
            let recettes_tab = Object.values(data);
            this.setState({recettes_tab});

            this.trieFav();

        });

    }

    trieFav(){


        let tableau_recettes = [];



        for(let i=0; i < this.state.favoris_tab.length; i++){

            for(let k=0; k < this.state.recettes_tab.length; k++){

                if(this.state.favoris_tab[i].recette === this.state.recettes_tab[k].id){

                    tableau_recettes.push(this.state.recettes_tab[k]);
                }

            }

        }


        this.setState({recettes_tab : tableau_recettes});

        console.log(this.state.recettes_tab);
    }


    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Header/>


                    <View style={styles.container}>

                        <TextInput
                            placeholder={"  Recherche..."}
                            style={styles.recherche}
                            onSubmitEditing={(event)=>this.search(event.nativeEvent.text)}
                        />
                        <Sidebar/>
                        <View style={styles.view}>


                            <View>
                                {
                                    this.state.recettes_tab.length > 0
                                        ? <ListeRecettes items={this.state.recettes_tab} display={this.displayDetail}/>
                                        : <Text style={styles.content}>Aucune recette disponible... ! Désolé !</Text>
                                }
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
        recherche: {
            borderBottomColor: '#000000',
            borderWidth: 3, marginTop: 50, width: 250, marginLeft: 50
        },
        view: {
            left: 80, bottom: 270, right: 20
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565'
        }

    });
