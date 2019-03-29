import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';





export default class DetailsPreparation extends Component {

    static propTypes = {
        etapes: PropTypes.array.isRequired
    };



    render() {
        return (
            <View>
                {this.props.etapes.map((item, index) => {
                    return (

                        <View key={index} style={styles.view}>
                            <Text style={styles.content}>Etape {index+1}</Text>
                            <Text>{item}</Text>
                        </View>
                    )
                })}
            </View>
        );
    }
}


const
    styles = StyleSheet.create({
        view: {
            backgroundColor:'#fbf2c1', marginTop: 30, width:225, height:240
        },
        content: {
            textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565'
        }
    });