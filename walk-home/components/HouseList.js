import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
import AddressDetail from './AddressDetail';

// import axios from "react-native-axios";
import house from '../library/addresses.json';

// const house =
// // JSON.parse(JSONData);
// [{
//   "key": 1,
//   "streetNum": "3440",
//   "streetName": "Walnut",
//   "streetType": "Ave SW",
//   "city": "Seattle",
//   "state": "WA",
//   "latitude": 47.5718752,
//   "longitude": -122.3835876
// }];

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  constructor(){
    super();
    this.state= {
      selectedAddress: null,
      selectedCityState: null,
      selectedWalkScore: null,
      selectedWalkDescription: null,
      selectedBikeScore: null,
      selectedBikeDescription: null,
      selectedTransitScore: null,
      selectedTransitDescription: null,
      selectedTransitSummary: null
    };
  }

  setSelectedHouse = (address, cityState, sWS, sWD, sBS, sBD, sTScore, sTD, sTSum ) => {
    this.setState({
      selectedAddress: address,
      selectedCityState: cityState,
      selectedWalkScore: sWS,
      selectedWalkDescription: sWD,
      selectedBikeScore: sBS,
      selectedBikeDescription: sBD,
      selectedTransitScore: sTScore,
      selectedTransitDescription: sTD,
      selectedTransitSummary: sTSum
    });
  }
  requestModalClosed = () => {
    this.setState({
      selectedAddress: null,
      selectedCityState: null
    });
  }


  render() {
    let searchResults;

    if (this.props.cityName === '') {
      searchResults = (
        <View>
          <Text>Enter a city name to get your search going!</Text>
        </View>)

    } else if (this.props.cityName.toLowerCase() === 'seattle') {
      searchResults =(
        <ScrollView style={styles.listContainer}>
          <Card
            streetNum={house[0]["streetNum"]}
            streetName={house[0]["streetName"]}
            streetType={house[0]["streetType"]}
            city={house[0]["city"]}
            state={house[0]["state"]}
            selectedHouseCallback={this.setSelectedHouse}
          />
        </ScrollView>
      )
    } else {
      searchResults = (
        <View>
          <Text>Oops! No houses were found in {this.props.cityName}</Text>
        </View>
      )
    }

    let addressDetail;

    if (this.state.selectedWalkScore !== null) {
      console.log();
      addressDetail = (
        <AddressDetail
          address={this.state.selectedAddress}
          cityState={this.state.selectedCityState}
          walkScore={this.state.selectedWalkScore}
          walkDescription={this.state.selectedWalkDescription}
          bikeScore={this.state.selectedBikeScore}
          bikeDescription={this.state.selectedBikeDescription}
          transitScore={this.state.selectedTransitScore}
          transitDescription={this.state.selectedTransitDescription}
          transitSummary={this.state.selectedTransitSummary}
          onModalClosed={this.requestModalClosed}
          />)

    } else {
      addressDetail = ( <View></View> )
    }

    return (
      <View>
        {addressDetail}
        {searchResults}
      </View>

    )

  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "50%"
  }
});

export default HouseList;

    //   setCardInfo = () => {
    //     let searchResults =(
    //       <ScrollView>
    //         <Card
    //           streetNum={house[0]["streetNum"]}
    //           streetName={house[0]["streetName"]}
    //           streetType={house[0]["streetType"]}
    //           city={house[0]["city"]}
    //           state={house[0]["state"]}
    //           />
    //       </ScrollView> )
    //
    //       return searchResults
    //   }
    //
    //   render() {
    //
    //     let searchResults;
    //
    //     if (this.props.cityName === '') {
    //       searchResults = (
    //         <View>
    //           <Text>Enter a city name to get your search going!</Text>
    //         </View>)
    //
    //     } else if (this.props.cityName.toLowerCase() === 'seattle') {
    //         // took out for loop - throws error about symbol - need to find an alt way
    //         // of looping though the json - for Each?
    //         // for (let address of addressData) {
    //       // [
    //       //   addressData[0].ID,
    //       //   addressData[0].streetNum,
    //       //   addressData[0].streetName,
    //       //   addressData[0].streetType,
    //       //   addressData[0].city,
    //       //   addressData[0].state
    //       // ]
    //

    //
    //     } else {
    //       searchResults = (
    //         <View>
    //           <Text>Oops! No houses were found in {this.props.cityName}</Text>
    //         </View>
    //       )
    //     }
    //
    //     return (searchResults)
    //   }
    // }
