import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card } from 'react-native-material-ui';




export default class DetailsPreparation extends Component {

    static propTypes = {
        etapes: PropTypes.array.isRequired,
        tags: PropTypes.string.isRequired
    };



    render() {
        return (
            <View style={{width: 300}}>
                <Card>
                {this.props.etapes.map((item, index) => {
                    return (

                        <View key={index} style={styles.view}>
                            <Text style={styles.content}>Etape {index+1}</Text>
                            <Text>{item}</Text>
                        </View>
                    )
                })}
                </Card>

                <View>
                    <View style={{width: 300}}>
                        <Card>
                            <Text>Tags : {this.props.tags}</Text>
                        </Card>
                    </View>
                </View>

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