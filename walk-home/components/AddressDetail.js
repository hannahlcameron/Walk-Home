import React from "react";
import { Modal, View, Text, Button, Linking, StyleSheet} from "react-native";
import PropTypes from 'prop-types';

const HELPLINK = "https://www.redfin.com/how-walk-score-works"

// const walkBadgeURL = 'https://www.walkscore.com/badge/bike/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'
//
// const bikeBadgeURL = 'https://www.walkscore.com/badge/bike/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'
// const transitBadgeURL = 'https://www.walkscore.com/badge/transit/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'

class AddressDetail extends React.Component {
  static propTypes = {
    streetNum: PropTypes.string,
    streetName: PropTypes.string,
    streetType: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    walkScore: PropTypes.number,
    walkDescription: PropTypes.string,
    bikeScore: PropTypes.number,
    bikeDescription: PropTypes.string,
    transitScore: PropTypes.number,
    transitDescription: PropTypes.string,
    transitSummary: PropTypes.string,
    selected: PropTypes.bool.isRequired,
    onModalClosed: PropTypes.func.isRequired
  }

  getZillowInfo() {
    if (this.props.selected) {
          console.log(`getting Zillow info for ${this.props.streetNum}`);
    }
  }

  render() {

    this.getZillowInfo();

    let modalContent;

    if (this.props.selected) {
      modalContent = (
        <View>
          <Text style={styles.addressText}>
            {this.props.streetNum} {this.props.streetName} {this.props.streetType} {this.props.city} {this.props.state}
          </Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Walk Score®: {this.props.walkScore}
          </Text>
          <Text>{this.props.walkDescription}</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Bike Score®: {this.props.bikeScore}
          </Text>
          <Text>{this.props.bikeDescription}</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Transit Score®: {this.props.transitScore}
          </Text>
          <Text>{this.props.transitDescription}</Text>
          <Text>{this.props.transitSummary}</Text>
        </View>
      )
    }

    return(
      <Modal visible={this.props.selected} onRequestClose={this.props.onModalClosed}>
        <View style={styles.modalContainer}>
          {modalContent}
          <View>
            <Button
              style={styles.button}
              title='Close'
              onPress={this.props.onModalClosed}
              />
          </View>
        </View>
      </Modal>
    )
  }

}

const styles = StyleSheet.create({
  button: {
    color: 'pink'
  },
  modalContainer: {
    margin: 22
  }
});

export default AddressDetail;
