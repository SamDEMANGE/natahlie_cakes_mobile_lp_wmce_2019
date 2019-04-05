import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-material-ui';
import {bdd} from '../database';



export default class DetailsAstucesComms extends Component {

constructor(props){
    super(props);

}





    static propTypes = {
        astuces: PropTypes.array.isRequired,
        commentaires: PropTypes.array.isRequired,
        commentateurs: PropTypes.array
    };



    render() {
        return (

            <View style={{width: '100%',  marginTop:20}}>
                <Card>
                <Text style={styles.title}>  Astuces :</Text>
                {
                    this.props.astuces.map((val,i)=>{
                        return(
                            <Text style={styles.content}>{val} </Text>
                        )
                    })
                }
                </Card>
                <Card>
                <Text style={styles.title}>  Commentaires : </Text>
                {
                    this.props.commentaires.map((val,i)=> {


                        return (
                                                <Text
                                                    style={styles.content}>


                                                    {this.props.commentateurs.filter(({id})=> id === val.user).map(
                                                        (v, ind)=>{
                                                            return <Text style={{fontWeight: 'bold'}}>{v.prenom} {v.nom} :   </Text>
                                                        }
                                                    )}

                                                  {val.contenue}
                                                </Text>
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
            marginTop:20, fontWeight: 'bold', fontSize:25,
        },
        content: {
            marginTop: 10, padding:20
        }
    });