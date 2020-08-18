// src/components/Utilisateur.tsx
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import rootNavigation from "../nav/RootNavigation";
import { connect } from "react-redux";

/**
 * Bouton de redirection vers le tableau de bord (écran d'accueil avec authentification)
 */
class Home extends Component {
    props: any;

    constructor (props: any) {
        super(props);
    }

    /**
     * Rediriger vers le dashboard (écran d'accueil avec authentification)
     */
    private dashboard () {
        if (rootNavigation.getCurrentRoute() != "Signin") {
            rootNavigation.navigate('Dashboard');
        }
    }

    render () {
        return (
            <Icon
                name='home'
                size={24}
                color='#FFFFFF'
                onPress={() => this.dashboard() }
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

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
    text: {
        color: '#FFFFFF'
    }
});