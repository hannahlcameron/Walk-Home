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
            style={styles.backgroundImageContainer}
            >
            <Image
              style={styles.backgroundImage}
              source={{uri: 'https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}}
              />
          </View>
          <View style={styles.container}>
            <View style={styles.welcome}>
              <Image
                source={require('../assets/WH_Logo.jpg')}
                style={styles.whLogo}/>
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
    backgroundColor: "#373c51",
    flexDirection: "row",
    width: (Dimensions.get('window').width),
    height: 62.5
  },
  welcomeText: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#fff",
    // width: (Dimensions.get('window').width),
    alignSelf: "center",
    marginLeft: 35
  },
  backgroundImageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    opacity: .7
  },
  whLogo: {
    width: 62.5,
    height: 62.5,
  }
});
export default MainContainer;
