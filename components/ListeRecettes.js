import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-material-ui';





export default class ListeRecettes extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        display: PropTypes.any

    };
    static navigationOptions={
        title: "Accueil",
    };

    constructor(){
        super();
     //   this.displayDetail=this.displayDetail.bind(this);

    }

    displayDetail(id){

        console.log(this.props.navigation);
        console.log('index'+ id);
        this.props.navigation.navigate("Ingredients", {'id': id});


    }



    render() {


        return (
            <View>
                {this.props.items.map((item, index) => {
                    return (
                        <View key={item.key} style={styles.view}
                        >
                            <TouchableOpacity

                              onPress={()=>this.props.display(item.id)}
                                >
                            <Image
                                source={{uri: item.image}}
                                style={styles.image}
                            />
                            <Text style={styles.content}
                            >{item.nom}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>
        );
    }
}

const
    styles = StyleSheet.create({
        view: {
            backgroundColor:'#fbf2c1', marginTop: 30, width:225, height:240
        },
        image: {
            width: 225, height: 200, marginLeft:0
        },
        content: {
            textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565'
        }
    });