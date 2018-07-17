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
    address: PropTypes.string,
    cityState: PropTypes.string,
    walkScore: PropTypes.number,
    walkDescription: PropTypes.string,
    bikeScore: PropTypes.number,
    bikeDescription: PropTypes.string,
    transitScore: PropTypes.number,
    transitDescription: PropTypes.string,
    transitSummary: PropTypes.string,
    onModalClosed: PropTypes.func.isRequired
  }

  getZillowInfo() {
    console.log(`getting Zillow info`);
  }

  shouldComponentUpdate() {
    if (this.props.address) {
          this.getZillowInfo();
    }
  }

  render() {

    let modalContent = null;

    if (this.props.address) {
      modalContent = (
        <View>
          <Text>House Address: {this.props.address} {this.props.cityState}</Text>
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
      <Modal visible={this.props.address !== null} onRequestClose={this.props.onModalClosed}>
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
