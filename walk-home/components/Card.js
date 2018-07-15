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
      score: 'walk score loading',
      backgroundColor: '#eee'
    }
  }

  getHouseData = () => {
    console.log('in getHouseData');
    let address = `${this.props.streetNum} ${this.props.streetName} ${this.props.streetType}`
    let cityState= `${this.props.city} ${this.props.state}`
    this.props.selectedHouseCallback(address, cityState)
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
      this.setState({
        score: responseJson.walkscore
      })
    })
    .catch((error) => {
      console.log('in fetch .. .catch');
      console.log(error);
      this.setState({
        score: 'WS Unavailable'
      });
    });
  }

  setBackgroundColor() {
    let color = '#eee'
    if (this.state.score < 51) {
      color = '#E0590B'
    } else if ((this.state.score > 50) && (this.state.score < 61)) {
      color = '#E0A331'
    } else if ((this.state.score > 60) && (this.state.score < 71)) {
      color = '#CEC737'
    } else if ((this.state.score > 70) && (this.state.score < 81)) {
      color = '#9ACE5F'
    } else if ((this.state.score > 80) && (this.state.score < 91)) {
      color = '#7ECA50'
    } else if ((this.state.score > 90) && (this.state.score < 101)){
      color = '#0CCA4A'
    }
    this.setState({
      backgroundColor: color
    });
  }

  componentDidMount() {

    this.getWalkScore();
    this.setBackgroundColor();
  }

  render() {
    console.log(this.state.backgroundColor);
    return (
        <TouchableOpacity onPress={this.getHouseData}>
          <View style={[styles.listItem, {backgroundColor: this.state.backgroundColor}]}>
            <Text style={styles.link}
              onPress={() => Linking.openURL(HELPLINK)}
              >Walk Score®: {this.state.score}
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
