import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SigninView from '../views/SigninView';
import DashboardView from '../views/DashboardView';
// import CreationTicket from '../views/CreationTicketView';
// import ModificationTicket from '../views/ModificationTicketView';
import Home from '../components/Home';
import Logout from '../components/Logout';

const Stack = createStackNavigator();

/**
 * Navigation de l'application
 */
export default class Navigation extends Component {
	render() {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name="Signin"
					component={ SigninView }
					options={{ title: "Se connecter" }}
				/>
				<Stack.Screen
					name="Dashboard"
					component={ DashboardView }
					options={{ title: "Tableau de bord" }}
				/>
				{/* <Stack.Screen
					name="CreationTicket"
					component={ CreationTicketView }
					options={{ title: "Créer un ticket" }}
				/>
				<Stack.Screen
					name="ModificationTicket"
					component={ ModificationTicketView }
					options={{ title: "Modifier un ticket" }}
				/> */}
			</Stack.Navigator>
		);
	}
}
