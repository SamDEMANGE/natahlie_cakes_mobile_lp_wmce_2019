import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';





export default class DetailsRecette extends Component {

    static propTypes = {
        ingredients: PropTypes.array.isRequired,
        materiels: PropTypes.array.isRequired,
        nb_parts: PropTypes.number.isRequired,
        nb_parts_init: PropTypes.number.isRequired
    };



    render() {
        return (


                <View style={{width: 300}}>
                <Text style={styles.title}>Ingrédients :</Text>
                    {
                        this.props.ingredients.map((val,i)=>{
                            return(
                                <Text style={styles.content}>{i+1}.  {val.nom} - {(val.qte*this.props.nb_parts)/this.props.nb_parts_init}  {val.mesure}</Text>
                            )
                        })
                    }


                    <Text style={styles.title}> Matériel : </Text>
                    {
                        this.props.materiels.map((val,i)=>{
                            return(
                                <Text style={styles.content}>{i+1}.   {val}</Text>
                            )
                        })
                    }

                </View>




        );
    }
}

const
    styles = StyleSheet.create({
        title: {
            marginTop:20, fontWeight: 'bold', fontSize:20
        },
        content: {
            marginTop: 10
        }
    });