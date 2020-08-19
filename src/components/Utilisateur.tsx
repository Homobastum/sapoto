// src/components/Utilisateur.tsx
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

/**
 * Nom de l'utilisateur connecté
 */
class Utilisateur extends Component {
    props: any;

    constructor (props: any) {
        super(props);

        console.log(this.props);
    }

    render () {
        return (
            <Text style={ styles.text }>
                <Icon
                    name='user'
                    size={24}
                    color='#FFFFFF'
                />    {this.props.userName }
            </Text>
        );
    }
}

/**
 * Mapper le state global aux props du component
 * 
 * @param state State global
 * 
 * @returns { void } 
 */
function mapStateToProps (state: any) {
	return {
		token: state.token,
		userId: state.userId,
		userName: state.userName,
	};
};

export default connect(mapStateToProps)(Utilisateur);

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF'
    }
});