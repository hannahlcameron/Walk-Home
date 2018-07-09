import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MainContainer from './components/MainContainer'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Walk Home!</Text>
        <MainContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
