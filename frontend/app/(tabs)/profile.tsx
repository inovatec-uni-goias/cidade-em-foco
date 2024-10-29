import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	StyleSheet,
	Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [cpf, setCpf] = useState('123.456.789-00');
	const [profilePicture, setProfilePicture] = useState<{ uri: string } | null>(
		null
	);
	const router = useRouter();

	useEffect(() => {
		const loadProfileData = async () => {
			const data = await AsyncStorage.multiGet([
				'name',
				'cpf',
				'email',
				'phone'
			]);

			setName(data[0][1] ?? '');
			setCpf(data[1][1] ?? '');
			setEmail(data[2][1] ?? '');
			setPhone(data[3][1] ?? '');
		};

		loadProfileData();
	}, []);

	useEffect(() => {
		loadProfilePicture();
	}, []);

	const loadProfilePicture = async () => {
		try {
			const savedUri = await AsyncStorage.getItem('profilePicture');
			if (savedUri) {
				setProfilePicture({ uri: savedUri });
			}
		} catch (error) {
			console.log('Error loading profile picture:', error);
		}
	};

	const saveProfilePicture = async (uri: string) => {
		try {
			await AsyncStorage.setItem('profilePicture', uri);
			setProfilePicture({ uri });
		} catch (error) {
			console.log('Error saving profile picture:', error);
		}
	};

	const pickProfilePicture = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1
		});

		if (!result.canceled) {
			const selectedUri = result.assets[0].uri;
			setProfilePicture({ uri: selectedUri });
		}
	};

	const formatPhoneNumber = (text: string) => {
		const cleaned = text.replace(/\D/g, '');
		const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
		if (match) {
			return `(${match[1]}) ${match[2]}-${match[3]}`;
		}
		return cleaned.replace(
			/^(\d{2})(\d{0,5})(\d{0,4})$/,
			(m, p1, p2, p3) => `(${p1}) ${p2}${p3 ? '-' + p3 : ''}`
		);
	};

	const handlePhoneChange = (text: string) => {
		setPhone(formatPhoneNumber(text));
	};

	const handleSave = async () => {
		await saveProfilePicture(profilePicture?.uri ?? '');
		await AsyncStorage.setItem('email', email);
		await AsyncStorage.setItem('phone', phone);
		await AsyncStorage.setItem('name', name);

		Alert.alert('Sucesso', 'Seu perfil foi atualizado!');
	};

	const handleLogout = async () => {
		await AsyncStorage.clear();
		router.replace('/');
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Editar Perfil</Text>
			<TouchableOpacity
				onPress={pickProfilePicture}
				style={styles.imageContainer}
			>
				{profilePicture ? (
					<Image
						source={{ uri: profilePicture.uri }}
						style={styles.profileImage}
					/>
				) : (
					<View style={styles.placeholderImage}>
						<Text style={styles.imageText}>Adicionar Foto</Text>
					</View>
				)}
			</TouchableOpacity>
			<TextInput
				style={styles.input}
				placeholder="Nome"
				value={name}
				onChangeText={setName}
			/>
			<TextInput
				style={styles.input}
				placeholder="Email"
				value={email}
				onChangeText={setEmail}
				keyboardType="email-address"
				autoCapitalize="none"
			/>
			<TextInput
				style={styles.input}
				placeholder="CPF"
				value={cpf}
				editable={false} // Makes CPF field uneditable
				selectTextOnFocus={false}
			/>
			<TextInput
				style={styles.input}
				placeholder="Telefone"
				value={phone}
				onChangeText={handlePhoneChange}
				keyboardType="phone-pad"
			/>
			<TouchableOpacity style={styles.saveButton} onPress={handleSave}>
				<Text style={styles.saveButtonText}>Salvar</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={{ ...styles.saveButton, backgroundColor: 'red', marginTop: 10 }}
				onPress={handleLogout}
			>
				<Text style={styles.saveButtonText}>Sair</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#f0f2f5',
		alignItems: 'center'
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 20
	},
	imageContainer: {
		marginBottom: 20,
		borderRadius: 50,
		overflow: 'hidden',
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#ddd'
	},
	profileImage: {
		width: 100,
		height: 100
	},
	placeholderImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	imageText: {
		color: '#888',
		fontSize: 14
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
	saveButton: {
		width: '100%',
		padding: 15,
		backgroundColor: '#2196F3',
		borderRadius: 8,
		alignItems: 'center'
	},
	saveButtonText: {
		color: '#fff',
		fontSize: 16
	}
});
