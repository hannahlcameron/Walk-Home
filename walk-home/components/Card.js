import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

class Card extends React.Component {
  static propTypes = {
    streetNum:PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }

  getHouseData = (event) => {
    alert(`would get zillow data for ${event.target}`);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.getHouseData} >
        <View style={styles.listItem}>
          <Text>WS Here!</Text>
          <Text>{this.props.streetNum} {this.props.streetName} {this.props.streetType}</Text>
            <Text>{this.props.city} {this.props.state}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee"
  }
});

export default Card;
