import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

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
	const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

	return (
		<View style={styles.container}>
			<Text style={styles.number}>{props.children}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	number: {
		color: Colors.accent,
		fontSize: 22
	}
});

export default GameScreen;
