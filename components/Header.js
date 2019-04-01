import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View, Text} from "react-native";
import {Toolbar, Card} from 'react-native-material-ui';




export default class Header extends Component {

    render() {

        return (


                    <Image

                        source={require('../assets/images/logo_cakes.png')}
                        style={styles.logo}
                    />



    )
}


                    }

const
    styles = StyleSheet.create({
      logo: {
          width: 500, height: 200 ,backgroundColor: '#fbf2c1'
      }
    });