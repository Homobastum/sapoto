// src/views/DashboardView.tsx
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import sapotoAPI from "../api/SapotoAPI";
import { connect } from "react-redux";

/**
 * Ecran du tableau de bord (écran d'accueil avec authentification)
 */
class DashboardView extends Component {
	state: any;
	props: any;

	constructor(props: any) {
		super(props);
		this.checkAuth();

		this.state = {
			tickets: []
		};
	}

	componentDidMount () {
		this.getTickets()
	}

	/**
	 * Vérifier si l'utilisateur est authentifié:
	 * - s'il n'est pas authentifié, rediriger vers l'écran d'authentification
	 */
	private checkAuth () {
		if (this.props.token == "") {
			// Supprimer l'historique de navigation et rediriger vers l'écran d'authentification
			this.props.navigation.reset({
				index: 0,
				routes: [{ name: "Signin" }],
			});
		}
	}
	
	/**
	 * Rediriger vers l'écran de création d'un ticket
	 */
	private creationTicket () {
		this.props.navigation.navigate({ name: "CreationTicket" });
	}

	/**
	 * Récupérer tous les tickets
	 */
	private getTickets () {
		sapotoAPI.getTickets(this.props.token).then((data) => {
			if (!data.error) {
				this.setState({ tickets: data });
			}
		});
	}

	/**
	 * Rediriger vers l'écran de modification d'un ticket
	 * 
	 * @param ticket Informations du ticket susmentionné 
	 */
	private modificationTicket (ticket: any) {
		this.props.navigation.navigate("ModificationTicket", { ticketId: ticket._id });
	}

	render() {
		return (
			<View style={styles.container}>
				<Button
					icon={<Icon name="plus" size={15} color="white" />}
					title=" NOUVEAU TICKET"
					onPress={() => this.creationTicket()}
					buttonStyle={styles.button}
				/>
				{this.state.tickets.map((ticket: any, id: string) => (
					<ListItem
						key={id}
						title={ticket.sujet}
						leftIcon={{
							name: "ticket",
							type: "font-awesome",
							color: "#000000",
						}}
						bottomDivider
						chevron
						onPress={() => this.modificationTicket(ticket)}
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
