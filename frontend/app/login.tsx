import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SplashScreen, useRouter } from 'expo-router';

export default function Login() {
	const [cpf, setCpf] = useState('');
	const [name, setName] = useState('');
	const [cpfError, setCpfError] = useState('');
	const router = useRouter();

	const validateCPF = (cpf: string) => {
		cpf = cpf.replace(/[^\d]+/g, '');
		if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
		let sum = 0,
			remainder;
		for (let i = 1; i <= 9; i++)
			sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
		remainder = (sum * 10) % 11;
		if (remainder === 10 || remainder === 11) remainder = 0;
		if (remainder !== parseInt(cpf.substring(9, 10))) return false;
		sum = 0;
		for (let i = 1; i <= 10; i++)
			sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
		remainder = (sum * 10) % 11;
		if (remainder === 10 || remainder === 11) remainder = 0;
		return remainder === parseInt(cpf.substring(10, 11));
	};

	const handleLogin = async () => {
		if (!validateCPF(cpf)) {
			setCpfError('CPF inválido');
		} else {
			setCpfError('');

			await AsyncStorage.setItem('name', name);
			await AsyncStorage.setItem('cpf', cpf);

			router.replace('/(tabs)/complaints');
		}
	};

	const formatCpf = (text: string) => {
		const cleaned = text.replace(/\D/g, ''); // Remove any non-numeric characters
		const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
		if (match) {
			return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
		}
		return cleaned.replace(
			/^(\d{3})(\d{0,3})(\d{0,3})(\d{0,2})$/,
			(m, p1, p2, p3, p4) =>
				`${p1}${p2 ? '.' + p2 : ''}${p3 ? '.' + p3 : ''}${p4 ? '-' + p4 : ''}`
		);
	};

	const handleCpfChange = (text: string) => {
		setCpf(formatCpf(text));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				style={[styles.input, cpfError ? styles.inputError : null]}
				placeholder="CPF"
				value={cpf}
				onChangeText={handleCpfChange}
				keyboardType="numeric"
				maxLength={14}
			/>
			{cpfError ? <Text style={styles.error}>{cpfError}</Text> : null}
			<TextInput
				style={styles.input}
				placeholder="Nome"
				value={name}
				onChangeText={setName}
			/>
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Entrar</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f0f2f5',
		padding: 20
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20
	},
	input: {
		width: '100%',
		padding: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		marginBottom: 10,
		backgroundColor: '#fff'
	},
	inputError: {
		borderColor: 'red'
	},
	error: {
		width: '100%',
		color: 'red',
		fontSize: 14,
		marginBottom: 10,
		textAlign: 'left'
	},
	button: {
		width: '100%',
		padding: 15,
		backgroundColor: '#4CAF50',
		borderRadius: 8,
		alignItems: 'center'
	},
	buttonText: {
		color: '#fff',
		fontSize: 16
	}
});
