import React from "react";
import { Modal, View, Text, Button, Linking, StyleSheet} from "react-native";
import PropTypes from 'prop-types';
import { ZAPI_KEY } from 'react-native-dotenv';

const parseString = require('react-native-xml2js').parseString;
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

  constructor() {
    super();
    this.state = {
      zestimate: null,
      lastUpdate: null,
      comparables: null,
      homeDetails: null,
      region: null,
      regType: null,
      currency: null
    }
  }

  getZillowInfo() {
    if (this.props.selected) {
          console.log(`getting Zillow info for ${this.props.streetNum}`);
          let zURL = 'http://www.zillow.com/webservice/GetSearchResults.htm?address=3440%20Walnut%20Ave%20SW%20&citystatezip=Seattle%20WA&zws-id=' + ZAPI_KEY

          console.log('starting Z-API CALL');
          console.log(zURL);

          return fetch(zURL)
          .then(response => response.text())
          .then((response) => {
              parseString(response, function (err, result) {
                  console.log('result');
                  console.log(result);
                  let zestimate = result['SearchResults:searchresults'].response['0'].results['0'].result['0'].zestimate['0'].amount['0']._;
                  console.log('err', err);
                  this.setState({
                    zestimate: zestimate
                  })
              });
          })
          .catch((err) => {
              console.log('fetch', err)
          })
    }
  }

  componentDidMount() {
    // Typical usage (don't forget to compare props):
      this.getZillowInfo();
  }

  render() {

    let zillowData;

    if (this.state.zestimate ) {
      zillowData = (
        <View>
          <Text>Zestimate®: {this.state.zestimate}</Text>
        </View>
      )
    }

    let modalContent;

    if (this.props.selected) {
      modalContent = (
        <View>
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
          <View>
            {zillowData}
          </View>
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
