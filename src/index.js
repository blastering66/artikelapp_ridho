import React, { Component } from 'react'
import { AppState } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Permissions from 'react-native-permissions'
import { createRootNavigator } from './router'

class App extends Component {
  static propTypes = {
    artikel: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      appState: AppState.currentState
    }
  }

  componentDidMount() {
  }

  render() {
    const Layout = createRootNavigator(true)
    return <Layout />
  }
}

const mapStateToProps = state => ({
  artikel: state.artikel
})

const mapDispatchToProps = dispatch => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
