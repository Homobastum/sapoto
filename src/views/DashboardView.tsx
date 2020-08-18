// src/views/DashboardView.tsx
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";

/**
 * Ecran du tableau de bord (écran d'accueil avec authentification)
 */
class DashboardView extends Component {
	tickets = [
		{
			title: 'Appointments',
		},
		{
			title: 'Trips',
		}
	]
	props: any;
	
	constructor (props: any) {
		super(props);
		this.checkAuth();
	}

	/**
	 * Vérifier si l'utilisateur est authentifié:
	 * - s'il n'est pas authentifié, rediriger vers l'écran d'authentification
	 */
	private checkAuth () {
		if (this.props.token == '') {
			// Supprimer l'historique de navigation et rediriger vers l'écran d'authentification
			this.props.navigation.reset({
				index: 0,
				routes: [{ name: 'Signin' }],
			});
		}
	}

	private creerTicket () {
		// Rediriger vers l'écran de création d'un ticket
		this.props.navigation.reset({
			index: 0,
			routes: [{ name: 'CreationTicket' }],
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					icon={<Icon name="plus" size={15} color="white" />}
					title=" NOUVEAU TICKET"
					onPress={() => this.creerTicket()}
					buttonStyle = {styles.button}
				/>
				{this.tickets.map((ticket, id) => (
					<ListItem
						key={id}
						title={ticket.title}
						leftIcon={{
							name: "ticket",
							type: "font-awesome",
							color: "#000000",
						}}
						bottomDivider
						chevron
					/>
				))}
			</View>
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

export default connect(mapStateToProps)(DashboardView);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	button: {
		backgroundColor: "#B5DB2D"
	},
});
