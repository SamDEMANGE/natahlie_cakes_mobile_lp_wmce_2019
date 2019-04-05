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
            <View style={{width: '100%', marginTop:20}}>

                <View>
                    <View style={{width: '100%', marginTop:20}}>
                        <Card style={styles.view}>
                            <Text style={styles.content}>Tags : </Text>
                            {this.props.tags.map((item, index) => {
                                return (
                                    <Badge badgeStyle={{padding:15 , backgroundColor: '#e22565' , alignItems: "center",}} status={"primary"} value={<Text style={styles.mini_content}>#{item}</Text>}/>
                                )

                            })
                            }
                            <Text> </Text>
                        </Card>
                    </View>
                </View>

                    {this.props.etapes.map((item, index) => {
                    return (
                        <Card style={styles.view}>
                            <View style={{padding:10, marginBottom: 10}} key={index} >
                                <Text style={styles.content}>Etape {index+1}</Text>
                                <Text>{item}</Text>
                            </View>
                        </Card>
                    )
                })}




            </View>


        );
    }
}


const
    styles = StyleSheet.create({
        view: {
            backgroundColor:'#fbf2c1', marginTop: 30, width:'100%', height:'auto', padding:20
        },
        content: {
            textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565', paddingBottom:20
        },
        mini_content: {
            textAlign: 'center', color: '#000'
        }
    });