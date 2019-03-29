import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

export default class OngletsRecettes extends Component {

    static propTypes = {
        ingr: PropTypes.any,
        prep: PropTypes.any,
        comm: PropTypes.any

    };


    constructor(){
        super();
        //   this.displayDetail=this.displayDetail.bind(this);

    }

    render() {

        return (

            <View>

                <TouchableOpacity
                    onPress={()=>this.props.ingr}>
                    <Text

                        style={styles.onglet}
                    >Ingrédients et matériels</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>this.props.prep}>
                    <Text

                        style={styles.onglet}

                    >Préparation</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>this.props.comm}>
                    <Text

                        style={styles.onglet}

                    >Astuces et commentaires</Text>
                </TouchableOpacity>

            </View>

        )
    }

}

const
    styles = StyleSheet.create({
        onglet: {
            borderColor: '#e22565', borderBottomColor: '#ffffff', padding: 15, textAlign: 'center',
            borderWidth: 3, marginTop: 10, width: 250, marginLeft: 10
        }
    });