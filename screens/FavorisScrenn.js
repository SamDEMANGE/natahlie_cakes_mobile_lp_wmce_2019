import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { NavigationEvents } from 'react-navigation';
import {ToastAndroid} from 'react-native';
import Divider from 'react-native-divider'


let favoris= bdd.ref('/Favoris').orderByChild('id');
let recettes= bdd.ref('/Recettes');
let all_recettes=bdd.ref('/Favoris').orderByChild('user').equalTo(1);

let taille = 19;

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export default class FavorisScrenn extends React.Component {

    constructor(props){
        super(props);
        this.requetes=this.requetes.bind(this);
        this.displayDetail=this.displayDetail.bind(this);
        this.displayNav=this.displayNav.bind(this);
        this.trieFav=this.trieFav.bind(this);

    }

    static navigationOptions = {
        //  header: null,
        title : 'Mes favoris'
    };

    state = {
        isLoadingComplete: false,
        recettes_tab_all: [],
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
            this.setState({favoris_tab : favoris_tab.reverse()});

            this.setState({isLoadingComplete: true});
        });

        recettes.once('value', (snapshot) => {

            let data = snapshot.val();
            let recettes_tab = Object.values(data);
            this.setState({recettes_tab_all: recettes_tab});

            this.trieFav(19);


        });

        all_recettes.once('value', (snapshot) => {

            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({nb_total: recette.length});

            this.setState({isLoadingComplete: true});
        });



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
            this.props.navigation.navigate("Panier");
        }

    }


    trieFav(){


        let tableau_recettes = [];


        for(let i=0; i < this.state.favoris_tab.length; i++){

            for(let k=0; k < this.state.recettes_tab_all.length; k++){

                if(this.state.favoris_tab[i].recette === this.state.recettes_tab_all[k].id && this.state.favoris_tab[i].user === 1 && tableau_recettes.length <= taille){


                    tableau_recettes.push(this.state.recettes_tab_all[k]);
                }

            }

        }


        this.setState({recettes_tab : tableau_recettes});


        this.setState({isLoadingComplete: true});
    }


    render() {

        return (
            <View style={styles.container}>

                <NavigationEvents onWillFocus={payload => this.requetes()}/>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}  onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent))

                        if (this.state.isLoadingComplete === true && this.state.recettes_tab.length < this.state.nb_total){
                            taille = taille +20;
                            this.trieFav();
                        }
                }}>

                    <Header/>

                    <Divider orientation="center">
                        <Text style={{ fontSize: 25 , color: '#e22565'}} h4>
                            Liste de favoris
                        </Text>

                    </Divider>

                        <View style={styles.view}>


                            <ListeRecettes items={this.state.recettes_tab} display={this.displayDetail}/>


                                {
                                    this.state.isLoadingComplete === false || this.state.recettes_tab.length < this.state.nb_total
                                        ? <ActivityIndicator size="large" color="#e22565" style={styles.icon}/>  : <Text/>
                                }


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
            marginTop: -20,
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
