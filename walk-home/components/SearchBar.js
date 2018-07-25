import React from 'react';
import { StyleSheet, TextInput, View} from 'react-native';
import Button from 'react-native-button';
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
        placeholderTextColor={'#50D0E3'}
        value={this.state.cityName}
        onChangeText={this.cityNameChangedHandler}
        underlineColorAndroid={"transparent"}
        />
        <Button style={styles.searchButton}
          containerStyle={styles.searchButtonContainer}
          onPress={() => this.onSubmitQuery()}>
          Search!
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor:'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: 300,
    borderColor: "#50D0E3",
    borderWidth: 2,
    padding: 10,
    backgroundColor: "#373c51",
    color: "#50D0E3",
    margin: 10
  },
  searchButton: {
    backgroundColor: "#373c51",
    color: "#50D0E3",
  },
  searchButtonContainer: {
    margin: 10,
    padding: 5,
    overflow:'hidden',
    borderRadius: 5,
    backgroundColor: "#373c51",
    borderColor: "#50D0E3",
    borderWidth: 2,
  }
});
