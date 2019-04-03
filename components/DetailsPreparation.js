import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card } from 'react-native-material-ui';
import {Badge } from 'react-native-elements';





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
                            <Text style={styles.content}>Tags : </Text>
                            {this.props.tags.map((item, index) => {
                                return (
                                    <Badge status={"warning"} value={<Text style={styles.mini_content}>#{item}</Text>}/>
                                )

                            })
                            }

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
            textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565', marginTop: 8
        },
        mini_content: {
            textAlign: 'center', color: '#000'
        }
    });