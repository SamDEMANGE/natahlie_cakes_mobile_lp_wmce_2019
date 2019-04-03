import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View, Text} from "react-native";
import { Dimensions } from "react-native";


export default class Header extends Component {

    width2 = Dimensions.get('window').width; //full width

    render() {

        return (

            <View>

                <Image
                    source={require('../assets/images/logo_cakes.png')}
                    style={styles.logo}
                />

            </View>


        )
    }


}

const
    styles = StyleSheet.create({
      logo: {


        backgroundColor: '#fbf2c1',
          width: this.width2

      }
    });