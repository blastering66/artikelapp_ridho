import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView, RefreshControl
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'

class Detail extends Component {

  state = {
    loading: false,
    refreshing: false,
    hasMore: true
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <WebView
        source={{uri: 'https://www.nytimes.com/2018/04/06/business/economy/economy-trade-war-china-trump-tariffs-fed.html'}}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Detail
