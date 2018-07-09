import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Card from "./Card";
import PropTypes from 'prop-types';
const addressData = './library/addresses.JSON';


class HouseList extends React.Component {
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }

  getHouseData = (event) => {
    alert(event);
  }

  cardList = () => {
    for (let house of addressData) {
      <Card
        onPress={this.getHouseData}
        streetNum={house.streetNum}
        streetName={house.streetName}
        streetType={house.streetType}
        city={house.city}
        state={house.state}
      />
    }
    return <ScrollView style={styles.listContainer}>{this.cardList}</ScrollView>;
  };
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default HouseList;
