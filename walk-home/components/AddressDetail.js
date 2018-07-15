import React from "react";
import { Modal, View, Text, Button,  StyleSheet} from "react-native";
import PropTypes from 'prop-types';

class AddressDetail extends React.Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    cityState: PropTypes.string.isRequired
  }

  render() {
    return(
      <Modal>
        <View style={styles.modalContainer}>
          <Text>Info about house here!</Text>
          <View>
            <Button
              style={styles.button}
              title='Close'
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
