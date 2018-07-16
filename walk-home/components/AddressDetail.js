import React from "react";
import { Modal, View, Text, Button, Linking, StyleSheet} from "react-native";
import PropTypes from 'prop-types';

const HELPLINK = "https://www.redfin.com/how-walk-score-works"

class AddressDetail extends React.Component {
  static propTypes = {
    address: PropTypes.string,
    cityState: PropTypes.string,
    walkScore: PropTypes.num,
    walkDescription: PropTypes.string,
    bikeScore: PropTypes.num,
    bikeDescription: PropTypes.string,
    transitScore: PropTypes.num,
    transitDescription: PropTypes.string,
    transitSummary: PropTypes.string,
    onModalClosed: PropTypes.func.isRequired
  }

  getZillowInfo() {
    console.log(`getting Zillow info`);
  }

  // componentDidMount() {
  //
  //   this.getZillowInfo();
  // }

  render() {
    return(
      <Modal visible={this.props.address !== null} onRequestClose={this.props.onModalClosed}>
        <View style={styles.modalContainer}>
          <Text>House Address: this.props.address this.props.cityState</Text>
          <Text style={styles.link}
            onPress={() => Linking.openURL(HELPLINK)}
            >Walk Score®: {this.state.walkScore}
          </Text>
          <Text>this.props.walkDescription</Text>
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
