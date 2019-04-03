import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements'





export default class ListeRecettes extends Component {

    static propTypes = {
        items: PropTypes.array.isRequired,
        display: PropTypes.any

    };
    static navigationOptions={
        title: "Accueil",
    };

    constructor(){
        super();
     //   this.displayDetail=this.displayDetail.bind(this);

    }



    render() {


        return (
            <View>
                {this.props.items.map((item, index) => {
                    return (
                        <View key={item.id} style={styles.view}>
                            <TouchableOpacity

                                onPress={()=>this.props.display(item.id)}>

                                <Card containerStyle={styles.card} image={{uri: item.image}} imageStyle={styles.image}>
                                    <Text style={styles.content}>
                                        {item.nom}
                                    </Text>
                                </Card>

                            </TouchableOpacity>




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

