import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from 'prop-types';

class Card extends React.Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    streetNum:PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }

  render() {
    return (
      <TouchableOpacity>
        <View style={styles.listItem}>
          <Text>WS Here!</Text>
          <Text>Address Here!</Text>
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

export default card;
