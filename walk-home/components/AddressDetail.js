import React from "react";
import { Modal, View, Text, Button,  StyleSheet} from "react-native";
import PropTypes from 'prop-types';

class AddressDetail extends React.Component {
  static propTypes = {
    selectedHouseAddress: PropTypes.string,
    selectedHouseCityState: PropTypes.string
  }

  render() {
    return(
      <Modal visible={this.props.selectedHouseAddress !== null} onRequestClose={()=>{}}>
        <View style={styles.modalContainer}>
          <Text>Info about house here!</Text>
          <View>
            <Button
              style={styles.button}
              title='Close'
              onPress={()=>{}}
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
