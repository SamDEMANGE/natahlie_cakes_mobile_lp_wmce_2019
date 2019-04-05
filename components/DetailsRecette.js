import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-material-ui';




export default class DetailsRecette extends Component {

    static propTypes = {
        ingredients: PropTypes.array.isRequired,
        materiels: PropTypes.array.isRequired,
        nb_parts: PropTypes.number.isRequired,
        nb_parts_init: PropTypes.number.isRequired
    };



    render() {
        return (


                <View style={{width: '100%',  marginTop:20}}>
                    <Card >
                        <Text style={styles.title}>Ingrédients :</Text>
                        {
                            this.props.ingredients.map((val,i)=>{
                                return(
                                    <Text style={styles.content}>  {val.nom}: {parseInt(val.qte + 1)}  {val.mesure}</Text>
                                )
                            })
                        }
                    </Card>
                    <Card>
                    <Text style={styles.title}> Matériel : </Text>
                    {
                        this.props.materiels.map((val,i)=>{
                            return(
                                <Text style={styles.content}>   {val}</Text>
                            )
                        })
                    }
                    </Card>
                </View>




        );
    }
}

const
    styles = StyleSheet.create({
        title: {
            marginTop:10, fontWeight: 'bold', fontSize:25, padding:10, marginBottom:10
        },
        content: {
            marginTop: 10, padding:10
        }
    });