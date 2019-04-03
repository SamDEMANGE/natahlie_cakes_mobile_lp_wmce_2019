import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

export default class Sidebar extends Component {


    static propTypes = {

        nb_recettes: PropTypes.number

    };

    constructor(props){
        super(props);
    }


    render() {

        return (


            <View style={{backgroundColor: "#e22565", width: 50, height: 280*(this.props.nb_recettes), marginTop: 0, float:'left'}}>



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
                    <Image  source={require('../assets/images/shopping.png')} style={styles.sidebar}/>

                </TouchableOpacity>

            </View>

        )
    }

}

const
    styles = StyleSheet.create({
        view: {
            backgroundColor: "#e22565", width: 50, height: 240, marginTop: 0
        },
        sidebar: {
            width: 30, marginTop: 25, marginLeft: 10
        }
    });