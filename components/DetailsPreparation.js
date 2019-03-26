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

                        <View key={index} style={{backgroundColor:'#fbf2c1', marginTop: 30, width:225, height:240}}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565'}}>Etape {index+1}</Text>
                            <Text>{item}</Text>
                        </View>
                    )
                })}
            </View>
        );
    }
}