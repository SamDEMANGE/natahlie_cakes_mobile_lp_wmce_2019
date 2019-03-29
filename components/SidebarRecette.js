import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
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



                        <View
                        >

                            <Image
                                source={{uri: this.props.items.image}}
                                style={styles.image}
                            />
                            <Text style={styles.content}>{this.props.items.nom}</Text>
                            <Image

                                source={require('../assets/images/favorite.png')}
                                style={styles.favorite}
                            />

                            <Image

                                source={require('../assets/images/gateau_parts.png')}
                                style={styles.sidebar}
                            />

                            <Text>{this.props.items.nb_pers} personnes</Text>

                            <Image

                                source={require('../assets/images/356299-200.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.props.items.tps_prep} minutes</Text>

                            <Image

                                source={require('../assets/images/four.png')}
                                style={styles.sidebar}
                            />
                            <Text>{this.props.items.tps_cuisson} minutes</Text>

                        </View>



        );
    }
}


const
    styles = StyleSheet.create({
       image: {
           width: 225, height: 200, marginLeft:0
       },
        favorite: {
            width: 30, marginTop: 25, marginLeft: 10
        },
        sidebar: {
            width: 150, marginTop: 10, marginLeft: 10
        },
        content: {
            fontWeight: 'bold', fontSize:20, color: '#e22565'
        }
    });