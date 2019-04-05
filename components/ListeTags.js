import React, { Component } from 'react';
import {  View, Text, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import { Card, Icon } from 'react-native-elements'


export default class ListeTags extends Component {

    static propsTypes={

        tags: PropTypes.array,
        display: PropTypes.any

    };

    static navigationOptions={
        title: "Tags",
    };


    constructor(props){
        super(props);

    }


    render() {

        return(
            <View>
        {this.props.tags.map((item, index) => {
            return (
                <View style={styles.view}>
                    <TouchableOpacity
                        onPress={()=>this.props.display(item)}>


                        <Card containerStyle={styles.card}>
                            <Text style={styles.content}>
                                #{item}
                            </Text>
                        </Card>

                    </TouchableOpacity>




                </View>


            )
        })}
            </View>
    )
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





