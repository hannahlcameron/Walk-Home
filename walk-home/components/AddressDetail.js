import React from "react";
import { Modal, View, Text, Button,  StyleSheet} from "react-native";
import PropTypes from 'prop-types';

class AddressDetail extends React.Component {
  static propTypes = {
    selectedHouseAddress: PropTypes.string,
    selectedHouseCityState: PropTypes.string,
    onModalClosed: PropTypes.func.isRequired
  }

  getZillowInfo() {
    console.log(`getting Zillow info`);
  }

  componentDidMount() {

    this.getZillowInfo();
  }

  render() {
    return(
      <Modal visible={this.props.selectedHouseAddress !== null} onRequestClose={this.props.onModalClosed}>
        <View style={styles.modalContainer}>
          <Text>Info about house here!</Text>
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
