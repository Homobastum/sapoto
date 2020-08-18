// src/components/Utilisateur.tsx
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

/**
 * Nom de l'utilisateur connecté
 */
export default class Utilisateur extends Component {
    state: any;

    constructor (props: any) {
        super(props);
        this.state = { nomUtilisateur: 'Mathieu GONTHIER' };
    }

    render () {
        return (
            <Text style={ styles.text }>
                <Icon
                    name='user'
                    size={24}
                    color='#FFFFFF'
                />    {this.state.nomUtilisateur }
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF'
    }
});