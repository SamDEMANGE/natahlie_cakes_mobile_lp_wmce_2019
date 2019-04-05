import React, { Component } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements'
import { ListItem } from 'react-native-elements'
import { Button } from 'react-native-elements';





export default class ListeIngredients extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        delete: PropTypes.any

    };
    static navigationOptions={
        title: "Accueil",
    };

    constructor(props){
        super(props);

    }

    state = {
        ingredients : this.props.items,
    };



    render() {


        return (
            <View style={styles.list} >

                {
                    this.state.ingredients.map((ingr) => (
                        <Card>
                            {
                                    ingr[2]
                                    ? <ListItem
                                            key={ingr[1]}
                                            title={ingr[1] + ":     " + ingr[2] + " " + ingr[0]}

                                        />
                                    : <ListItem
                                            key={ingr[0]}
                                            title={ingr[0] + ":     "  + ingr[1]}

                                        />
                            }

                        </Card>
                    ))
                }

            </View>
        );
    }
}


const
    styles = StyleSheet.create({
        list: {
            marginLeft: 45,
        },
        view: {
            marginTop: 30, width:'100%'
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

