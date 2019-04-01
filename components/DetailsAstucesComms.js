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

            <View style={{width: 300}}>
                <Text style={styles.title}>Astuces :</Text>
                {
                    this.props.astuces.map((val,i)=>{
                        return(
                            <Text style={styles.content}>{i+1}.  {val} </Text>
                        )
                    })
                }


                <Text style={styles.title}> Commentaires : </Text>
                {
                    this.props.commentaires.map((val,i)=>{
                        return(
                            <Text style={styles.content}>{val.id}. User {val.user} :    {val.contenue}</Text>
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