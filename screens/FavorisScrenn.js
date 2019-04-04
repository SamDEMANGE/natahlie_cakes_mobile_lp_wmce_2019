import React from "react";
import {ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { NavigationEvents } from 'react-navigation';
import {ToastAndroid} from 'react-native';


let favoris= bdd.ref('/Favoris').orderByChild('id');
let recettes= bdd.ref('/Recettes');
let all_recettes=bdd.ref('/Favoris').orderByChild('user').equalTo(1);

export default class FavorisScrenn extends React.Component {

    constructor(props){
        super(props);
        this.requetes=this.requetes.bind(this);
        this.displayDetail=this.displayDetail.bind(this);
        this.displayNav=this.displayNav.bind(this);
        this.search=this.search.bind(this);
        this.trieFav=this.trieFav.bind(this)
        this.afficheLastRecettes=this.afficheLastRecettes.bind(this);


    }

    static navigationOptions = {
        //  header: null,
        title : 'Mes favoris'
    };

    state = {
        isLoadingComplete: false,
        recettes_tab: [],
        favoris_tab: [],
        tmp_recette: [],
        nb_total: 20,
        recherche: '',
    };

    requetes() {

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

        all_recettes.once('value', (snapshot) => {

            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({nb_total: recette.length});

            this.setState({isLoadingComplete: true});
        });


    }

    afficheLastRecettes(){

        this.setState({isLoadingComplete: false});

        if(this.state.recherche!==''){
            let search=  this.state.recettes_tab.filter(({nom})=> nom.includes(this.state.recherche) || nom.includes(this.state.recherche.toLowerCase()));
            this.setState({recettes_tab: search});
        }
        else {
            let dernieres_recettes=bdd.ref('/Favoris/').orderByChild('user').equalTo(1).limitToLast((this.state.recettes_tab.length + 20));
            dernieres_recettes.once('value', (snapshot)=>{
                let data=snapshot.val();
                let drecette=Object.values(data);
                this.setState({recettes_tab: drecette });
                this.setState({recettes_tab: this.state.recettes_tab.reverse()});
                this.setState({tmp_recette: this.state.recettes_tab});
            });
        }

        this.setState({isLoadingComplete: true});

    }


    search(value){


        this.setState({isLoadingComplete:false});

        if(!value || value==='') {

            this.setState({recherche: ''});
            this.setState({recettes_tab: this.state.tmp_recette});
        }
        else{
            this.setState({recherche: value});

            let search=  this.state.tmp_recette.filter(({nom})=> nom.includes(value) || nom.includes(value.toLowerCase()));
            console.log('search');
            console.log(search);
            this.setState({recettes_tab: search});

        }

        this.setState({nb_total: this.state.recettes_tab.length});

        this.setState({isLoadingComplete: true});



    }

    displayDetail(id){

        this.props.navigation.navigate("Ingredients", {id: id});

        this.setState({recettes_tab: this.state.recettes_tab});

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
            this.props.navigation.navigate("Home");
        }

    }


    trieFav(){


        let tableau_recettes = [];


        for(let i=0; i < this.state.favoris_tab.length; i++){

            for(let k=0; k < this.state.recettes_tab.length; k++){

                if(this.state.favoris_tab[i].recette === this.state.recettes_tab[k].id && this.state.favoris_tab[i].user === 1 && tableau_recettes.length <= 20){


                    tableau_recettes.push(this.state.recettes_tab[k]);
                }

            }

        }


        tableau_recettes.reverse();

        this.setState({recettes_tab : tableau_recettes});


    }

    //

    render() {

        return (
            <View style={styles.container}>

                <NavigationEvents onWillFocus={payload => this.requetes()}/>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >

                    <Header/>

                    <View style={styles.container}>

                        <TextInput placeholder={"  Recherche..."} style={styles.recherche} onChange={(event)=>this.search(event.nativeEvent.text)}/>

                        <View style={styles.view}>


                            <View style={styles.view}>

                                {
                                    this.state.recettes_tab.length > 0
                                        ? <ListeRecettes items={this.state.recettes_tab} display={this.displayDetail}/>
                                        : <Text style={styles.content}>Aucune recette disponible... ! Désolé !</Text>
                                }


                                {
                                    this.state.isLoadingComplete === false || this.state.recettes_tab.length < this.state.nb_total
                                        ? <ActivityIndicator size="large" color="#e22565" style={styles.icon}/>  : <Text/>
                                }

                            </View>

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
