import React from "react";
import { Modal, View, Text, Button, Image, TouchableOpacity, Linking, StyleSheet} from "react-native";
import PropTypes from 'prop-types';

const HELPLINK = "https://www.redfin.com/how-walk-score-works"

const walkBadgeURL = 'https://www.walkscore.com/badge/walk/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'

const bikeBadgeURL = 'https://www.walkscore.com/badge/bike/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'
const transitBadgeURL = 'https://www.walkscore.com/badge/transit/3440-Walnut-Avenue-SW-Seattle-WA-98116.svg'

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
          <View>
            <TouchableOpacity onPress={() => Linking.openURL(HELPLINK)}>
              <Image
                style={{width: 66, height: 58}}
                source={{uri: walkBadgeURL}}
              />
            </TouchableOpacity>
            <Image
              style={{width: 66, height: 58}}
              source={{uri: bikeBadgeURL}}
              onPress={() => Linking.openURL(HELPLINK)}
            />
            <Image
              style={{width: 66, height: 58}}
              source={{uri: transitBadgeURL}}
              onPress={() => Linking.openURL(HELPLINK)}
            />
          </View>
          <View>
            <Text>{this.props.walkDescription}</Text>
            <Text>{this.props.bikeDescription}</Text>
            <Text>{this.props.transitDescription}</Text>
            <Text>{this.props.transitSummary}</Text>
          </View>
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
