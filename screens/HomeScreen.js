import React from 'react';

import {
    ScrollView,
    StyleSheet,
    Text, TextInput,
    View,
    ActivityIndicator,
} from 'react-native';

import ListeRecettes from "../components/ListeRecettes";
import {bdd} from '../database';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Icon} from 'react-native-material-ui';


let recettes= bdd.ref('/Recettes');
let all_recettes=bdd.ref('/Recettes');

recettes=bdd.ref('/Recettes').limitToLast(20);


const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};


export default class HomeScreen extends React.Component {


    constructor(props){
        super(props);
        this.displayDetail=this.displayDetail.bind(this);
        this.displayNav=this.displayNav.bind(this);
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

            let data = snapshot.val();
            let recette = Object.values(data);
            this.setState({nb_total: recette.length});

        });
        this.setState({isLoadingComplete: true});


        recettes.once('value', (snapshot) => {

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
                let search=  this.state.recette.filter(({nom})=> nom.includes(this.state.recherche) || nom.includes(this.state.recherche.toLowerCase()));
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
                    console.log("test");
                });
            }

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

            let search=  this.state.tmp_recette.filter(({nom})=> nom.includes(value) || nom.includes(value.toLowerCase()));
            console.log('search');
            console.log(search);
            this.setState({recette: search});

        }

        this.setState({nb_total: this.state.recette.length});

        this.setState({isLoadingComplete: true});



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

    displayDetail(id){

        console.log('index'+ id);
        this.props.navigation.navigate("Ingredients", {id: id});

        this.setState({recette: this.state.recette});

    }

    render() {

        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} onScroll={({nativeEvent}) => {
                    if (isCloseToBottom(nativeEvent)) {

                        if(this.state.isLoadingComplete === true && this.state.recette.length < this.state.nb_total){

                            this.afficheLastRecettes();

                        }

                    }
                }}>

                    <Header/>


                    <TextInput placeholder={"  Recherche..."} style={styles.recherche} onChange={(event)=>this.search(event.nativeEvent.text)}/>

                    <View style={styles.view}>


                        {
                            this.state.recette.length > 0
                                ? <ListeRecettes items={this.state.recette} display={this.displayDetail}/>
                                : <Text style={styles.content}>Aucune recette disponible... ! Désolé !</Text>
                        }


                        {
                            this.state.isLoadingComplete === false || this.state.recette.length < this.state.nb_total
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
            marginTop: 0,
            justifyContent:'center'
        },
        icon: {
            width: 200, height: 200, marginLeft: 100
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565', width: 300, height: 100, marginTop: 25,
        },
        recherche: {
            borderBottomColor: '#000000', borderWidth: 3,
            marginTop: 20,
            width: '70%',
            marginRight: '15%', marginLeft: '15%'
        }
    });



