import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, Share,
  ToastAndroid, ActivityIndicator,
  WebView, RefreshControl, TouchableWithoutFeedback
} from 'react-native'
import { connect } from 'react-redux'
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'

class Detail extends Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerBackTitle: null,
    headerRight: (
      <TouchableWithoutFeedback style={styles.headCol} onPress={() => {
        Share.share({
          message: `${navigation.state.params.article.abstract}`,
          url: `${navigation.state.params.article.url}`,
          title: `${navigation.state.params.article.title}`
        }, {
          dialogTitle: 'MyNews'
        })
      }}>
        <View style={{ padding: 10 }}>
          <Ionicons name="md-share" size={25} color="black" />
        </View>
      </TouchableWithoutFeedback>
    ),
    headerStyle: {
      backgroundColor: 'white'
    },
    headerTitleStyle: { fontSize: 16 },
    headerBackTitleStyle: { color: '#000000' },
    headerTintColor: '#000000',
    headerMode: 'screen',
    gesturesEnabled: true
  })

  state = {
    article: {},
    loading: true,
    refreshing: false,
    hasMore: true
  }

  componentDidMount() {
    console.log('article', this.props.navigation.state.params)
    this.setState({ article: this.props.navigation.state.params.article })
  }

  _onLoadEnd() {
    this.setState({ loading: false });
  }

  renderLoading() {
    return (
      <View style={{ flex: 1,
        justifyContent: 'center' }}>
        <View style={{ alignSelf: 'center', alignItems: 'center', flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 }}>
          <ActivityIndicator color={'#dc1f1b'} size={'large'} />
        </View>
      </View>
    )
  }

  render() {
    let webUrl = ''
    if (this.state.article.url) {
      webUrl = this.state.article.url
    } else {
      webUrl = this.state.article.web_url
    }
    console.log('webUrl', webUrl)
    return (
      <View style={styles.container}>
        <WebView
        renderLoading={this.renderLoading}
        startInLoadingState
        source={{ uri: webUrl }}
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
const connectedSuperMan = connect(state => ({ title: state.article.title }))(Detail)
