import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button} from 'react-native';
import PropTypes from 'prop-types';





export default class ListeRecettes extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired
    };
    static navigationOptions={
        title: "Accueil",
    };



    render() {

        const {navigate}=this.props.navigation;

        return (
            <View>
                {this.props.items.map((item, index) => {
                    return (
                        <View key={index} style={{backgroundColor:'#fbf2c1', marginTop: 30, width:225, height:240}}
                        >
                            <Button
                                title={"Go to recette 1"}
                                onPress={()=>navigate('Préparation')}
                                >
                            <Image
                                source={{uri: item.image}}
                                style={{width: 225, height: 200, marginLeft:0}}
                            />
                            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize:20, color: '#e22565'}}
                            >{item.nom}</Text>
                            </Button>
                        </View>
                    )
                })}
            </View>
        );
    }
}