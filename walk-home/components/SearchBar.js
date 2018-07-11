import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from 'prop-types';

export default class App extends React.Component {
  static propTypes = {
    setCityNameCallback: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.state = {
    cityName: ''
    }
  }

  cityNameChangedHandler = (value) => {
    this.setState({
      cityName: value
    });
  };

  onSubmitQuery = () => {
    this.props.setCityNameCallback(this.state.cityName)
        alert(`inside onSubmitQuery - cityName is: ${this.state.cityName}` )
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
        <Button title="Search!" onPress={this.onSubmitQuery}/>
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
