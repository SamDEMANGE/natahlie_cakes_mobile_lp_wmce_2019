import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View} from "react-native";

export default class Header extends Component {

    render() {

        return (


                    <View style={styles.header}>
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
          width: 350, backgroundColor: '#fbf2c1'
      }
    });