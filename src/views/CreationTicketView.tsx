// src/views/CreationTicketView.tsx
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import sapotoAPI from "../api/SapotoAPI";
import { connect } from "react-redux";

/**
 * Formulaire générique d'un ticket
 */
class CreationTicketView extends Component {
	state: any;
	props: any;

	constructor(props: any) {
        super(props);
        this.checkAuth();

		this.state = {
			sujet: "",
			description: "",
			errorMsg: "",
			chargement: false,
		};
	}

	/**
	 * Vérifier si l'utilisateur est authentifié:
	 * - s'il n'est pas authentifié, rediriger vers l'écran d'authentification
	 */
	private checkAuth() {
		if (this.props.token == "") {
			// Supprimer l'historique de navigation et rediriger vers l'écran d'authentification
			this.props.navigation.reset({
				index: 0,
				routes: [{ name: "Signin" }],
			});
		}
	}

	/**
	 * Vérifier que le formulaire est valide:
	 * - si valide, créer le ticket et accéder au dashboard
	 * - si invalide, afficher les messages d'erreur
	 *
	 * @returns { void }
	 */
	private valid() {
		this.setState({ chargement: true });
		let isValid = true; // TODO: validation de formulaire

		if (isValid) {
			// Créer le ticket
			const ticket = {
				sujet: this.state.sujet,
				description: this.state.description,
				demandeur: this.props.userId,
			};

			sapotoAPI.creerTicket(ticket, this.props.token).then((data) => {
				if (!data.error) {
					// Supprimer l'historique de navigation et rediriger vers le dashboard (écran d'accueil avec authentification)
					this.props.navigation.reset({
						index: 0,
						routes: [{ name: "Dashboard" }],
					});
				} else {
					// Afficher les erreurs
					let msg = data.error.message
						? data.error.message
						: data.error;

					msg = msg || "Erreur.";

					this.setState({ errorMsg: msg });
					this.setState({ chargement: false });
				}
			});
		} else {
			// Afficher les erreurs
			this.setState({ errorMsg: "Erreur." });
			this.setState({ chargement: false });
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.input}>
						<Input
							label="Sujet"
							labelStyle={styles.label}
							placeholder="Description courte"
							errorStyle={{ color: "red" }}
							errorMessage={this.state.errorMsg}
							onChangeText={(sujet) => this.setState({ sujet })}
						/>

						<Input
							label="Description"
							labelStyle={styles.label}
							placeholder="Description longue"
							multiline={true}
							numberOfLines={5}
							errorStyle={{ color: "red" }}
							errorMessage={this.state.errorMsg}
							onChangeText={(description) =>
								this.setState({ description })
							}
						/>

						<Button
							title="Valider"
							onPress={() => this.valid()}
							loading={this.state.chargement}
							disabled={this.state.chargement}
						/>
					</View>
				</View>
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
function mapStateToProps(state: any) {
	return {
		token: state.token,
		userId: state.userId,
		userName: state.userName,
	};
}

export default connect(mapStateToProps)(CreationTicketView);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	content: {
		flex: 20,
	},
	input: {
		flex: 1,
		marginTop: 45,
	},
	label: {
		color: "#000000",
	},
});
