import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export default class Sidebar extends Component {


    constructor(props){
        super(props);
    }


    render() {

        return (


            <View style={styles.view}>


                <TouchableOpacity

                    onPress={()=>this.props.display(1)}>
                    <Image  source={require('../assets/images/add.png')} style={styles.sidebar}/>

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={()=>this.props.display(2)}>
                    <Image  source={require('../assets/images/tags.png')} style={styles.sidebar}/>

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={()=>this.props.display(3)}>
                    <Image  source={require('../assets/images/favorite.png')} style={styles.sidebar}/>

                </TouchableOpacity>
                <TouchableOpacity

                    onPress={()=>this.props.display(4)}>
                    <Image  source={require('../assets/images/shopping.png')} style={styles.sidebar_last}/>

                </TouchableOpacity>

            </View>

        )
    }

}

const
    styles = StyleSheet.create({
        view: {
            backgroundColor: "#e22565", width: 50, marginTop: 0, position: 'absolute', left: 0, top:126,
            borderTopRightRadius: 10, borderBottomRightRadius: 10,

        },
        sidebar: {
            width: 30, marginTop: 20, marginLeft: 10
        },
        sidebar_last: {
            width: 30, marginTop: 20, marginBottom: 20, marginLeft: 10
        }
    });