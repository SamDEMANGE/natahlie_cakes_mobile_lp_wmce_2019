import React, {Component} from "react";
import {View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ListeTags from '../components/ListeTags';
import {Badge} from "react-native-elements";
import {bdd} from "../database";


let recettes= bdd.ref('/Recettes');

export default class TagsScreen extends Component {

    constructor(props){
        super(props);
        this.tags=[];
        this.tags2=[];
        this.hastags=[];
        this.recettes=[];
        this.recettes_tags=[];
        this.tags_recettes=[];
        this.recupTags=this.recupTags.bind(this);
        this.unique=this.unique.bind(this);
        this.displayRecette=this.displayRecette.bind(this);
        this.displayNav=this.displayNav.bind(this);
        this.selectRecettes=this.selectRecettes.bind(this);
    }

    static navigationOptions = {
        //  header: null,
        title: 'Tags'
    };

    state={
        title: (
            <Text></Text>
        ),
        styles:
        (styles.badge)
        ,
        list_recettes : [],
        list_recettes_tag: [],
        list_tags: [],
        tmp_tags: []
    };

    componentDidMount(){


        recettes.on('child_added', (snapshot)=>{
            let data = snapshot.val();



          this.tags.push(Object.values(data.tags));
      //  console.log(this.tags[1][1]);

            this.tags_recettes.push({data: (data), tags: Object.values(data.tags)});
            this.setState({list_recettes_tag: this.tags_recettes});

        this.setState({tmp_tags: this.tags});

        });

        this.selectRecettes();



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


     unique(element, index, self) {
        return self.indexOf(element) === index;
    }

    recupTags()
    {


        console.log(this.state.tmp_tags[1][1]);


        for(let i=0; i<this.state.tmp_tags.length;i++){

            for(let j=0;j<this.state.tmp_tags[i].length;j++){


                this.hastags.push(this.state.tmp_tags[i][j]);
            }



            }

       let filter= this.hastags.filter(this.unique);
        console.log(filter);
        this.setState({list_tags: filter});
        this.setState({title: <Text style={styles.title}> Liste des tags</Text>});
        this.setState({styles: (styles.badgeDisable)});



        for(let i=0;i<this.state.list_recettes.length;i++){
            this.recettes_tags.push(Object.values(this.state.list_recettes[i].tags));

        }








        }


        selectRecettes(){

        recettes.once('value', (snapshot)=>{
            let data=snapshot.val();
            this.recettes=(Object.values(data));


            console.log('TEST');


            this.setState({list_recettes: this.recettes});

           });





        }

    displayRecette(tag){

        console.log('tag : '+ tag);
        console.log('recettes filtré');






        let filtre=this.state.list_recettes_tag.filter((element, index, self)=>
            {
                return element.tags.includes(tag);
            }
        );



        filtre.map((item, index)=>{
            this.tags2.push(Object.values(item.data));
            this.setState({list_recettes: this.tags2});
        });


        console.log(filtre);

    }



    render(){


        return(

            <View style={styles.container} >
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}

                >

                    <Header/>



                    <View style={styles.view}>


                        <TouchableOpacity

                        >

                            <Badge
                                value={ <Text style={styles.content}>Afficher tous les tags</Text>}
                                badgeStyle={this.state.styles}
                                status={"primary"}
                                onPress={this.recupTags}

                            />


                        </TouchableOpacity>




                        {this.state.title}

                        {
                            this.state.list_tags.length > 0
                                ?
                                <ListeTags tags={this.state.list_tags} display={this.displayRecette}/>
                                :<Text style={styles.content}> En cours de chargement</Text>
                        }












                    </View>


                </ScrollView>
                <Sidebar display={this.displayNav} nb_recettes={3}/>

            </View>

        )
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
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#fff'
        },
        title: {
            fontWeight: 'bold', fontSize:40, color: '#e22565', textAlign: 'center', justifyContent: 'center', marginTop: 25
        },
        badge: {
            width: 250, height: 50, marginTop: 10
        },
        badgeDisable: {
            width: 250, height: 50, marginTop: 10, display: 'none'
        }

    });
