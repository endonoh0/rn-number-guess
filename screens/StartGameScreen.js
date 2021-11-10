import React, { useState } from 'react';
import { View, StyleSheet, Button, Keyboard, TouchableWithoutFeedback, Alert, Dimensions } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import BodyText from '../components/BodyText';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

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
				<BodyText>You selected</BodyText>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
	}

	return (
		<TouchableWithoutFeedback onPress={dismissKeyboardHandler}>
			<View style={styles.screen}>
				<TitleText title={styles.title}>Start a New Game!</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText>Select a Number</BodyText>
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
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		width: 300,
		minWidth: '80%',
		maxWidth: '95%',
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 15
	},
	button: {
		// width: 100,
		// width: '40%'
		width: Dimensions.get('window').width / 4
	},
	input: {
		width: 50,
		textAlign: 'center'
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: 'center'
	},
	text: {
		fontFamily: 'open-sans'
	}
});

export default StartGameScreen;
