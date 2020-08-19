// src/views/ModificationTicketView.tsx
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import sapotoAPI from "../api/SapotoAPI";
import { connect } from "react-redux";

/**
 * Formulaire générique d'un ticket
 */
class ModificationTicketView extends Component {
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

	componentDidMount() {
		this.getTicketById();
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
	 * Récupérer les informations du ticket à modifier
	 */
	getTicketById() {
		sapotoAPI
			.getTicketById(this.props.route.params.ticketId, this.props.token)
			.then((data) => {
				if (!data.error) {
					this.setState({
						sujet: data.sujet,
						description: data.description,
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
	}

	/**
	 * Vérifier que le formulaire est valide:
	 * - si valide, modifier le ticket et accéder au dashboard
	 * - si invalide, afficher les messages d'erreur
	 *
	 * @returns { void }
	 */
	private update() {
		this.setState({ chargement: true });
		let isValid = true; // TODO: validation de formulaire

		if (isValid) {
			// Modifier le ticket
			const ticket = {
				sujet: this.state.sujet,
				description: this.state.description,
				demandeur: this.props.userId,
			};

			sapotoAPI
				.updateTicket(this.props.route.params.ticketId, ticket, this.props.token)
				.then((data) => {
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

	/**
	 * Vérifier que le formulaire est valide:
	 * - si valide, supprimer le ticket et accéder au dashboard
	 * - si invalide, afficher les messages d'erreur
	 *
	 * @returns { void }
	 */
	private delete() {
		this.setState({ chargement: true });
		let isValid = true; // TODO: validation de formulaire

		if (isValid) {
			sapotoAPI
				.deleteTicketById(this.props.route.params.ticketId, this.props.token)
				.then((data) => {
                    console.log(data);
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
							value={this.state.sujet}
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
							value={this.state.description}
						/>

						<Button
							title="Valider"
							onPress={() => this.update()}
							loading={this.state.chargement}
							disabled={this.state.chargement}
						/>
						<Button
							title="Supprimer"
							onPress={() => this.delete()}
							loading={this.state.chargement}
							disabled={this.state.chargement}
							buttonStyle={styles.buttonDanger}
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

export default connect(mapStateToProps)(ModificationTicketView);

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
	buttonDanger: {
		backgroundColor: "red",
	},
});
