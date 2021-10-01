import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
	const [enteredValue, setEnterValue] = useState('');
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState('');

	const numberInputHandler = (inputText) => {
		setEnterValue(inputText.replace(/[^0-9]/g, ''));
	};

	const resetInputHandler = () => {
		setEnterValue('');
		setConfirmed(false);
	}

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				'Invalid number!',
				'Number has to be a number between 0 and 99.',
				[{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
			);
			return;
		}
		setConfirmed(true);
		setEnterValue('');
		setSelectedNumber(chosenNumber);
		Keyboard.dismiss();
	}

	const dismissKeyboardHandler = () => Keyboard.dismiss();

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput =
			<Card style={styles.summaryContainer}>
				<Text>You selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<Button title="START GAME" />
			</Card>
	}

	return (
		<TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
			<View style={styles.screen}>
				<Text style={styles.title}>Start a New Game!</Text>

				<Card style={styles.inputContainer}>
					<Text>Select a Number</Text>
					<Input
						style={styles.input}
						blurOnSubmit
						autoCapitalize="none"
						keyboardType="number-pad"
						maxLength={2}
						onChangeText={numberInputHandler}
						value={enteredValue}
					/>
					<View style={styles.buttonContainer}>
						<View style={styles.button}>
							<Button
								title="Reset"
								onPress={resetInputHandler}
								color={Colors.accent}
							/>
						</View>
						<View style={styles.button}>
							<Button
								title="Confirm"
								onPress={confirmInputHandler}
								color={Colors.primary}
							/>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
	},
	title: {
		fontSize: 20,
		marginVertical: 10
	},
	inputContainer: {
		width: 300,
		maxWidth: '80%',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		width: 100
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	}
});

export default StartGameScreen;
