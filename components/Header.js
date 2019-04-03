import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View, Text} from "react-native";
import {Toolbar, Card} from 'react-native-material-ui';
import {Header as EnTete,  Image as Img} from 'react-native-elements';


export default class Header extends Component {

    render() {

        return (

            <EnTete containerStyle={styles.header}
                    backgroundImage={require('../assets/images/logo_cakes.png')}
                    backgroundImageStyle={{
                        width: '105%'
                    }}
            />

        )
    }
}

const
    styles = StyleSheet.create({

        header: {
            backgroundColor: '#fbf2c1',  width: '100%', height:112
        }
    });