
import React from 'react'
import { AppRegistry, SafeAreaView, YellowBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/utils/store'

YellowBox.ignoreWarnings([
  'Remote debugger',
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated'
])

import App from './src/'

const Root = () => (
  <SafeAreaView style={{ flex: 1,
  backgroundColor: '#fff' }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </SafeAreaView>
)

AppRegistry.registerComponent('SkillTestRidhoMaulana', () => Root)
