import React from "react";
import { StyleSheet, FlatList, View, Text, Dimensions} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
import houses from '../library/addresses.json';

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  // constructor() {
  //   super();
  //   this.state = {
  //     houses: []
  //   }
  //
  // }

  render() {
    let searchResults;

    if (this.props.cityName === '') {
      searchResults = (
        <View style={styles.results}>
          <Text style={styles.resultText}>Enter a city name to get your search going!</Text>
        </View>)

    } else if (this.props.cityName.toLowerCase() === 'seattle') {
      console.log("here's what houses is");
      console.log(houses);
      searchResults = (
        <FlatList
          data={houses}
          renderItem={({item}) => (
                <Card
                  streetNum={item.streetNum}
                  streetName={item.streetName}
                  streetType={item.streetType}
                  city={item.city}
                  state={item.state}
                  lat={item.latitude}
                  long={item.longitude}
                />
          )}
        />
      )
    } else {
      searchResults = (
        <View style={styles.results}>
          <Text style={styles.resultText}>Oops! No houses were found in {this.props.cityName}</Text>
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
    flex: 2,
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  results: {
    backgroundColor:'#373c51',
    width: (Dimensions.get('window').width*.75),
    borderColor: '#373c51',
    borderWidth: 2,
    borderRadius: 5,
    margin: 10

  },
  resultText: {
    color: "#fff",
    fontSize: 25,
    textAlign: 'center'
  }
});

export default HouseList;
