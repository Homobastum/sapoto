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

		this.state = {
			objet: "",
			description: "",
			errorMsg: "",
			chargement: false,
		};
	}

	/**
	 * Vérifier que le formulaire est valide:
	 * - si valide, accéder au dashboard
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
				email: this.state.objet,
                description: this.state.description,
                demandeur: this.props.userId
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
					this.setState({ errorMsg: data.error });
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
							label="Objet"
							labelStyle={styles.label}
							placeholder="Description courte"
							leftIcon={
								<Icon name="envelope" size={24} color="black" />
							}
							errorStyle={{ color: "red" }}
							errorMessage={this.state.errorMsg}
							onChangeText={(objet) => this.setState({ objet })}
						/>

						<Input
							label="Description"
							labelStyle={styles.label}
							placeholder="Description longue"
							multiline={true}
							numberOfLines={5}
							leftIcon={
								<Icon name="envelope" size={24} color="black" />
							}
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
