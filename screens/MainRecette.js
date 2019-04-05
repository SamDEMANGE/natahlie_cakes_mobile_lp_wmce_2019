import React from "react";
import {
    Image,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ToastAndroid
} from "react-native";
import {bdd} from "../database";
import DetailsRecette from "../components/DetailsRecette";
import DetailsPreparation from "../components/DetailsPreparation";
import DetailsAstucesComms from "../components/DetailsAstucesComms";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {Icon, Card , Button} from 'react-native-material-ui';
import Divider from 'react-native-divider'
import { AirbnbRating, Rating} from 'react-native-elements';



export default class MainRecette extends React.Component {



    constructor(props){
        super(props);

        this.diminueParts=this.diminueParts.bind(this);
        this.augmenteParts=this.augmenteParts.bind(this);
        this.displayNav=this.displayNav.bind(this);

        this.favoriteFonction=this.favoriteFonction.bind(this)
        this.addFav=this.addFav.bind(this);
        this.deleteConfirmFav=this.deleteConfirmFav.bind(this);
        this.deleteFav=this.deleteFav.bind(this);
        this.getIdFav = this.getIdFav.bind(this);
        this.checkFavId = this.checkFavId.bind(this);

        this.listFonction=this.listFonction.bind(this);
        this.addList=this.addList.bind(this);
        this.deleteConfirmList=this.deleteConfirmList.bind(this);
        this.deleteList=this.deleteList.bind(this);
        this.getIdList = this.getIdList.bind(this);
        this.checkListId = this.checkListId.bind(this);






    }


    static navigationOptions = {
        title: 'Détails de la recette'
    };

    state = {
        isLoadingComplete: false,
        nb_parts: 0,
        ingredients: [],
        materiel:[],
        recette:[],
        preparation:[],
        astuces: [],
        commentaires: [],
        status_ingr: true,
        status_prep: false,
        status_comas: false,
        status_pers: false,
        favicon_name: 'favorite-border',
        listicon_name: 'assignment',
        etat_fav: false,
        etat_list: false,
        idSup : 0,
        idSup2 : 0,
        id_fav: 0,
        id_list: 0,
        utilisateurs: [],
        tags: [],
        ingr_init: [],
        etat_init: true,
        etat_init2: true,
    };


    componentDidMount() {

        let zero='';

        let utilisateur=bdd.ref('/Utilisateurs');


        utilisateur.once('value', (snapshot)=>
        {
           let data=snapshot.val();
           let users=Object.values(data);
           this.setState({utilisateurs: users});
        });

        let detailrecette= bdd.ref('/Recettes/recette_'+zero+this.props.navigation.state.params.id);


        detailrecette.once('value', (snapshot) => {


            let data = snapshot.val();
            let tags=Object.values(data.tags);
            let ingredients=Object.values(data.ingredients);
            let materiels=Object.values(data.materiels);
            let preparation=Object.values(data.preparation);
            let astuces=Object.values(data.publication.astuces);
            let commentaires=Object.values(data.publication.commentaires);

            this.setState({recette:data, ingredients: ingredients, materiel: materiels, preparation: preparation, astuces: astuces, commentaires: commentaires, nb_parts: data.nb_pers});
            this.setState({tags: tags});
            this.getIdFav();
            this.getIdList();

        });

    }



    augmenteParts(){
        this.setState({nb_parts: (this.state.nb_parts + 1)});


        let tab_ingr = this.state.ingredients;

        let tab_init = 0;

        for(let i = 0; i < this.state.ingredients.length; i++){

            if(this.state.etat_init === true){

                if(this.state.nb_parts === 1){
                    this.setState({nb_parts: 2});
                }
                else{
                    tab_init =this.state.nb_parts - 1;
                }


                tab_ingr[i].qte = parseInt(tab_ingr[i].qte * this.state.nb_parts /tab_init);

            }
            else{
                tab_ingr[i].qte = parseInt(tab_ingr[i].qte * this.state.nb_parts / this.state.ingr_init);
            }

        }


        if(this.state.etat_init === true){
            this.setState({ ingr_init : tab_init})
        }

        this.setState({etat_init  : false });


        this.setState({ ingredients : tab_ingr});

    }


    diminueParts(){

        this.setState({nb_parts: (this.state.nb_parts - 1)});

        if(this.state.nb_parts === 1){
            this.setState({nb_parts: 1});
        }
        else{

            let tab_ingr = this.state.ingredients;

            let tab_init = 0;

            for(let i = 0; i < this.state.ingredients.length; i++){

                if(this.state.etat_init2 === true){

                    tab_init =this.state.nb_parts + 1;
                    tab_ingr[i].qte = parseInt(tab_ingr[i].qte * this.state.nb_parts /tab_init);

                }
                else{
                    tab_ingr[i].qte = parseInt(tab_ingr[i].qte * this.state.nb_parts / this.state.ingr_init);
                }

            }



            if(this.state.etat_init2 === true){
                this.setState({ ingr_init : tab_init})
            }

            this.setState({etat_init2  : false });


            this.setState({ ingredients : tab_ingr});

        }




    }

    getIdFav(){

        bdd.ref('Favoris').on("value", (snapchot) => {

            let data = snapchot.val();
            let resource = Object.values(data);
            let tableId = [];
            let idC = 0;

            for(var i=0; i<resource.length; i++){

                idC = resource[i].id;

                if(i === 0){

                    tableId.push(idC);
                }

                for(let k=0; k<tableId.length; k++){

                    if(idC < tableId[k]){

                        idC = tableId[k];
                    }
                }

                tableId.push(idC);
            }

            this.setState({idSup: idC+1});

            this.checkFavId(resource);


        });



    }

    checkFavId(table_Fav){


        for(let n =0; n < table_Fav.length; n++){

            if(table_Fav[n].recette === this.state.recette.id){


                this.setState({etat_fav: true});
                this.setState({favicon_name: 'favorite'});

                this.setState({id_fav : table_Fav[n].id})
                n = table_Fav.length;

            }
        }
    }

    getIdList(){

        bdd.ref('Panier').on("value", (snapchot) => {

            let data = snapchot.val();
            let resource = Object.values(data);
            let tableId = [];
            let idC = 0;

            for(var i=0; i<resource.length; i++){

                idC = resource[i].id;

                if(i === 0){

                    tableId.push(idC);
                }

                for(let k=0; k<tableId.length; k++){

                    if(idC < tableId[k]){

                        idC = tableId[k];
                    }
                }

                tableId.push(idC);
            }

            this.setState({idSup2: idC+1});

            this.checkListId(resource);


        });

    }

    checkListId(table_List){


        for(let n =0; n < table_List.length; n++){

            if(table_List[n].recette === this.state.recette.id){


                this.setState({etat_list: true});
                this.setState({listicon_name: 'check-circle'});

                this.setState({id_list : table_List[n].id})
                n = table_List.length;

            }
        }
    }


    favoriteFonction(){

        if(this.state.etat_fav===false) {
            this.setState({etat_fav: true});
            this.setState({favicon_name: 'favorite'});
            this.addFav();
        }
        else if(this.state.etat_fav===true){
            this.deleteConfirmFav();

        }

    }


    addFav() {
        bdd.ref('Favoris/fav_' + this.state.idSup).set({
            id: this.state.idSup,
            recette: this.state.recette.id,
            user : 1
        });

        this.getIdFav();
        ToastAndroid.show('Cette recette fait maintenant partie de vos favoris', ToastAndroid.SHORT);
    }


    deleteConfirmFav() {

        Alert.alert(
            'Confirmation de suppression',
            'Voulez vous vraiment supprimer ce favoris? ',
            [
                {text: 'Supprimer', onPress: () => this.deleteFav()},

                {

                    text: 'Annuler',
                    style: 'cancel',

                }

            ]
        );
    }

    deleteFav() {

        bdd.ref('/Favoris/fav_' + this.state.id_fav).remove();
        this.setState({etat_fav: false});
        this.setState({favicon_name: 'favorite-border'});
        ToastAndroid.show('La recette a été supprimé de vos favoris', ToastAndroid.SHORT);

    }

    listFonction(){

        if(this.state.etat_list===false) {
            this.setState({etat_list:true});
            this.setState({listicon_name: 'check-circle'});
            this.addList();

        }
        else if(this.state.etat_list===true){

            this.deleteConfirmList();

        }
    }

    addList() {
        bdd.ref('Panier/list_'+ this.state.idSup2).set({
            id: this.state.idSup2,
            recette: this.state.recette.id,
            'list' : this.state.recette.ingredients,
        });

        this.getIdList();
        ToastAndroid.show('Les ingredients ont été ajouté à votre liste de course', ToastAndroid.SHORT);
    }

    deleteConfirmList() {

        Alert.alert(
            'Confirmation de suppression',
            'Voulez vous vraiment supprimer ces ingredients de votre liste de course? ',
            [
                {text: 'Supprimer', onPress: () => this.deleteList()},

                {

                    text: 'Annuler',
                    style: 'cancel',

                }

            ]
        );
    }

    deleteList() {

        bdd.ref('Panier/list_'+ this.state.id_list).remove();
        this.setState({etat_list:false})
        this.setState({listicon_name: 'assignment'});
        ToastAndroid.show('Les ingredients ont été supprimé de votre liste de course', ToastAndroid.SHORT);

    }


    changeComponent(id_component) {



        if(id_component === 1){

            this.setState({status_ingr: true, status_prep: false, status_comas: false, status_pers: false});
        }

        else if(id_component === 2){

            this.setState({status_ingr: false, status_prep: true, status_comas: false, status_pers: true});
        }

        else if(id_component === 3){

            this.setState({status_ingr: false, status_prep: false, status_comas: true, status_pers: true});
        }

        else{

            this.setState({status_ingr: true, status_prep: true, status_comas: true, status_pers: false});
        }

        this.setState({component: this.Component_current});

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


    render() {


        return (
            <View style={styles.container}>

                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                  <Header/>

                        <View style={{width: '94%', marginRight: '3%', marginLeft: '3%', marginTop:20}}>
                            <View style={{width: '100%'}}>
                                <Card>

                                    <Image source={{uri: this.state.recette.image}} style={styles.image}/>

                                    <View style={styles.favorite}>

                                        <Text style={styles.content}>

                                            {this.state.recette.nom}


                                        </Text>

                                        <TouchableOpacity  style={{paddingLeft: 20}} onPress={ () => this.favoriteFonction() }>

                                            <Icon name={this.state.favicon_name} />

                                        </TouchableOpacity>
                                        <TouchableOpacity  style={{paddingLeft: 2}} onPress={ () => this.listFonction() }>

                                            <Icon name={this.state.listicon_name} />

                                        </TouchableOpacity>

                                    </View>

                                    <View style={{flexDirection: 'row', marginLeft: '25%',}}>

                                        <Rating readonly={true}
                                                ratingCount={5}
                                                startingValue={this.state.recette.difficulte}
                                                imageSize={30}
                                                style={{verticalAlign: "center", alignItems: 'center', marginTop:10}}
                                        />
                                    </View>

                                    {this.state.status_ingr ?
                                        <View style={{flexDirection: 'row', verticalAlign: "center", alignItems: 'center'}}>
                                            <Image source={require('../assets/images/gateau_parts.png')} style={styles.sidebar}/>

                                            <View style={styles.button}>
                                                <Button raised accent={'#d3d3d3'} text={"-"} onPress={this.diminueParts}/>
                                            </View>

                                            <Text style={{marginLeft: 10, marginRight: 10, fontSize:25}}>{this.state.nb_parts}</Text>

                                            <View style={styles.button}>
                                                <Button raised accent={'#d3d3d3'} text={"+"} onPress={this.augmenteParts}/>
                                            </View>
                                        </View>

                                        : null}


                                    {this.state.status_pers ?
                                        <View style={{flexDirection: 'row', verticalAlign: "center", alignItems: 'center'}}>
                                            <Image source={require('../assets/images/gateau_parts.png')} style={styles.sidebar}/>
                                            <Text style={{fontSize:25}}>{this.state.recette.nb_pers} personnes</Text>
                                        </View>

                                        : null}


                                    <View style={{flexDirection: 'row', verticalAlign: "center", alignItems: 'center'}}>
                                        <Image source={require('../assets/images/356299-200.png')} style={styles.sidebar2}/>
                                        <Text style={{fontSize:25, marginLeft:15}}>{this.state.recette.tps_prep}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', verticalAlign: "center", alignItems: 'center', marginTop:10}}>
                                        <Image source={require('../assets/images/four.png')} style={styles.sidebar3}/>
                                        <Text style={{fontSize:25, marginLeft:25}}>{this.state.recette.tps_cuisson}</Text>
                                    </View>


                                </Card>
                            </View>

                            <Divider orientation="center"></Divider>

                            <View style={styles.view}>
                                <View style={this.state.status_ingr ? styles.onglets : styles.onglet}>
                                    <Button text={"Ingrédients et matériels"} upperCase={false}
                                            onPress={()=> this.changeComponent(1)}
                                    />
                                </View>
                                <View style={this.state.status_prep ? styles.onglets : styles.onglet}>
                                    <Button text={"Préparation"} upperCase={false}
                                            onPress={()=> this.changeComponent(2)}/>
                                </View>
                                <View style={this.state.status_comas ? styles.onglets : styles.onglet}>
                                    <Button text={"Astuces et commentaires"} upperCase={false}
                                            onPress={()=> this.changeComponent(3)}/>
                                </View>
                            </View>


                            {this.state.status_ingr ?
                                <DetailsRecette ingredients={this.state.ingredients} materiels={this.state.materiel} nb_parts={this.state.nb_parts} nb_parts_init={this.state.recette.nb_pers}/>
                                : null}

                            {this.state.status_prep ?
                                <DetailsPreparation etapes={this.state.preparation} tags={this.state.tags}/>
                                : null}

                            {this.state.status_comas ?
                                <DetailsAstucesComms astuces={this.state.astuces} commentaires={this.state.commentaires}
                                                     commentateurs={this.state.utilisateurs}/>
                                : null}


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
        onglets: {
            borderColor: '#e22565', borderBottomColor: '#ffffff',  textAlign: 'center', paddingTop:10, alignItems: "center",
            borderWidth: 3,   fontSize: 10, height: 70,width : "33%", backgroundColor: '#e1e8ee',justifyContent:"center"
        },
        onglet: {
             textAlign: 'center', borderColor: '#ffffff', paddingTop:10,
            borderWidth: 3,  fontSize: 10, height: 70, width : "33%", backgroundColor: '#e1e8ee', justifyContent:"center", alignItems: "center",
        },
        view: {
           flexDirection: 'row', width:"100%"
        },
        image: {
            width: '100%', height: 250,
        },
        favorite: {
            width: '100%', flexDirection: 'row', justifyContent: 'center', textAlign: 'center', marginBottom: 20,
        },
        sidebar: {
            width: 100, height: 100, marginLeft: 10
        },
        sidebar2: {
            width: 80, height: 80, marginLeft: 10
        },
        sidebar3: {
            width: 60, height: 60, marginLeft: 20, marginBottom: 20
        },
        button:{
            width: 40
        },
        content: {
            fontWeight: 'bold', fontSize:27, color: '#e22565',marginLeft:45, marginTop:20
        },

    });
