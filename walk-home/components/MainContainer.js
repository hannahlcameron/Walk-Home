import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image} from 'react-native';
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
        <View>
          <View
            style={styles.backgroundImage}
            >
            <Image
              style={{
                flex: 1,
                resizeMode: "cover",
                opacity: .7
              }}
              source={{uri: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
              />
          </View>
          <View style={styles.container}>
            <View style={styles.welcome}>
              <Text style={styles.welcomeText}>Find Your Walk Home!</Text>
            </View>
            <View style={styles.container}>
              <SearchBar setCityNameCallback={this.setCityName}/>
              <HouseList cityName={this.state.cityName}/>
            </View>
          </View>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  welcome: {
    backgroundColor: "#B39765",
    padding: 15

  },
  welcomeText: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#fff",
    width: (Dimensions.get('window').width),
    textAlign: "center"
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }
});
export default MainContainer;
