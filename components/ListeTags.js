import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements'


export default class ListeTags extends Component {

    static propsTypes={

        tags: PropTypes.array

    };

    static navigationOptions={
        title: "Tags",
    };


    constructor(props){
        super(props);
        //   this.displayDetail=this.displayDetail.bind(this);
        this.cleanDoublons=this.cleanDoublons.bind(this);
        this.hashtags=[];
    }

    cleanDoublons(array) {
        /* let i, j, len = array.length, out = [], obj = {};
         for (i = 0; i < len; i++) {
             obj[array[i]] = 0;
         }
         for (j in obj) {
             out.push(j);
         }
         return out;*/



    }


    render()

    {



            this.props.tags.map(
                (item, index)=>{
                    this.hashtags.push(Object.values(item.tags));
                    console.log(Object.values(item.tags));
                }
            );


        return (
            <View>
                {this.props.tags.map((item, index) => {

                    return (
                        <View style={styles.view}>
                            {

                                Object.values(item.tags).map((value, index)=>{

                                    return(
                                        <Card containerStyle={styles.card}>
                                            <Text style={styles.content}>
                                                {index} {value}
                                            </Text>
                                        </Card>
                                    )
                                })
                            }



                        </View>


                    )
                })}
            </View>
        );
    }
}



const
    styles = StyleSheet.create({
        view: {
            marginTop: 30, width:'100%',
        },
        image: {
            width:'100%', height:250, marginLeft:0
        },
        card:{
            backgroundColor:'#fbf3c2'
        },
        content: {
            textAlign: 'center', fontWeight: 'bold', fontSize:25, color: '#e22565',
            marginBottom:10,
        }
    });





