// src/views/SigninView.tsx
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import sapotoAPI from "../api/SapotoAPI";
import { connect } from "react-redux";

/**
 * Ecran d'authentification
 */
class SigninView extends Component {
	state: any;
	props: any;

	constructor (props: any) {
		super(props);

		this.state = {
			email: '',
			password: '',
			errorMsg: '',
			chargement: false
		}
	}

	/**
	 * Vérifier que le formulaire est valide:
	 * - si valide, authentifier l'utilisateur et accéder au dashboard
	 * - si invalide, afficher les messages d'erreur
	 * 
	 * @returns { void }
	 */
	private valid () {
		this.setState({ chargement: true });
		let isValid = true; // TODO: validation de formulaire

		if (isValid) {
			// Authentifier l'utilisateur
			const utilisateur = {
				email: this.state.email,
				password: this.state.password
			};

			sapotoAPI.signin(utilisateur).then((data) => {
				console.log(data);
				if (!data.error) {
					// Enregistrer les informations d'authentification dans le state global
					const action = {
						type: "setInfo",
						value: data,
					};
					this.props.dispatch(action);

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
                    
                    msg = msg || 'Erreur.';
                    
					this.setState({ errorMsg: msg });
					this.setState({ chargement: false });
				}
			});
		} else {
			// Afficher les erreurs
			this.setState({ errorMsg: 'Erreur.' });
			this.setState({ chargement: false });
		}
	}

    render () {
        return (
			<View style={styles.container}>
				<View style={styles.content}>
					<View style={styles.input}>
						<Input
							label="Adresse e-mail"
							labelStyle={styles.label}
							placeholder="toto@exemple.fr"
							leftIcon={
								<Icon name="envelope" size={24} color="black" />
							}
							errorStyle={{ color: "red" }}
							errorMessage={this.state.errorMsg}
							onChangeText={(email) => this.setState({ email })}
						/>

						<Input
							label="Mot de passe"
							labelStyle={styles.label}
							secureTextEntry={true}
							leftIcon={
								<Icon name="key" size={24} color="black" />
							}
							errorStyle={{ color: "red" }}
							errorMessage={this.state.errorMsg}
							onChangeText={(password) =>
								this.setState({ password })
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
function mapStateToProps (state: any) {
	return {
		token: state.token,
		userId: state.userId,
		userName: state.userName,
	};
};

export default connect(mapStateToProps)(SigninView);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 20,
    },
    input: {
        flex: 1,
        marginTop: 45
	},
	label: {
		color: '#000000'
	}
});