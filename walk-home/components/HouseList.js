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
      searchResults = null;

    } else if (this.props.cityName === 'seattle') {

      for (let address of addressData) {
        let house = {
          "key": address.ID,
          "streetNum": address.streetNum,
          "streetName": address.streetName,
          "streetType": address.streetType,
          "city": address.city,
          "state": address.state
        }
        cardList.push(house)
      }

      searchResults =(
        <FlatList
          style={styles.listContainer}
          data={cardList}
          renderItem={({info}) => {
            <Card
              onPress={this.getHouseData}
              streetNum={info.house.streetNum}
              streetName={info.house.streetName}
              streetType={info.house.streetType}
              city={info.house.city}
              state={info.house.state}
            />}
          }
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
    width: "100%"
  }
});

export default HouseList;
