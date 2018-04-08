import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, Dimensions,
  ListView, RefreshControl, TouchableHighlight
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Books extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Books',
    headerBackTitle: null,
    headerRight: null,
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
    loading: false,
    refreshing: false,
    hasMore: true,
    dataSource: [],
    dataSource: ds.cloneWithRows([])
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loading: false })
      // console.log('response json', json)
      this.setState({ dataSource: ds.cloneWithRows(json.results) })
    })
  }

  renderRowList(article, rowID) {
    let mediaUrl = ''
    try {
      mediaUrl = article.multimedia[3].url
    } catch (err) {
      console.log('no media', article)
    }
    return(
      <TouchableHighlight>
        <View style={{ flex: 1, height: 50, flexDirection: 'row'}}>
        <View style={styles.article_title_container}>
          <Text multiline={true} numberOfLines={2} style={styles.article_title}>{article.author} {article.title}</Text>
        </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.loading ? (
          <Loading />
        ) : (
          <ListView
            z-index={2}
            enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderSeparator={() => (
              <View style={{ height: 1, borderBottomWidth: 1, borderBottomColor: '#dddddd' }} />
            )}
            renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
            removeClippedSubviews={false}
            onEndReached={() => {
              // if (this.state.data.length >= 10 && !this.state.loading) {
              //   this.fetchEventsMore(this.props.events.takemeout.length)
              // }
              console.log('onEndReached')
            }}
            onEndReachedThreshold={10}
            refreshControl={(
              <RefreshControl refreshing={this.state.refreshing} onRefresh={() => {
                console.log('onRefresh')
              }} />
            )}
          />
        ) }


      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 50
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', padding: 20
  },
  subtitle: {
    fontSize: 15, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', padding: 20
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  list: {
    flex: 1, height: 200
  },
  article_title_container: {
    position: 'absolute', bottom: 20
  },
  article_title: {
    backgroundColor: 'transparent', color: 'black', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
  progress_container: {
    flex: 1, width: 200, height: 200, alignSelf: 'center'
  },
  progress: {
    position: 'absolute',
    left: 75,
    top: 75,
    width: 50,
    height: 50
  }
});

export default Books
