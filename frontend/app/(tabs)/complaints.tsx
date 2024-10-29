import React, { useState } from 'react';
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

export default function ReportIssueScreen() {
	const [address, setAddress] = useState('');
	const [description, setDescription] = useState('');
	const [media, setMedia] = useState<ImagePicker.ImagePickerAsset | null>(null);

	const pickMedia = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			quality: 1
		});

		if (!result.canceled) {
			setMedia(result.assets[0]);
		}
	};

	const handleSubmit = () => {
		if (!address || !description || !media) {
			Alert.alert(
				'Erro',
				'Por favor, preencha todos os campos e anexe uma mídia.'
			);
		} else {
			Alert.alert('Enviado', 'Sua solicitação foi enviada com sucesso!');
			setAddress('');
			setDescription('');
			setMedia(null);
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Reporte um Problema</Text>
			<TextInput
				style={styles.input}
				placeholder="Endereço"
				value={address}
				onChangeText={setAddress}
			/>
			<TextInput
				style={styles.textArea}
				placeholder="Descrição do problema"
				value={description}
				onChangeText={setDescription}
				multiline={true}
			/>
			<TouchableOpacity style={styles.mediaButton} onPress={pickMedia}>
				<Text style={styles.mediaButtonText}>
					{media ? 'Alterar Mídia' : 'Anexar Imagem ou Vídeo'}
				</Text>
			</TouchableOpacity>
			{media && (
				<Image source={{ uri: media.uri }} style={styles.mediaPreview} />
			)}
			<TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
				<Text style={styles.submitButtonText}>Enviar</Text>
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
	input: {
		width: '100%',
		padding: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		marginBottom: 10,
		backgroundColor: '#fff'
	},
	textArea: {
		width: '100%',
		padding: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		marginBottom: 10,
		backgroundColor: '#fff',
		height: 100,
		textAlignVertical: 'top'
	},
	mediaButton: {
		width: '100%',
		padding: 15,
		backgroundColor: '#4CAF50',
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 10
	},
	mediaButtonText: {
		color: '#fff',
		fontSize: 16
	},
	mediaPreview: {
		width: '100%',
		height: 200,
		borderRadius: 8,
		marginTop: 10,
		marginBottom: 20
	},
	submitButton: {
		width: '100%',
		padding: 15,
		backgroundColor: '#2196F3',
		borderRadius: 8,
		alignItems: 'center'
	},
	submitButtonText: {
		color: '#fff',
		fontSize: 16
	}
});
