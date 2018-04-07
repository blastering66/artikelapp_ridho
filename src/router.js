import { StackNavigator } from 'react-navigation'

import Home from './screens/Home'
import TopStories from './screens/TopStories'
import Search from './screens/Search'
import Books from './screens/Books'
import Profile from './screens/Profile'
import Welcome from './screens/Welcome'
import Detail from './screens/Detail'

export const SignedOut = StackNavigator({
  Welcome: {
    screen: Welcome
  }
})

export const SignedIn = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  Detail: {
    screen: Detail,
    navigationOptions: {
      gesturesEnabled: false
    }
  }
})

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedOut: {
        screen: SignedOut,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
      SignedIn: {
        screen: SignedIn,
        navigationOptions: {
          gesturesEnabled: false
        }
      },
    }, {
      headerMode: 'none',
      mode: 'modal',
      initialRouteName: signedIn ? 'SignedIn' : 'SignedOut',
      cardStyle: {
        shadowColor: 'transparent'
      },
      navigationOptions: {
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }
    }
  )
}
