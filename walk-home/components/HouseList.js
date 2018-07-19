import React from "react";
import { StyleSheet, ScrollView, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import house from '../library/addresses.json';

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

    return (
      <View style={styles.listContainer}>
        {searchResults}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: Dimensions.get('window').width,
    minHeight: "45%",
    maxHeight: "70%",
    alignItems: 'center'
  }
});

export default HouseList;
