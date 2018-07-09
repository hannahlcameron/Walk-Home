import React from 'react';
import { StyleSheet, View} from 'react-native';
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
  }

  render() {

    return (
      <View style={styles.container}>
        <SearchBar setCityNameCallback={this.setCityName}/>
        <HouseList cityName={this.state.cityName}/>
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
