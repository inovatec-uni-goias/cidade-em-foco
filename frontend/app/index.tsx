import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Redirect, SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AppLayout() {
	const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);

	useEffect(() => {
		const checkIfIsLoggedIn = async () => {
			await SplashScreen.preventAutoHideAsync();

			const cpf = await AsyncStorage.getItem('cpf');

			if (cpf) {
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		};

		checkIfIsLoggedIn();
	}, []);

	switch (isLoggedIn) {
		case true:
			return <Redirect href="/(tabs)/complaints" />;
		case false:
			return <Redirect href="/login" />;
		default:
			return (
				<View style={styles.container}>
					<ActivityIndicator color="blue" />
				</View>
			);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignContent: 'center',
		justifyContent: 'center'
	},
	text: {
		textAlign: 'center'
	}
});
