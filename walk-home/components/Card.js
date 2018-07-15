import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';
import { WSAPI_KEY } from 'react-native-dotenv';

class Card extends React.Component {
  static propTypes = {
    streetNum:PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired

  }

  constructor(){
    super();
    this.state= {
      score: 'walk score loading'
    }
  }

  getHouseData = (event) => {
    console.log('in getHouseData');
    console.log(event);
  }


  getWalkScore() {
    let wsURL = 'http://api.walkscore.com/score?format=json&address=3440%20Walnut%20Ave%20SW%20Seattle%20WA&lat=47.5718752&lon=-122.3835876&wsapikey=' + WSAPI_KEY

    console.log('starting API CALL');
    console.log(wsURL);
    return fetch(wsURL)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('in fetch ... .then');
      console.log(responseJson.walkscore);
      this.setState = {
        score: responseJson.walkscore
      }
    })
    .catch((error) => {
      console.log('in fetch .. .catch');
      console.log(error);
      this.setState({
        score: 'WS Unavailable'
      });
    });
  }

  componentDidMount() {

    this.getWalkScore();
  }

  render() {
    return (
        <TouchableOpacity onPress={this.getHouseData}>
          <View style={styles.listItem}>
            <Text>{this.state.score}</Text>
            <Text>{this.props.streetNum} {this.props.streetName} {this.props.streetType}</Text>
            <Text>{this.props.city} {this.props.state}</Text>
          </View>
        </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee"
  }
});

export default Card;
