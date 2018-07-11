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

      // for (let address of addressData) {
        let house = {
          "key": addressData[0].ID,
          "streetNum": addressData[0].streetNum,
          "streetName": addressData[0].streetName,
          "streetType": addressData[0].streetType,
          "city": addressData[0].city,
          "state": addressData[0].state
        }
        cardList.push(house)
      // }

      searchResults =(
        <FlatList
          style={styles.listContainer}
          data={cardList}
          renderItem={({info}) => {
            <Card
              onPress={this.getHouseData}
              streetNum={info.streetNum}
              streetName={info.streetName}
              streetType={info.streetType}
              city={info.city}
              state={info.state}
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
