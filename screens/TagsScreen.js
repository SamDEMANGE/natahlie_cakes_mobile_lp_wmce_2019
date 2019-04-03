import React, {Component} from "react";
import {View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ListeRecettes from "../components/ListeRecettes";
import {Card} from "react-native-material-ui";
import {Badge} from "react-native-elements";


export default class TagsScreen extends Component {

    constructor(props){
        super(props);
    }

    static navigationOptions = {
        //  header: null,
        title: 'Tags'
    };

    render(){
        return(

            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}

                >

                    <Header/>
                    <Sidebar display={this.displayNav} nb_recettes={3}/>


                    <View style={styles.view}>

                    <TouchableOpacity
                       >
                        <Badge
                        value={ <Text style={styles.content}>1er Tag</Text>}
                        badgeStyle={styles.badge}
                        status={"primary"}
                        />


                    </TouchableOpacity>

                    <TouchableOpacity
                          >
                        <Badge
                            value={ <Text style={styles.content}>2ème Tag</Text>}
                            badgeStyle={styles.badge}
                            status={"success"}
                        />


                    </TouchableOpacity>
                    </View>


                </ScrollView>
            </View>

        )
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

        view: {
            left: 0, marginTop: -240*3, right: 20
        },
        content: {
            fontWeight: 'bold', fontSize:18, color: '#fff', textAlign: 'center'
        },
        badge: {
            width: 150, height: 50, marginTop: 25
    }

    });
