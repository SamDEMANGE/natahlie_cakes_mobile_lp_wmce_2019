import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';





export default class DetailsAstucesComms extends Component {

    static propTypes = {
        astuces: PropTypes.array.isRequired,
        commentaires: PropTypes.array.isRequired
    };



    render() {
        return (

            <View>
                <Text style={{marginTop:20, fontWeight: 'bold', fontSize:20}}>Astuces :</Text>
                {
                    this.props.astuces.map((val,i)=>{
                        return(
                            <Text style={{marginTop: 10}}>{i+1}.  {val} </Text>
                        )
                    })
                }


                <Text style={{marginTop:20, fontWeight: 'bold', fontSize:20}}> Commentaires : </Text>
                {
                    this.props.commentaires.map((val,i)=>{
                        return(
                            <Text style={{marginTop: 10}}>{val.id}. User {val.user} :    {val.contenue}</Text>
                        )
                    })
                }

            </View>


        );
    }
}