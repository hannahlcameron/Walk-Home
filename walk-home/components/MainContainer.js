import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import SearchBar from './SearchBar';
import HouseList from './HouseList';
import { Dimensions } from 'react-native'

class MainContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    cityName: ''
    }
  }

  setCityName = (query) => {
    this.setState({
      cityName: query
    })
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>Welcome to Walk Home!</Text>
        <View style={styles.container}>
          <SearchBar setCityNameCallback={this.setCityName}/>
          <HouseList cityName={this.state.cityName}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
        width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default MainContainer;
