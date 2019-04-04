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
    }

    static navigationOptions = {
        //  header: null,
        title: 'Tags'
    };



    componentDidMount(){


        recettes.once('value', (snapshot)=>{
            let data = snapshot.val();
            let recette = Object.values(data);
           this.setState({list_recettes: recette});
        });

    }


    state={
      title: ( <Text style={styles.title}> Liste des tags</Text>),
      list_recettes : [],
      list_tags: []
    };

    render(){
        return(

            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}

                >

                    <Header/>



                    <View style={styles.view}>

                        {this.state.title}




                        <ListeTags tags={this.state.list_recettes}/>







                        <TouchableOpacity
                        >

                            <Badge
                                value={ <Text style={styles.content}>Liste des tags</Text>}
                                badgeStyle={styles.badge}
                                status={"primary"}
                            />


                        </TouchableOpacity>



                        <TouchableOpacity
                       >
                        <Badge
                        value={ <Text style={styles.content}>1er Tag</Text>}
                        badgeStyle={styles.badge}
                        status={"success"}
                        />


                    </TouchableOpacity>

                    <TouchableOpacity
                          >
                        <Badge
                            value={ <Text style={styles.content}>2ème Tag</Text>}
                            badgeStyle={styles.badge}
                            status={"warning"}
                        />


                    </TouchableOpacity>

                        <TouchableOpacity
                        >
                            <Badge
                                value={ <Text style={styles.content}>3ème Tag</Text>}
                                badgeStyle={styles.badge}
                                status={"error"}
                            />


                        </TouchableOpacity>
                    </View>


                </ScrollView>
                <Sidebar  nb_recettes={3}/>
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
            fontWeight: 'bold', fontSize:40, color: '#e22565', textAlign: 'center', justifyContent: 'center'
        },
        badge: {
            width: 150, height: 50, marginTop: 25
    }

    });
