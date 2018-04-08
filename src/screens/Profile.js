import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View, Image,
  ListView, RefreshControl, TouchableHighlight
} from 'react-native';
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

class Profile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
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
    refreshing: false
  }

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container_header}>
          <Image
            resizeMode={'cover'}
            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
            source={{ uri: 'https://avatars0.githubusercontent.com/u/3015184?s=460&v=4' }} />
          <Text style={styles.name}>Ridho Maulana Aryasa</Text>
          <Text style={styles.email}>ridho_maulana@outlook.com</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
  container_header: {
    height: 200,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  name: {
    backgroundColor: 'transparent', color: 'black', fontSize: 18, fontWeight: 'bold', fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
  email: {
    backgroundColor: 'transparent', color: 'black', fontSize: 14, fontFamily: 'AvenirNext-Regular', paddingLeft: 10, paddingRight: 20
  },
});

export default Profile
