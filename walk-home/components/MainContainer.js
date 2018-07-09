import React from 'react';
import { StyleSheet, View} from 'react-native';
import SearchBar from './SearchBar';
import HouseList from './HouseList';

// const ZILLOW_API = "http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=<ZWSID>&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA"

class MainContainer extends React.Component {

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
