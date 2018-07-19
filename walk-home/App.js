import React from 'react';
import { StyleSheet, View} from 'react-native';
import MainContainer from './components/MainContainer';
import { Dimensions } from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
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
    width: Dimensions.get('window').width
  },
});
