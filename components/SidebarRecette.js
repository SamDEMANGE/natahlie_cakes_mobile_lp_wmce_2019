import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, Button, TouchableOpacity, ScrollView} from 'react-native';
import PropTypes from 'prop-types';





export default class SidebarRecette extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        display: PropTypes.any

    };

    constructor(){
        super();


    }









    render() {


        return (




            <View style={{left: 55, right: 20, top: -200}}>

                            <Image
                                source={{uri: this.props.items.image}}
                                style={styles.image}
                            />
                <View style={{flexDirection: 'row'}}>
                            <Text style={styles.content}>{this.props.items.nom}</Text>
                            <Image

                                source={require('../assets/images/favorite.png')}
                                style={styles.favorite}
                            />
                </View>
                <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/gateau_parts.png')}
                                style={styles.sidebar}
                            />

                            <Text>{this.props.items.nb_pers} personnes</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/356299-200.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.props.items.tps_prep} minutes</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                            <Image

                                source={require('../assets/images/four.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.props.items.tps_cuisson} minutes</Text>
                </View>
                        </View>



        );
    }
}


const
    styles = StyleSheet.create({
       image: {
           width: 250, height: 225, marginLeft:0
       },
        favorite: {
            width: 30, marginLeft: 10
        },
        sidebar: {
            width: 50, height: 50, marginLeft: 10
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565'
        }
    });