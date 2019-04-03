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

import {Icon} from 'react-native-material-ui';







let recettes= bdd.ref('/Recettes');
let all_recettes=bdd.ref('/Recettes');

recettes=bdd.ref('/Recettes').limitToLast(20);



export default class HomeScreen extends React.Component {


    constructor(props){
        super(props);
        this.displayDetail=this.displayDetail.bind(this);
        this.search=this.search.bind(this);
        this.afficheLastRecettes=this.afficheLastRecettes.bind(this);

    }



    static navigationOptions = {
      //  header: null,
        title : 'Accueil'
    };

    state = {
        isLoadingComplete: false,
        recette: [],
        tmp_recette: [],
        nb_total: 20,
        recherche: '',
    };

    componentDidMount() {

        all_recettes.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});
            //   console.log('id: '+snapshot.id);
            //console.log(snapshot);
            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({nb_total: recette.length});

        });
        this.setState({isLoadingComplete: true});


        recettes.once('value', (snapshot) => {
            //   let data=snapshot.toJSON();

            //  this.setState({recettes:(data)});
         //   console.log('id: '+snapshot.id);
            //console.log(snapshot);
            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({recette: recette});
            this.setState({recette: this.state.recette.reverse()});
            this.setState({tmp_recette: this.state.recette});

        });
        this.setState({isLoadingComplete: true});

    }

    afficheLastRecettes(){

        this.setState({isLoadingComplete: false});

        if(this.state.recherche!==''){
           // dernieres_recettes=bdd.ref('/Recettes').child('child_added').child('nom').orderByChild('nom').startAt(this.state.recherche).limitToFirst((this.state.recette.length + 20));
           let search=  this.state.recette.filter(({nom})=> nom.includes(this.state.recherche));
           this.setState({recette: search});
        }
        else {
            let dernieres_recettes=bdd.ref('/Recettes/').limitToLast((this.state.recette.length + 20));
            dernieres_recettes.once('value', (snapshot)=>{
                let data=snapshot.val();
                let drecette=Object.values(data);
                this.setState({recette: drecette });
                this.setState({recette: this.state.recette.reverse()});
                this.setState({tmp_recette: this.state.recette});
            });
        }

      // this.setState({isLoadingComplete: false});



        this.setState({isLoadingComplete: true});

    }



    search(value){




        this.setState({isLoadingComplete:false});

        if(!value || value==='') {

            this.setState({recherche: ''});
            this.setState({recette: this.state.tmp_recette});
        }
        else{
            this.setState({recherche: value});
/*
            recettes= bdd.ref('/Recettes').child('child_added').child('nom').orderByChild('nom').startAt(value).limitToFirst(20);

            console.log(recettes);
            recettes.once('value', (snapshot) => {
                //   let data=snapshot.toJSON();

                //  this.setState({recettes:(data)});


                let data = snapshot.val();
                if(!data){
                    data=[];
                }

                let recette = Object.values(data);
                this.setState({recette: recette});

                  console.log(this.state.recette);



            });
            */

  let search=  this.state.tmp_recette.filter(({nom})=> nom.includes(value));
    console.log('search');
    console.log(search);
    this.setState({recette: search});

        }

        this.setState({nb_total: this.state.recette.length});

        this.setState({isLoadingComplete: true});



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
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}
                onMomentumScrollEnd={this.afficheLastRecettes}
                >

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


                                                {
                                                   this.state.isLoadingComplete === false
                                                     || this.state.recette.length < this.state.nb_total
                                                        ? <Icon name={'autorenew'} style={styles.icon}/>
                                                       : <Text/>
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
            fontWeight: 'bold', fontSize:20, color: '#e22565', width: 300, height: 100, marginTop: 25, textAlign: 'center'
        },
        icon: {
            width: 200, height: 200, marginLeft: 100
        }

    });



