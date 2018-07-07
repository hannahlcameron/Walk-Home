import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class App extends React.Component {

  state = {
    cityName: ''
  }

  cityNameChangedHandler = (value) => {
    this.setState({
      cityName: value
    });
  };

  queryCallback = (event) => {
    alert(event);
    console.log(event);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.textInput}
        placeholder='Enter your desired city'
        value={this.state.cityName}
        onChangeText={this.cityNameChangedHandler}
        />
        <Button title="Search!" onPress={this.queryCallback}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    padding: 10
  }
});
