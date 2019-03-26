import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';





export default class DetailsRecette extends Component {

    static propTypes = {
        ingredients: PropTypes.array.isRequired,
        materiels: PropTypes.array.isRequired
    };



    render() {
        return (


                <View>
                <Text style={{marginTop:20, fontWeight: 'bold', fontSize:20}}>Ingrédients :</Text>
                    {
                        this.props.ingredients.map((val,i)=>{
                            return(
                                <Text style={{marginTop: 10}}>{i+1}.  {val.qte} ---- {val.nom}</Text>
                            )
                        })
                    }


                    <Text style={{marginTop:20, fontWeight: 'bold', fontSize:20}}> Matériel : </Text>
                    {
                        this.props.materiels.map((val,i)=>{
                            return(
                                <Text style={{marginTop: 10}}>{i+1}.   {val}</Text>
                            )
                        })
                    }

                </View>




        );
    }
}