import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ListView, RefreshControl, TouchableHighlight
} from 'react-native';
import { TabNavigator } from 'react-navigation'
import { fetcher, ENDPOINT } from '../utils/common'
import Loading from '../components/Loading'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TopStories from './TopStories'
import Search from './Search'
import Books from './Books'
import Profile from './Profile'

import { isIphoneX, debounce } from '../utils/common'

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    loading: false
  }

  componentDidMount() {
  }

  render() {
    const { navigation } = this.props
    return (
      <MainTab navigation={navigation} />
    )
  }
}

const MainTab = TabNavigator({
  TopStories: {
    screen: TopStories,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) =>
      <Ionicons name="md-search" size={25} color="black" />
    }
  },
  Search: {
    screen: Search,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) =>
      <Ionicons name="md-search" size={25} color="black" />
    },
    tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
      const { route, index } = scene
      if (route.key === previousScene.key) {
        route.params.scrollToTop()
      }
      jumpToIndex(index)
    }
  },
  Books: {
    screen: Books,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) =>
      <Ionicons name="md-search" size={25} color="black" />
    },
    tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
      const { route, index } = scene
      if (route.key === previousScene.key) {
        route.params.scrollToTop()
      }
      jumpToIndex(index)
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ focused, tintColor }) =>
      <Ionicons name="md-search" size={25} color="black" />
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#dc1f1b',
    inactiveTintColor: '#a5a5a5',
    upperCaseLabel: false,
    showIcon: true,
    showLabel: false,
    style: {
      borderTopWidth: 1,
      borderTopColor: '#e6e7e9',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      // maxHeight: 60,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: isIphoneX() ? -34 : 0
    },
    labelStyle: {
      fontFamily: 'AvenirNext-Regular',
      top: -2
    },
    indicatorStyle: {
      backgroundColor: 'transparent'
    },
    iconStyle: {
      width: 30,
      height: 24
    }
  },
  swipeEnabled: false,
  lazyLoad: true,
  initialRouteName: 'TopStories'
})

Home.router = MainTab.router

export default Home
