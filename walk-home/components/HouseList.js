import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
// const addressData = './library/addresses.JSON';

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  render() {

    // let cardList = [];
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
      let house =
      // [
      //   addressData[0].ID,
      //   addressData[0].streetNum,
      //   addressData[0].streetName,
      //   addressData[0].streetType,
      //   addressData[0].city,
      //   addressData[0].state
      // ]
        [{
          "key": 1,
          "streetNum": "3440",
          "streetName": "Walnut",
          "streetType": "Ave SW",
          "city": "Seattle",
          "state": "WA"
        }]
      // cardList.push(house)
        // }


      searchResults =(
        <ScrollView style={styles.listContainer}>
          <Card
            key={house[0].ID}
            streetNum={house[0].streetNum}
            streetName={house[0].streetName}
            streetType={house[0].streetType}
            city={house[0].city}
            state={house[0].state}
            />
        </ScrollView> )

    } else {
      searchResults = (
        <View>
          <Text>`Oops! No houses were found in {this.props.cityName}`</Text>
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
