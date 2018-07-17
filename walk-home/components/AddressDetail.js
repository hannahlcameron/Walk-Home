import React from "react";
import { Modal, View, Text, Button, Linking, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import { ZAPI_KEY } from 'react-native-dotenv';

const HELPLINK = "https://www.redfin.com/how-walk-score-works"

// const walkBadgeURL = 'https://www.walkscore.com/badge/bike/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'
//
// const bikeBadgeURL = 'https://www.walkscore.com/badge/bike/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'
// const transitBadgeURL = 'https://www.walkscore.com/badge/transit/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'

class AddressDetail extends React.Component {
  static propTypes = {
    streetNum: PropTypes.string,
    streetName: PropTypes.string,
    streetType: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    walkScore: PropTypes.number,
    walkDescription: PropTypes.string,
    bikeScore: PropTypes.number,
    bikeDescription: PropTypes.string,
    transitScore: PropTypes.number,
    transitDescription: PropTypes.string,
    transitSummary: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onModalClosed: PropTypes.func.isRequired
  }

  getZillowInfo() {
    if (this.props.selected) {
          console.log(`getting Zillow info for ${this.props.streetNum}`);
          let zURL = 'http://www.zillow.com/webservice/GetSearchResults.htm?address=3440%20Walnut%20Ave%20SW%20&citystatezip=Seattle%20WA&zws-id=' + ZAPI_KEY

          console.log('starting Z-API CALL');
          console.log(zURL);
          return fetch(zURL)
          .then((response) => {
            console.log('in fetch ... .then');
            console.log(response);
          // .then((responseJson) => {
          //   console.log('in fetch ... .then');
          //   console.log(responseJson);
          //   console.log(responseJson.transit);
          //   console.log(responseJson.bike);
          //   this.setState({
          //     walkScore: responseJson.walkscore,
          //     walkDescription: responseJson.description,
          //     bikeScore: responseJson.bike.score,
          //     bikeDescription: responseJson.bike.description,
          //     transitScore: responseJson.transit.score,
          //     transitDescription: responseJson.transit.description,
          //     transitSummary: responseJson.transit.summary
          //   })
          //   this.setBackgroundColor()
          })
          .catch((error) => {
            console.log('in fetch .. .catch');
            console.log(error);
            // this.setState({
            //   walkScore: 'WS Unavailable'
            // });
          });
    }
  }

  render() {

    this.getZillowInfo();

    let modalContent;

    if (this.props.selected) {
      modalContent = (
        <View>
          <Text style={styles.addressText}>
            {this.props.streetNum} {this.props.streetName} {this.props.streetType} {this.props.city} {this.props.state}
          </Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Walk Score®: {this.props.walkScore}
          </Text>
          <Text>{this.props.walkDescription}</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Bike Score®: {this.props.bikeScore}
          </Text>
          <Text>{this.props.bikeDescription}</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Transit Score®: {this.props.transitScore}
          </Text>
          <Text>{this.props.transitDescription}</Text>
          <Text>{this.props.transitSummary}</Text>
        </View>
      )
    }

    return(
      <Modal visible={this.props.selected} onRequestClose={this.props.onModalClosed}>
        <View style={styles.modalContainer}>
          {modalContent}
          <View>
            <Button
              style={styles.button}
              title='Close'
              onPress={this.props.onModalClosed}
              />
          </View>
        </View>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    color: 'pink'
  },
  modalContainer: {
    margin: 22
  }
});

export default AddressDetail;
