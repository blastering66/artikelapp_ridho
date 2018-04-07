import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView, RefreshControl, TouchableHighlight
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Search extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: false,
    refreshing: false,
    hasMore: true,
    dataSource: [],
    dataSource: ds.cloneWithRows([])
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=95ac032aee02495e89b21009b3ce3f15', {
    method: 'GET' }).then((response) => response.json())
    .then((json) => {
      this.setState({ loading: false })
      console.log('response json', json)
      this.setState({ dataSource: ds.cloneWithRows(json.results) })
    })
  }

  renderRowList(article, rowID) {
    return(
      <TouchableHighlight onPress={() => this.props.navigation.navigate('Detail') }>
        <View style={{ flex: 1, flexDirection: 'row', padding: 10 }}>
          <Text>{article.title}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

export default Search
