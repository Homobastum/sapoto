import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from 'react-native';
import { Provider } from "react-redux";
import Store from "./src/store/configureStore";
import { NavigationContainer } from "@react-navigation/native";
import rootNavigation from "./src/nav/RootNavigation";
import Navigation from './src/nav/Navigation';
import Header from "./src/components/Header";

export default function App() {
    return (
		<Provider store={Store}>
			<NavigationContainer ref={rootNavigation.navigationRef}>
				<Header></Header>
				<Navigation></Navigation>
			</NavigationContainer>
		</Provider>
	);
}

const styles = StyleSheet.create({
   
});
