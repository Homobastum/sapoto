// src/components/Logout.tsx
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import rootNavigation from "../nav/RootNavigation";
import { connect } from "react-redux";

/**
 * Bouton de déconnexion (redirection vers l'écran d'authentification)
 */
class Logout extends Component {
    props: any;

    constructor (props: any) {
        super(props);
    }

    /**
     * Rediriger vers l'écran d'authentification
     */
    private deconnecter () {
        // Supprimer les informations d'authentification du state global
        const action = {
            type: 'deleteInfo'
        };
        this.props.dispatch(action);

        if (rootNavigation.getCurrentRoute() != 'Signin') {
            // Supprimer l'historique de navigation et rediriger vers l'écran d'authentification
            rootNavigation.reset("Signin");
        }
    }

    render () {
        return (
            <Icon
                name='sign-out'
                size={24}
                color='#FFFFFF'
                onPress={() => this.deconnecter()}
            />
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
	};
};

export default connect(mapStateToProps)(Logout);

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF'
    }
});