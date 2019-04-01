import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, View} from "react-native";
import PropTypes from "prop-types";

export default class Sidebar extends Component {


    static propTypes = {

        nb_recettes: PropTypes.number

    };

    constructor(props){
        super(props);
        //   this.displayDetail=this.displayDetail.bind(this);

    }


    render() {

        return (


            <View style={{backgroundColor: "#e22565", width: 50, height: 280*(this.props.nb_recettes), marginTop: 0, float:'left'}}>
                <Image

                    source={require('../assets/images/add.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/tags.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/favorite.png')}
                    style={styles.sidebar}
                />
                <Image

                    source={require('../assets/images/shopping.png')}
                    style={styles.sidebar}
                />
            </View>

        )
    }

}

const
    styles = StyleSheet.create({
        view: {
            backgroundColor: "#e22565", width: 50, height: 240, marginTop: 0
        },
        sidebar: {
            width: 30, marginTop: 25, marginLeft: 10
        }
    });