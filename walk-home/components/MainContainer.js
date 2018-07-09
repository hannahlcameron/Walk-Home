import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import SearchBar from './SearchBar';
import HouseList from './HouseList';

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
    alert(`inside setCityName - query is ${query} cityName is ${this.state.cityName}`)
  }

  render() {

    return (
      <View style={styles.container}>
        <SearchBar setCityNameCallback={this.setCityName}/>
        <Text>House List Here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
export default MainContainer;
