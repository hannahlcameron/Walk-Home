import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
import { WSAPI_KEY } from 'react-native-dotenv';
// import axios from "react-native-axios";
// import JSONData from './library/addresses.JSON';

const house =
// JSON.parse(JSONData);
[{
  "key": 1,
  "streetNum": "3440",
  "streetName": "Walnut",
  "streetType": "Ave SW",
  "city": "Seattle",
  "state": "WA",
  "latitude": 47.5718752,
  "longitude": -122.3835876
}];

const wsURL = 'http://api.walkscore.com/score?format=json&address=3440%20Walnut%20Ave%20SW%20Seattle%20WA&lat=47.5718752&lon=-122.3835876&wsapikey=' + WSAPI_KEY

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  constructor(){
    super();
    this.state= {
      cardList: []
    }
  }

  componentDidMount() {
    console.log('starting API CALL');

    // axios.get(wsURL)
    //   .then(function (response) {
    //     console.log('in .then');
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log('in .catch');
    //     console.log(error);
    //   });

    // fetch(wsURL)
    // .then((response) => {
    //   response.json()
    //   console.log('in 1st fetch .then');
    // })
    // .then((responseJson) => {
    //   console.log('in 2nd fetch .then');
    //   console.log(responseJson.walkscore);
    //
    // })
    // .catch((error) => {
    //   console.log('in fetch .catch');
    //   console.log(error);
    // });
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
        <ScrollView>
          <Card
            streetNum={house[0]["streetNum"]}
            streetName={house[0]["streetName"]}
            streetType={house[0]["streetType"]}
            city={house[0]["city"]}
            state={house[0]["state"]}
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

    return (searchResults)

  }

}

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
    //         let wsURL = 'http://api.walkscore.com/score?format=json&address=3440%20Walnut%20Ave%20SW%20Seattle%20WA&lat=47.5718752&lon=-122.3835876&wsapikey='+ WSAPI_KEY
    //
    //         return fetch(wsURL)
    //           .then((response) => response.json())
    //           .then((responseJson) => {
    //             console.log('in fetch ... .then');
    //             console.log(responseJson.walkscore);
    //             // this.setCardInfo()
    //           })
    //           .catch((error) => {
    //             console.log('in fetch .. .catch');
    //             console.log(error);
    //           });
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

    // const styles = StyleSheet.create({
    //   listContainer: {
    //     width: "100%",
    //     height: "50%"
    //   }
    // })
