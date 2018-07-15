import React from "react";
import { Modal, View, Text, Button,  StyleSheet} from "react-native";
import PropTypes from 'prop-types';

class AddressDetail extends React.Component {
  static propTypes = {
    selectedHouse: PropTypes.object.isRequired
  }

  render() {
    return(
      <Modal>
        <View>
          <Text>this.props.selectedHouse.address</Text>
          <View>
            <Button />
            <Button />
          </View>
        </View>
      </Modal>
    )
  }

}



export default AddressDetail;
