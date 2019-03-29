import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View} from "react-native";

export default class Sidebar extends Component {

    render() {

        return (


            <View style={styles.view}>
                <Image

                    source={require('../assets/images/add.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/tags.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/favorite.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/shopping.png')}
                    style={styles.sidebar}
                />
            </View>

        )
    }

}

const
    styles = StyleSheet.create({
        view: {
            backgroundColor: "#e22565", width: 50, height: 250, marginTop: 50
        },
        sidebar: {
            width: 30, marginTop: 25, marginLeft: 10
        }
    });