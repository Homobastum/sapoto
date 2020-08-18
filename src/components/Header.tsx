// src/components/Header.tsx
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Header as HeaderElements } from "react-native-elements";
import Home  from "./Home";
import Utilisateur from './Utilisateur';
import Logout from "./Logout";

/**
 * En-tête de l'application
 */
export default class Header extends Component {
    render() {
        return (
			<HeaderElements
                placement="center"                
				containerStyle={ styles.container }
			>
				<Home></Home>
				<Utilisateur></Utilisateur>
				<Logout></Logout>
			</HeaderElements>
		);
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		backgroundColor: "#25A28C",
		justifyContent: "center"
	},
});