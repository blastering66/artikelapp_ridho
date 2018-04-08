import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text, TouchableWithoutFeedback,
  View, Dimensions, Image, ScrollView, ListView, RefreshControl, TouchableHighlight, ActivityIndicator
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import LinearGradient from 'react-native-linear-gradient'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const { width } = Dimensions.get('window')
const dsTop = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsWorld = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsSports = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsHealth = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsTech = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
const dsMovies = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class TopStories extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    headerBackTitle: null,
    headerRight: (
      <TouchableWithoutFeedback style={styles.headCol} onPress={() => {
        navigation.setParams({ sortClicked: true })
      }}>
        <View style={{ padding: 10 }}>
          <Image resizeMode={'contain'} style={{ width: 20, height: 20 }} source={require('../../assets/images/ic_sort.png')} />
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
    sortNewest: false,
    sortClicked: false,
    loadingTop: false,
    loadingWorld: false,
    loadingSports: false,
    loadingTech: false,
    loadingHealth: false,
    loadingMovies: false,
    refreshing: false,
    hasMore: true,
    dataSourceTop: dsTop.cloneWithRows([]),
    dataSourceWorld: dsWorld.cloneWithRows([]),
    dataSourceSports: dsSports.cloneWithRows([]),
    dataSourceHealth: dsHealth.cloneWithRows([]),
    dataSourceTech: dsTech.cloneWithRows([]),
    dataSourceMovies: dsMovies.cloneWithRows([])

  }

  componentDidMount() {
    this.fetchTopStories()
    this.fetchWorld()
    this.fetchSports()
    this.fetchTech()
    this.fetchHealth()
    this.fetchMovies()

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.sortClicked !== nextProps.navigation.state.params.sortClicked && nextProps.navigation.state.params.sortClicked) {
      this.sortArray()
      this.setState({ sortClicked: false })
    }
  }

  sortFunction(a,b){
    var dateA = new Date(a.published_date).getTime();
    var dateB = new Date(b.published_date).getTime();
    return dateA > dateB ? 1 : -1;
  }

  sortArray(array) {
    if (!this.state.sortNewest) {
      this.setState({ dataSourceTop: dsTop.cloneWithRows(this.state.dataSourceTop._dataBlob.s1.sort(this.sortFunction)) })
      this.setState({ dataSourceWorld: dsWorld.cloneWithRows(this.state.dataSourceWorld._dataBlob.s1.sort(this.sortFunction)) })
      this.setState({ dataSourceSports: dsSports.cloneWithRows(this.state.dataSourceSports._dataBlob.s1.sort(this.sortFunction)) })
      this.setState({ dataSourceTech: dsTech.cloneWithRows(this.state.dataSourceTech._dataBlob.s1.sort(this.sortFunction)) })
      this.setState({ dataSourceHealth: dsHealth.cloneWithRows(this.state.dataSourceHealth._dataBlob.s1.sort(this.sortFunction)) })
      this.setState({ dataSourceMovies: dsMovies.cloneWithRows(this.state.dataSourceMovies._dataBlob.s1.sort(this.sortFunction)) })
    } else {
      this.setState({ dataSourceTop: dsTop.cloneWithRows(this.state.dataSourceTop._dataBlob.s1.reverse()) })
      this.setState({ dataSourceWorld: dsWorld.cloneWithRows(this.state.dataSourceWorld._dataBlob.s1.reverse()) })
      this.setState({ dataSourceSports: dsSports.cloneWithRows(this.state.dataSourceSports._dataBlob.s1.reverse()) })
      this.setState({ dataSourceTech: dsTech.cloneWithRows(this.state.dataSourceTech._dataBlob.s1.reverse()) })
      this.setState({ dataSourceHealth: dsHealth.cloneWithRows(this.state.dataSourceHealth._dataBlob.s1.reverse()) })
      this.setState({ dataSourceMovies: dsMovies.cloneWithRows(this.state.dataSourceMovies._dataBlob.s1.reverse()) })
    }
    this.setState({ sortNewest: !this.state.sortNewest })

    // this.setState({ dataSourceTop: dsTop.cloneWithRows(this.state.dataSourceTop._dataBlob.s1.reverse()) })
  }

  fetchTopStories() {
    this.setState({ loadingTop: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      const array = json.results.slice(0, 10)
      console.log('array', array)
      this.setState({ loadingTop: false })
      this.setState({ dataSourceTop: dsTop.cloneWithRows(json.results.slice(0, 10)) })
    })
  }

  fetchWorld() {
    this.setState({ loadingWorld: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/world.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loadingWorld: false })
      this.setState({ dataSourceWorld: dsWorld.cloneWithRows(json.results.slice(0, 10)) })
    })
  }

  fetchSports() {
    this.setState({ loadingSports: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loadingSports: false })
      this.setState({ dataSourceSports: dsSports.cloneWithRows(json.results.slice(0, 10)) })
    })
  }

  fetchTech() {
    this.setState({ loadingTech: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loadingTech: false })
      this.setState({ dataSourceTech: dsTech.cloneWithRows(json.results.slice(0, 10)) })
    })
  }

  fetchHealth() {
    this.setState({ loadingHealth: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/health.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loadingHealth: false })
      this.setState({ dataSourceHealth: dsHealth.cloneWithRows(json.results.slice(0, 10)) })
    })
  }

  fetchMovies() {
    this.setState({ loadingMovies: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/movies.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loadingMovies: false })
      this.setState({ dataSourceMovies: dsMovies.cloneWithRows(json.results.slice(0, 10)) })
    })
  }


  renderRowList(article, rowID) {
    let mediaUrl = ''
    try {
      mediaUrl = article.multimedia[3].url
    } catch (err) {
      // console.log('no media', article)
    }
    const now = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    const articleDate = moment(article.published_date).format('MMMM Do YYYY, h:mm:ss a')
    // console.log('now', now)
    // console.log('articleDate', articleDate)
    // console.log('duration', moment(articleDate, 'MMMM Do YYYY, h:mm:ss a').startOf('hour').fromNow())

    return(
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Detail', { title: article.title, article: article}) }>
        <View style={{ flex: 1, height: 200, width: 300,  flexDirection: 'row', margin: 10 }}>
          { mediaUrl !== '' ? (
            <Image resizeMode={'cover'} source={{ uri: mediaUrl !== '' ? article.multimedia[3].url : '' }} style={{ flex: 1 }} />
          ) : null }


          <LinearGradient colors={[ 'transparent', 'transparent', '#000000']} style={styles.gradient_container}>
          <View style={styles.article_title_container}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text multiline={true} numberOfLines={2} style={styles.article_title}>{article.title}</Text>
              <Text multiline={true} numberOfLines={2} style={styles.article_date}>{moment(articleDate, 'MMMM Do YYYY, h:mm:ss a').startOf('hour').fromNow()}</Text>
            </View>
          </View>
          </LinearGradient>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    const state = this.state
    return (
      <View style={styles.root}>
        <ScrollView>
          <View style={styles.container}>
          <Text style={styles.subtitle}>Top Stories</Text>
          { state.loadingTop ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceTop}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}

          <Text style={styles.subtitle}>World news</Text>
          { state.loadingWorld ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceWorld}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}

          <Text style={styles.subtitle}>Sports</Text>
          { state.loadingSports ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceSports}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}

          <Text style={styles.subtitle}>Health</Text>
          { state.loadingHealth ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceHealth}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}

          <Text style={styles.subtitle}>Technology</Text>
          { state.loadingTech ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceTech}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}

          <Text style={styles.subtitle}>Movies</Text>
          { state.loadingMovies ? (
            <View style={styles.progress_container}>
              <View style={styles.progress}>
                <ActivityIndicator color={'#dc1f1b'} size={'small'} />
              </View>
            </View>
          ) : (
            <ListView
              style={styles.list}
              z-index={2}
              horizontal={true}
              enableEmptySections={true}
              dataSource={this.state.dataSourceMovies}
              renderRow={(event, sectionID, rowID) => this.renderRowList(event, rowID)}
              removeClippedSubviews={false}
            />
          )}
          </View>
        </ScrollView>


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
  article_date: {
    backgroundColor: 'transparent', color: 'white', fontSize: 12, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
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
    width: 300,
    height: 200
  }
});

export default TopStories
