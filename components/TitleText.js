import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TitleText = props => {

	return (
		<Text style={{...styles.title, ...props.title}}>{props.children}</Text>
	)
}

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: 'black'
	}
});

export default TitleText;
