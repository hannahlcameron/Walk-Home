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
        // alert(`inside onSubmitQuery - cityName is: ${this.state.cityName}` )
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.textInput}
        placeholder='Enter your desired city'
        placeholderTextColor={'#FFF'}
        value={this.state.cityName}
        onChangeText={this.cityNameChangedHandler}
        />
        <Button
          style={styles.searchButton}
           title="Search!" onPress={this.onSubmitQuery}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "30%",
    width: "100%",
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    borderColor: "black",
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#373c51",
    color: "#FFF"
  },
  searchButton: {
    backgroundColor: "#373c51",
    borderWidth: 2,
    borderColor: "black"
  }
});
