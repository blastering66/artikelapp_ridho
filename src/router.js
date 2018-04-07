import { StackNavigator } from 'react-navigation'

import Home from './screens/Home'
import Welcome from './screens/Welcome'

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
        screen: SignedOut,
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
