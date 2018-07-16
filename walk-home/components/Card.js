import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import PropTypes from 'prop-types';
import { WSAPI_KEY } from 'react-native-dotenv';


const HELPLINK = "https://www.redfin.com/how-walk-score-works"

class Card extends React.Component {
  static propTypes = {
    streetNum:PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    selectedHouseCallback: PropTypes.func.isRequired
  }

  constructor(){
    super();
    this.state= {
      walkScore: 'walk score loading',
      walkDescription: null,
      bikeScore: null,
      bikeDescription: null,
      transitScore: null,
      transitDescription: null,
      transitSummary: null,
      backgroundColor: '#eee'
    }
  }

  getHouseData = () => {
    console.log('in getHouseData');
    let address = `${this.props.streetNum} ${this.props.streetName} ${this.props.streetType}`
    let cityState= `${this.props.city} ${this.props.state}`
    console.log(`address is ${address} and cityState is ${cityState}`);
    console.log(`WS is ${this.state.walkScore}`);
    this.props.selectedHouseCallback(address, cityState, this.state.walkScore, this.state.walkDescription, this.state.bikeScore, this.state.bikeDescription, this.state.transitScore, this.state.transitDescription, this.state.transitSummary)
  }


  getWalkScore() {
    let wsURL = 'http://api.walkscore.com/score?format=json&address=3440%20Walnut%20Ave%20SW%20Seattle%20WA&lat=47.5718752&lon=-122.3835876&transit=1&bike=1&wsapikey=' + WSAPI_KEY

    console.log('starting API CALL');
    console.log(wsURL);
    return fetch(wsURL)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('in fetch ... .then');
      console.log(responseJson);
      console.log(responseJson.transit);
      console.log(responseJson.bike);
      this.setState({
        walkScore: responseJson.walkscore,
        walkDescription: responseJson.description,
        bikeScore: responseJson.bike.score,
        bikeDescription: responseJson.bike.description,
        transitScore: responseJson.transit.score,
        transitDescription: responseJson.transit.description,
        transitSummary: responseJson.transit.summary
      })
      this.setBackgroundColor()
    })
    .catch((error) => {
      console.log('in fetch .. .catch');
      console.log(error);
      this.setState({
        walkScore: 'WS Unavailable'
      });
    });
  }

  setBackgroundColor() {
    console.log('beginning of setBackgroundColor');
    console.log(this.state.walkScore);
    let color = '#eee'
    if (this.state.walkScore < 51) {
      color = '#E0590B'
    } else if ((this.state.walkScore > 50) && (this.state.walkScore < 61)) {
      color = '#E0A331'
    } else if ((this.state.walkScore > 60) && (this.state.walkScore < 71)) {
      color = '#CEC737'
    } else if ((this.state.walkScore > 70) && (this.state.walkScore < 81)) {
      color = '#9ACE5F'
    } else if ((this.state.walkScore > 80) && (this.state.walkScore < 91)) {
      color = '#7ECA50'
    } else if (this.state.walkScore > 90) {
      color = '#0CCA4A'
    }
    this.setState({
      backgroundColor: color
    });
    console.log('end of setBackgroundColor');
    console.log(this.state.walkScore);
  }

  componentDidMount() {

    this.getWalkScore();
  }

  render() {
    return (
        <TouchableOpacity onPress={this.getHouseData}>
          <View style={[styles.listItem, {backgroundColor: this.state.backgroundColor}]}>
            <Text style={styles.link}
              onPress={() => Linking.openURL(HELPLINK)}
              >Walk Score®: {this.state.walkScore}
            </Text>
          <Text tyle={styles.addressText}>{this.props.streetNum} {this.props.streetName} {this.props.streetType} {this.props.city} {this.props.state}</Text>
          </View>
        </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
  },
  link: {
    color: 'blue'
  },
  addressText:{
    color: 'black'
  }
});

export default Card;
