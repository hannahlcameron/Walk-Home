import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
// import JSONData from './library/addresses.JSON';

http://api.walkscore.com/score?format=json&address=
&lat=
&lon=
&transit=1&bike=1&wsapikey=

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  render() {

    let searchResults;

    if (this.props.cityName === '') {
      searchResults = (
        <View>
          <Text>Enter a city name to get your search going!</Text>
        </View>)

    } else if (this.props.cityName === 'seattle') {
        // took out for loop - throws error about symbol - need to find an alt way
        // of looping though the json - for Each?
        // for (let address of addressData) {
      // [
      //   addressData[0].ID,
      //   addressData[0].streetNum,
      //   addressData[0].streetName,
      //   addressData[0].streetType,
      //   addressData[0].city,
      //   addressData[0].state
      // ]
      let house =
      // JSON.parse(JSONData);
      [{
          "key": 1,
          "streetNum": "3440",
          "streetName": "Walnut",
          "streetType": "Ave SW",
          "city": "Seattle",
          "state": "WA",
          "latitude": 47.5718752,
          "longitude": 122.3835876
        }]

        http://api.walkscore.com/score?format=json&
        address=1119%8th%20Avenue%20Seattle%20WA%2098101&lat=47.6085&
        lon=-122.3295&transit=1&bike=1&wsapikey=<YOUR-WSAPIKEY>

        let fullWSURL = encodeURIComponent('http://api.walkscore.com/score?format=json&address={house[0]streetNum} {house[0]streetName} {house[0]streetType} {house[0]city} {house[0]state} {house[0]latitude} {house[0]longitude}')

        function getMoviesFromApiAsync() {
          return fetch()
            .then((response) => response.json())
            .then((responseJson) => {
              return responseJson.movies;
            })
            .catch((error) => {
              console.error(error);
            });
        }

      searchResults =(
        <ScrollView style={styles.listContainer}>
          <Card
            key={house[0]["key"]}
            streetNum={house[0]["streetNum"]}
            streetName={house[0]["streetName"]}
            streetType={house[0]["streetType"]}
            city={house[0]["city"]}
            state={house[0]["state"]}
            />
        </ScrollView> )

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

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    height: "50%"
  }
});

export default HouseList;
