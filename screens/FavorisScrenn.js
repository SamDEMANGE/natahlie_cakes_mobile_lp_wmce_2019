import React from "react";
import {Image, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";


let favoris= bdd.ref('/Favoris').orderByChild('id');
let recettes= bdd.ref('/Recettes');

export default class FavorisScrenn extends React.Component {

    constructor(props){
        super(props);
        this.displayDetail=this.displayDetail.bind(this);
        this.displayNav=this.displayNav.bind(this);
        this.search=this.search.bind(this);
        this.trieFav=this.trieFav.bind(this);

    }

    static navigationOptions = {
        //  header: null,
        title : 'Mes FavorisScrenn'
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

        this.props.navigation.navigate("Ingredients", {id: id});

        this.setState({recette: this.state.recette});

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

                if(this.state.favoris_tab[i].recette === this.state.recettes_tab[k].id && this.state.favoris_tab[i].user === 1){

                    tableau_recettes.push(this.state.recettes_tab[k]);
                }

            }

        }




        let inverse_table_recette = [];
        let place = 0;


        for( let q = tableau_recettes.length - 1; q > -1; q--){

            console.log(q);
            inverse_table_recette[place]=tableau_recettes[q];
            place++;
        }

        console.log(inverse_table_recette[0]);
        this.setState({recettes_tab : inverse_table_recette});


    }

    render() {

        return (
            <View style={styles.container}>

                <Header style={styles.header}/>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


                    <View style={styles.container}>

                        <TextInput

                            placeholder={"  Recherche..."}
                            style={styles.recherche}
                            onSubmitEditing={(event)=>this.search(event.nativeEvent.text)}
                        />
                        <Sidebar display={this.displayNav}/>
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

        header: {


        },
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
