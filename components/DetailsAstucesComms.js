import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from 'react-native-material-ui';
import {bdd} from '../database';



export default class DetailsAstucesComms extends Component {

constructor(props){
    super(props);
this.users=[];
}






    static propTypes = {
        astuces: PropTypes.array.isRequired,
        commentaires: PropTypes.array.isRequired
    };



    render() {
        return (

            <View style={{width: 300}}>
                <Card>
                <Text style={styles.title}>Astuces :</Text>
                {
                    this.props.astuces.map((val,i)=>{
                        return(
                            <Text style={styles.content}>{i+1}.  {val} </Text>
                        )
                    })
                }
                </Card>
                <Card>
                <Text style={styles.title}> Commentaires : </Text>
                {
                    this.props.commentaires.map((val,i)=> {
                        bdd.ref('Utilisateurs/user_' + val.user).once('value', (snapshot) => {
                            let data = snapshot.val();
                            this.users.push(data);
                           // console.log(data);

                        });

                        console.log(this.users);

                        //    console.log(this.props.commentaires);






                        return (
                                                <Text
                                                    style={styles.content}>{val.id}.




                                                 : {val.contenue}</Text>
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
            marginTop:20, fontWeight: 'bold', fontSize:20
        },
        content: {
            marginTop: 10
        }
    });