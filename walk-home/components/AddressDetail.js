import React from "react";
import { Modal, View, Text, Linking, StyleSheet, Dimensions, Image} from "react-native";
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
    bsColor: PropTypes.string,
    tsColor: PropTypes.string,
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
      mapView: null,
      streetAddress: null,
      regionRE: null
    }

  }

  getZillowInfo() {
    if (this.props.selected) {
          console.log(`getting Zillow info for ${this.props.streetNum}`);
          let zURL = `http://www.zillow.com/webservice/GetSearchResults.htm?address=${this.props.streetNum} ${this.props.streetName}&citystatezip=${this.props.city} ${this.props.state}&zws-id=` + ZAPI_KEY

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
                  let mapView= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].links["0"].mapthishome;
                  let streetAddress= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].address["0"].street;
                  let region= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].localRealEstate["0"].region["0"].$.name;
                  let regType= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].localRealEstate["0"].region["0"].$.type;
                  let regionRE= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].localRealEstate["0"].region["0"].links["0"].forSale
                  let currency= result["SearchResults:searchresults"].response["0"].results["0"].result["0"].zestimate["0"].amount["0"].$.currency;


                  console.log('err', err);
                  this.setState({
                    zestimate: zestimate,
                    lastUpdate: lastUpdate,
                    comparables: comparables,
                    homeDetails: homeDetails,
                    mapView: mapView,
                    streetAddress: streetAddress,
                    regionRE: regionRE,
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
        <View style={styles.zillow}>

          <View style={styles.value}>
            <Text style={styles.zestimate}>Zestimate®: {this.state.zestimate} {this.state.currency}</Text>
            <Text style={styles.detailText}>Last Updated on: {this.state.lastUpdate}</Text>
          </View>

          <View style={styles.location}>

            <View>
              <Text style={styles.link}
                onPress={() => Linking.openURL(`${this.state.mapview}`)}>
                Map this home!
              </Text>
              <Text style={styles.detailText}>Region type: {this.state.regType}</Text>
            </View>

            <View>
              <Text style={styles.detailText}>Located in the {this.state.region} region</Text>
            </View>

          </View>

          <View style={styles.attribution}>

            <View>
              <Text style={styles.link}
                onPress={() => Linking.openURL(`${this.state.homeDetails}`)}>
                See more details for {this.state.streetAddress} on Zillow
              </Text>
            </View>

            <View>
              <Text style={styles.link}
                onPress={() => Linking.openURL(`${this.state.homeDetails}`)}>
                See {this.state.region} Real Estate on Zillow
              </Text>
              <Image source={require('../assets/Zillowlogo_200x50.gif')}/>
            </View>

          </View>

        </View>
      )
    } else {
      zillowData = (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Additional Information Loading...</Text>
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
            <View style={[styles.listItemWalk, {backgroundColor: this.props.wsColor}]}>
              <Text style={styles.scoreLink}
                onPress={() => Linking.openURL(HELPLINK)}
                >Walk Score®: {this.props.walkScore}
              </Text>
              <Text style={styles.detailText}>{this.props.walkDescription}</Text>
            </View>

            <View style={[styles.listItemBike, {backgroundColor: this.props.bsColor}]}>
              <Text style={styles.scoreLink}
                onPress={() => Linking.openURL(HELPLINK)}
                >Bike Score®: {this.props.bikeScore}
              </Text>
              <Text style={styles.detailText}>{this.props.bikeDescription}</Text>
            </View>

            <View style={[styles.listItemTransit, {backgroundColor: this.props.tsColor}]}>
              <Text style={styles.scoreLink}
                onPress={() => Linking.openURL(HELPLINK)}
                >Transit Score®: {this.props.transitScore}
              </Text>
              <Text style={styles.detailText}>{this.props.transitDescription}</Text>
              <Text style={styles.detailText}>{this.props.transitSummary}</Text>
            </View>
          </View>

          {zillowData}

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
  loading: {
    backgroundColor:'#373c51',
    width: (Dimensions.get('window').width*.75),
    borderColor: '#373c51',
    borderWidth: 2,
    borderRadius: 5

  },
  loadingText: {
    color: "#fff",
    fontSize: 25,
    textAlign: 'center'
  },
  address: {
    width: "100%",
    alignItems: 'center',
    paddingBottom: 20
  },
  addressText:{
    color: 'black',
    fontSize: 20,
    textAlign: "center"
  },
  scores: {
    flex: 2,
    width: (Dimensions.get('window').width*.9),
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#373c51'

  },
  listItemWalk: {
    flex: 2,
    width: (Dimensions.get('window').width*.9),
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#373c51',
    alignItems: 'center'
  },
  listItemBike: {
    flex: 2,
    width: (Dimensions.get('window').width*.9),
    flexDirection: 'column',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderColor: '#373c51',
    alignItems: 'center'
  },
  listItemTransit: {
    flex: 3,
    width: (Dimensions.get('window').width*.9),
    flexDirection: 'column',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#373c51',
    alignItems: 'center'
  },
  scoreLink: {
    color: 'blue',
    fontSize: 20
  },
  detailText: {
    fontSize: 16,
    color: '#373c51'
  },
  zillow: {
    flex: 3,
    alignItems: "center",
    width: (Dimensions.get('window').width*.9),
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#373c51'
  },
  value: {
    flex: 1,
    alignItems: "stretch"
  },
  zestimate: {
    fontSize: 20
  },
  // updated: {
  //   fontSize: 16
  // },
  location: {
    flex: 1,
    alignItems: "stretch"
  },
  link: {
    color: 'blue',
    fontSize: 16
  },
  attribution: {
    flex: 1,
    alignItems: "stretch"
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
