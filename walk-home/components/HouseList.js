import React from "react";
import { StyleSheet, FlatList, View, Text} from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
const addressData = './library/addresses.JSON';

class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  render() {

    let cardList = [];
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
      let house = [
        addressData[0].ID,
        addressData[0].streetNum,
        addressData[0].streetName,
        addressData[0].streetType,
        addressData[0].city,
        addressData[0].state
      ]
        // {
        //   "key": addressData[0].ID,
        //   "streetNum": addressData[0].streetNum,
        //   "streetName": addressData[0].streetName,
        //   "streetType": addressData[0].streetType,
        //   "city": addressData[0].city,
        //   "state": addressData[0].state
        // }
      cardList.push(house)
        // }

      searchResults =(
        <FlatList
          style={styles.listContainer}
          data={cardList}
          renderItem={({item}) => {
            <Card
              onPress={this.getHouseData}
              streetNum={item[1]}
              streetName={item[2]}
              streetType={item[3]}
              city={item[4]}
              state={item[5]}
            />}
          }
          keyExtractor={item => item[0]}
        /> )

    } else {
      searchResults = (
        <View>
          <Text>`Oops! No houses were found in ${this.state.cityName}`</Text>
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
