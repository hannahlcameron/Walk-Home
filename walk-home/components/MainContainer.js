import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchBar from './SearchBar';
// import Addresses from './library/addresses.JSON';

// const ZILLOW_API = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA"

export default class App extends React.Component {

  state = {
    cityName: ''
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
        <Text>Welcome to Walk Home!</Text>
        <SearchBar setCityNameCallback={this.setCityName}/>
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
