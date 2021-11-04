import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
}

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, userChoice);
	const { userChoice, onGameOver } = props;
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	const [pastGuesses, setPastGuesses] = useState([initialGuess]);
	const currentLow = useRef(1);
	const currentHigh = useRef(100);


	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver])

	const nextGuessHandler = direction => {
		if (
			direction === 'lower' && currentGuess < userChoice ||
			direction === 'greater' && currentGuess > userChoice
		) {
			Alert.alert('Don\'t lie!', 'You know that this is wrong...', [
				{text: 'Sorry!', style: 'cancel'}
			]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
	}

	return (
		<View style={styles.screen}>
			<Text style={styles.number}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
					<Ionicons name="md-remove" size={24} color="white" />
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
					<Ionicons name="md-add" size={24} color="white" />
				</MainButton>
			</Card>
			<ScrollView>
				{pastGuesses.map(guess => {
					return (
						<View key={guess}>
							<Text>{guess}</Text>
						</View>
					)
				})}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		width: 400,
		maxWidth: '90%'
	}
});

export default GameScreen;
