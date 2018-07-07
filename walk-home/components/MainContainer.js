import React from 'react';
import { StyleSheet, Text, View, FlatList, Card } from 'react-native';
import SearchBar from './SearchBar';


const addressData = './library/addresses.JSON';

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

  getHouseData = (event) => {
    alert(event);
  }


  const houseList = props => {
    return (
      <FlatList
        data=addressData
        renderItem={(info) => (
          <Card
          cardInfo={info}
          onItemPressed={this.getHouseData} />
        )}

      />
    )
  }


  render() {

    return (
      <View style={styles.container}>
        <SearchBar setCityNameCallback={this.setCityName}/>
        {houseList}
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
