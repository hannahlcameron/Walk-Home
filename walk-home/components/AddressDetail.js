import React from "react";
import { Modal, View, Text, Linking, StyleSheet, Dimensions} from "react-native";
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import { ZAPI_KEY } from 'react-native-dotenv';

const parseString = require('react-native-xml2js').parseString;
const HELPLINK = 'https://www.redfin.com/how-walk-score-works'

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
    wsColor: PropTypes.string,
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
      currency: null,

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
              parseString(response, (err, result) => {
                  console.log('result');
                  console.log(result);
                  let zestimate = result['SearchResults:searchresults'].response['0'].results['0'].result['0'].zestimate['0'].amount['0']._;
                  let lastUpdate= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].zestimate["0"]["last-updated"]["0"];
                  let comparables= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].links["0"].comparables;
                  let homeDetails= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].links["0"].homedetails;
                  let region= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].localRealEstate["0"].region["0"].$.name;
                  let regType= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].localRealEstate["0"].region["0"].$.type;
                  let currency= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].zestimate["0"].amount["0"].$.currency;

                  console.log('err', err);
                  this.setState({
                    zestimate: zestimate,
                    lastUpdate: lastUpdate,
                    comparables: comparables,
                    homeDetails: homeDetails,
                    region: region,
                    regType: regType,
                    currency: currency,
                  });

              });
          })
          .catch((err) => {
              console.log(err)
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
          <Text>Zestimate®: {this.state.zestimate} {this.state.currency}</Text>
          <Text>Last Updated on: {this.state.lastUpdate}</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(`${this.state.comparables}`)}>
            Compare to similar houses
          </Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(`${this.state.homeDetails}`)}>
            Find out home details
          </Text>
          <Text>Located in the {this.state.region} region</Text>
          <Text>Region type: {this.state.regType}</Text>
        </View>
      )
    }

    let modalContent;

    if (this.props.selected) {
      modalContent = (
        <View style={styles.modal}>

          <View style={styles.address}>
            <Text style={styles.addressText}>
              {this.props.streetNum} {this.props.streetName} {this.props.streetType} {this.props.city} {this.props.state}
            </Text>
          </View>

          <View style={styles.scores}>
            <View style={[styles.listItem, {backgroundColor: this.props.wsColor}, {borderColor: this.state.wsColor}]}>
              <Text style={styles.link}
                onPress={() => Linking.openURL(HELPLINK)}
                >Walk Score®: {this.props.walkScore}
              </Text>
              <Text>{this.props.walkDescription}</Text>
            </View>

            <View style={[styles.listItem, {backgroundColor: this.state.wsColor}, {borderColor: this.state.wsColor}]}>
              <Text style={styles.link}
                onPress={() => Linking.openURL(HELPLINK)}
                >Bike Score®: {this.props.bikeScore}
              </Text>
              <Text>{this.props.bikeDescription}</Text>
            </View>

            <View style={[styles.listItem, {backgroundColor: this.state.wsColor}, {borderColor: this.state.wsColor}]}>
              <Text style={styles.link}
                onPress={() => Linking.openURL(HELPLINK)}
                >Transit Score®: {this.props.transitScore}
              </Text>
              <Text>{this.props.transitDescription}</Text>
              <Text>{this.props.transitSummary}</Text>
            </View>
          </View>

          <View style={styles.zillow}>
            {zillowData}
          </View>

        </View>

      )
    }

    return(
      <Modal visible={this.props.selected} onRequestClose={this.props.onModalClosed}>
        <View style={styles.modalContainer}>
          {modalContent}
          <View style={styles.buttonContainer}>
            <Button style={styles.closeButton}
              containerStyle={styles.closeButtonContainer}
              onPress={() => this.props.onModalClosed()}>
              Return to Results
            </Button>
          </View>
        </View>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  modalContainer: {
    margin: 22,
    height: "100%"
  },
  modal: {
    height: "90%"
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
  },
  scores: {
    flex: 3,
    width: (Dimensions.get('window').width*.9),
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20

  },
  listItem: {
    width: (Dimensions.get('window').width*.9),
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5
  },
  link: {
    color: 'blue'
  },
  zillow: {
    flex: 3
  },
  buttonContainer: {
    height: "10%"
  },
  closeButton: {
    backgroundColor: "#373c51",
    color: "#FFF"
  },
  closeButtonContainer: {
    padding: 10,
    overflow:'hidden',
    borderRadius: 5,
    backgroundColor: "#373c51"
  }
});

export default AddressDetail;
