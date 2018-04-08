import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image, Dimensions, TextInput, TouchableWithoutFeedback,
  ListView, RefreshControl, TouchableHighlight, TouchableOpacity
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width } = Dimensions.get('window')
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Search extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Search News',
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
    query: '',
    dataSource: [],
    dataSource: ds.cloneWithRows([])
  }

  renderRowList(article, rowID) {
    let mediaUrl = ''
    try {
      mediaUrl = 'https://www.nytimes.com/' + article.multimedia[3].url
    } catch (err) {
      console.log('err', err)
      mediaUrl = ''
    }
    console.log('mediaUrl', mediaUrl + ', rowID ='+ rowID)
    return(
      <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Detail', { title: article.snippet, article: article}) }>
        <View style={{ flex: 1, height: 200, flexDirection: 'row', backgroundColor: 'gray'}}>
          { mediaUrl === '' ? (
            <Image resizeMode={'cover'}  style={{ flex: 1, height: 200}} source={require('../../assets/images/no_images.jpg')} />
          ) : (
            <Image resizeMode={'cover'} source={{ uri: mediaUrl }} style={{ flex: 1, height: 200 }} />
          ) }

          <LinearGradient colors={[ 'transparent', 'transparent', '#000000']} style={styles.gradient_container}>
          <View style={styles.article_title_container}>
            <Text multiline={false} numberOfLines={2} style={styles.article_title}>{article.snippet}</Text>
          </View>
          </LinearGradient>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  searchArticle(query) {
    this.setState({ loading: true })
    fetch('https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ query + '&api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loading: false })
      console.log('response json', json)
      this.setState({ dataSource: ds.cloneWithRows(json.response.docs) })
    })
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: 'column', paddingBottom: 50 }}>
            <View style={{ height: 50,  backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: 'gray' }}>
              <TextInput
              underlineColorAndroid={'transparent'}
              placeholder="Type Here..."
              placeholderTextColor="gray"
              style={{ flex: 1, padding: 10}}
              multiline={false}
              numberOfLines ={1}
              value={this.state.query}
              onSubmitEditing={() => this.searchArticle(this.state.query)}
              returnKeyType={"search"}
              onChangeText={(text) => this.setState({ query: text })}
              />
            </View>
            { this.state.loading ? (
              <Loading />
            ) : (
              <ListView
                z-index={2}
                enableEmptySections={true}
                dataSource={this.state.dataSource}
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
    backgroundColor: 'transparent', color: 'white', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
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
  },
  gradient_container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'transparent',
    position: 'absolute',
    width: width,
    height: 200
  }
});

export default Search
