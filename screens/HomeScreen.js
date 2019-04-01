import React from 'react';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

import {ListItem} from 'react-native-material-ui';







let recettes= bdd.ref('/Recettes').limitToLast(20);


export default class HomeScreen extends React.Component {


    constructor(props){
        super(props);
        this.displayDetail=this.displayDetail.bind(this);
        this.search=this.search.bind(this);

    }



    static navigationOptions = {
      //  header: null,
        title : 'Accueil'
    };

    state = {
        isLoadingComplete: false,
        recette: []
    };

    componentDidMount() {



        recettes.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});
         //   console.log('id: '+snapshot.id);
            //console.log(snapshot);
            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({recette});
            this.setState({recette: this.state.recette.reverse()});

        })
    }

    search(value){
        console.log(value);
        let recettes= bdd.ref('/Recettes').orderByChild('/nom').startAt(value).limitToFirst(20);

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

       // console.log(this.props.navigation);
        console.log('index'+ id);
        this.props.navigation.navigate("Ingredients", {id: id});

        this.setState({recette: this.state.recette});

    }

    render() {

        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                <Header/>
                    <Sidebar nb_recettes={this.state.recette.length>0 ? this.state.recette.length : 20}/>






                                            <TextInput
                                                placeholder={"  Recherche..."}
                                                style={{borderBottomColor: '#000000',
                                                    borderWidth: 3, marginTop: -280*(this.state.recette.length>0 ? this
                                                        .state.recette.length : 20), width: 250, marginLeft: 70}}
                                                onSubmitEditing={(event)=>this.search(event.nativeEvent.text)}
                                            />

                                            <View style={styles.view}>



                                                    {
                                                        this.state.recette.length > 0
                                                            ? <ListeRecettes items={this.state.recette} display={this.displayDetail}/>
                                                            : <Text style={styles.content}>Aucune recette disponible...
                                                                ! Désolé !</Text>
                                                    }



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
            borderWidth: 3, marginTop: -240*25, width: 250, marginLeft: 70
        },
        view: {
            left: 80, marginTop: 0, right: 20
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565', width: 300, height: 240
        }

    });



