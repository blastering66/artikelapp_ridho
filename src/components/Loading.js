import React from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
const { width } = Dimensions.get('window')

class Loading extends React.Component {
  static propTypes = {
    absolute: PropTypes.bool,
    section: PropTypes.bool,
    inverse: PropTypes.bool
  }

  render() {
    const { absolute, section, inverse } = this.props
    const bg = { backgroundColor: (inverse ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.425)') }

    return (
      <View style={[absolute ? styles.absolute : {}, section ? styles.section : {}, styles.container, bg]}>
        <View style={[styles.absolute, styles.loading]}>
          <ActivityIndicator
            color={inverse ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.425)'}
            size={'small'}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    zIndex: 1
  },
  section: {
    flex: 1,
    flexDirection: 'row',
    width: width,
    height: width / 2
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Loading
