import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AddressDetail from './AddressDetail';
import { WSAPI_KEY } from 'react-native-dotenv';


const HELPLINK = "https://www.redfin.com/how-walk-score-works"

class Card extends React.Component {
  static propTypes = {
    streetNum:PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    lat: PropTypes.string.isRequired,
    long: PropTypes.string.isRequired
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
      selectedCard: false,
      wsColor: '#eee',
      bsColor: '#eee',
      tsColor: '#eee'
    }
  }

  getHouseData = () => {
    // let address = `${this.props.streetNum} ${this.props.streetName} ${this.props.streetType}`
    // let cityState= `${this.props.city} ${this.props.state}`
    console.log(`selected card for ${this.props.streetNum}`);
    this.setState({
      selectedCard: true
    })
  }

s
  getWalkScore() {
    let wsURL = `http://api.walkscore.com/score?format=json&address=${this.props.streetNum}%20${this.props.streetName}%20SW%20${this.props.city}%20${this.props.state}&lat=${this.props.lat}&lon=${this.props.long}&transit=1&bike=1&wsapikey=` + WSAPI_KEY

    console.log('starting WS-API CALL');
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
      this.setWalkColor();
      this.setTransitColor();
      this.setBikeColor();
    })
    .catch((error) => {
      console.log('in fetch .. .catch');
      console.log(error);
      this.setState({
        walkScore: 'WS Unavailable'
      });
    });
  }

  setWalkColor() {
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
      wsColor: color
    });
  }

  setBikeColor() {
    let color = '#eee'
    if (this.state.bikeScore < 51) {
      color = '#E0590B'
    } else if ((this.state.bikeScore > 50) && (this.state.bikeScore < 61)) {
      color = '#E0A331'
    } else if ((this.state.bikeScore > 60) && (this.state.bikeScore < 71)) {
      color = '#CEC737'
    } else if ((this.state.bikeScore > 70) && (this.state.bikeScore < 81)) {
      color = '#9ACE5F'
    } else if ((this.state.bikeScore > 80) && (this.state.bikeScore < 91)) {
      color = '#7ECA50'
    } else if (this.state.bikeScore > 90) {
      color = '#0CCA4A'
    }
    this.setState({
      bsColor: color
    });
  }

  setTransitColor() {
    let color = '#eee'
    if (this.state.transitScore < 51) {
      color = '#E0590B'
    } else if ((this.state.transitScore > 50) && (this.state.transitScore < 61)) {
      color = '#E0A331'
    } else if ((this.state.transitScore > 60) && (this.state.transitScore < 71)) {
      color = '#CEC737'
    } else if ((this.state.transitScore > 70) && (this.state.transitScore < 81)) {
      color = '#9ACE5F'
    } else if ((this.state.transitScore > 80) && (this.state.transitScore < 91)) {
      color = '#7ECA50'
    } else if (this.state.transitScore > 90) {
      color = '#0CCA4A'
    }
    this.setState({
      tsColor: color
    });
  }

  componentDidMount() {

    this.getWalkScore();
  }

  requestModalClosed = () => {
    this.setState({
      selectedCard: false
    });
  }

  render() {

    let addressDetail;

    if (this.state.selectedCard) {
      console.log();
      addressDetail = (
        <AddressDetail
          streetNum={this.props.streetNum}
          streetName={this.props.streetName}
          streetType={this.props.streetType}
          city={this.props.city}
          state={this.props.state}
          walkScore={this.state.walkScore}
          walkDescription={this.state.walkDescription}
          bikeScore={this.state.bikeScore}
          bikeDescription={this.state.bikeDescription}
          transitScore={this.state.transitScore}
          transitDescription={this.state.transitDescription}
          transitSummary={this.state.transitSummary}
          selected={this.state.selectedCard}
          wsColor={this.state.wsColor}
          bsColor={this.state.bsColor}
          tsColor={this.state.tsColor}
          onModalClosed={this.requestModalClosed}
          />)
    }

    return (
      <View style={[styles.listItem, {backgroundColor: this.state.wsColor}, {borderColor: this.state.wsColor}]}>
        <TouchableOpacity onPress={this.getHouseData}>
          <View style={styles.walkScore}>
            <Text style={styles.link}
              onPress={() => Linking.openURL(HELPLINK)}
              >Walk Score®: {this.state.walkScore}
            </Text>
          </View>
            <View style={styles.address}>
              <Text style={styles.addressText}>
                {this.props.streetNum} {this.props.streetName} {this.props.streetType}
              </Text>
              <Text style={styles.addressText}>
                {this.props.city} {this.props.state}
              </Text>
            </View>

        </TouchableOpacity>
        {addressDetail}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: (Dimensions.get('window').width*.9),
    flex: 1,
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5
  },
  walkScore: {
    width: "100%",
    alignItems: "center",
    padding: 20
  },
  link: {
    color: 'blue',
    fontSize: 20,
    flexWrap: 'wrap'
  },
  address: {
    width: "100%",
    alignItems: 'center',
    paddingBottom: 20
  },
  addressText:{
    color: 'black',
    fontSize: 18,
    textAlign: "center"
  }
});

export default Card;
