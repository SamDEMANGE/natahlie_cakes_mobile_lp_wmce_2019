import React from "react";
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View} from "react-native";
import ListeIngredients from "../components/ListeIngredients";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { NavigationEvents } from 'react-navigation';
import {ToastAndroid} from 'react-native';
import Divider from 'react-native-divider'
import {Card} from "react-native-elements";


let panier= bdd.ref('/Panier').orderByChild('id');



export default class PanierScrenn extends React.Component {

    constructor(props){
        super(props);
        this.displayNav=this.displayNav.bind(this);
        this.regroupIngr=this.regroupIngr.bind(this);
        this.groupSameIngr=this.groupSameIngr.bind(this);
        this.metUnS=this.metUnS.bind(this);

    }

    static navigationOptions = {
        title : 'Ma liste de courses'
    };

    state = {
        isLoadingComplete: false,
        panier_tab: [],
        recettes_tab: [],
        ingr_tab: [],
        sameIngr_tab: [],



    };

    componentDidMount() {

        panier.once('value', (snapshot) => {


            let data = snapshot.val();
            let panier_tab = Object.values(data);
            this.setState({panier_tab : panier_tab});

            this.regroupIngr();

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


    regroupIngr(){

        let tab_final = [];

        for(let i=0; i < this.state.panier_tab.length; i++){

            let tab_list = Object.values(this.state.panier_tab[i].list);


            for(let k=0; k < tab_list.length; k++){

                let tab_ingr = Object.values(tab_list);

                tab_final.push(Object.values(tab_ingr[k]));

            }
        }

        this.setState({ingr_tab : tab_final});

        this.groupSameIngr(); //FONCTION QUI GROUPE LES INGREDIENTS ET LEUR QUANTITE POUR QU'IL N'Y AI PAS DE DOUBLONS

        this.metUnS(); //FONCTION QUI RAJOUTE UN S

        this.setState({isLoadingComplete : true});
    }

    groupSameIngr(){

        let sameIngr_tab = [];

        let etat_add = false;


        let etat_add_sansmesure = true;

        let ingr_tab = this.state.ingr_tab;

        sameIngr_tab[0]=ingr_tab[0];

        for(let i=1; i < ingr_tab.length; i++){

            etat_add=false;


            if(ingr_tab[i].length === 3){ //TEST SI IL Y A UNE UNITE DE MESURE


                for(let q=0; q < sameIngr_tab.length; q++){


                    if(sameIngr_tab[q][1] === ingr_tab[i][1]){

                        sameIngr_tab[q][2] = parseInt(sameIngr_tab[q][2]) + parseInt(ingr_tab[i][2]);
                        q=sameIngr_tab.length;
                        etat_add=true;

                    }

                }

                if(etat_add === false){
                    sameIngr_tab.push(ingr_tab[i]);
                }


            }

            else{ //QUAND IL N'Y A PAS DE MESURE


                if(etat_add_sansmesure === true){

                    sameIngr_tab.push(ingr_tab[i]);
                    etat_add_sansmesure = false

                }
                else{

                    for(let q=0; q < sameIngr_tab.length; q++){


                        if(sameIngr_tab[q][0] === ingr_tab[i][0]){

                            sameIngr_tab[q][1] = parseInt(sameIngr_tab[q][1]) + parseInt(ingr_tab[i][1]);
                            q=sameIngr_tab.length;
                            etat_add=true;

                        }

                    }

                    if(etat_add === false){
                        sameIngr_tab.push(ingr_tab[i]);
                    }

                }


            }

        }

        this.setState({sameIngr_tab : sameIngr_tab});

    }

    metUnS(){

        let tab_ingr = this.state.sameIngr_tab;

        for(let i=0; i<tab_ingr.length; i++){

            if(tab_ingr[i].length === 3){ //TEST SI Il Y A UNE UNITE DE MESURE

                if(tab_ingr[i][2] >= 2  && (tab_ingr[i][0] ==="pot" || tab_ingr[i][0] ==="paquet")){

                    tab_ingr[i][0] = tab_ingr[i][0] +'s';
                }
            }

        /*  else{ //PAS UNITE DE MESURE

                if(tab_ingr[i][1] >= 1 ){

                    tab_ingr[i][0] = tab_ingr[i][0] +'s';
                }

            } */

        }

        this.setState({sameIngr_tab : tab_ingr});

    }


    render() {

        return (
            <View style={styles.container}>


                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <Header/>

                    <Divider orientation="center">
                        <Text style={{ fontSize: 25,  color: '#e22565'}} h2>
                            Liste de courses
                        </Text>

                    </Divider>

                        <View style={styles.view}>

                            {
                                this.state.isLoadingComplete === false
                                ? <ActivityIndicator size="large" color="#e22565" style={styles.icon}/>
                                : <ListeIngredients items={this.state.sameIngr_tab} />
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
            textAlign: 'center',

        },

        contentContainer: {
            paddingTop: 30, justifyContent: 'center',textAlign: 'center',
        },
        view: {
            width: '100%',
            marginTop: 0,
            justifyContent:'center',
            textAlign: 'center',
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565', width: 300, height: 100, marginTop: 25,textAlign: 'center',
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
