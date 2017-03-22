import React, { PropTypes, Component } from 'react'

import {
  Animated,
  Easing,
  View,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

class CrossfadeCarousel extends React.Component {

  static propTypes = {
    backgroundColor: PropTypes.string,
    fadeTime: PropTypes.number,
    height: PropTypes.number,
    images: PropTypes.array,
    pauseTime: PropTypes.number,
    width: PropTypes.number,
  }

  static defaultProps = {
    backgroundColor: 'transparent',
    easeType: Easing.inOut(Easing.quad),
    fadeTime: 400,
    height: deviceHeight,
    pauseTime: 3000,
    width: deviceWidth,
  }

  state = {
    imageSource: null,
    imageSource2: null,
    imageIndex: 1,
  }

  imageOpacity = new Animated.Value(0)

  animOpacity1 = this.imageOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  animOpacity2 = this.imageOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  imageStyle1 = {
    opacity: this.animOpacity1,
  }

  imageStyle2 = {
    opacity: this.animOpacity2,
  }

  imageLength = this.props.images.length

  componentWillMount = () => {
    this.resetImages()
  }

  pauseOnImage = (opacity) => {
    this.imageTimeout = setTimeout(() => {
      this.cycleImage(Math.abs(opacity - 1))
    }, this.props.pauseTime)
  }

  cycleImage = (opacity) => {
    Animated.timing(this.imageOpacity, {
      duration: this.props.fadeTime,
      easing: this.props.easeType,
      toValue: opacity,
    }).start(() => {
      this.incrementimageIndex(opacity)
    })
  }

  incrementimageIndex = (opacity) => {
    let curIndex = this.state.imageIndex
    curIndex++

    if (curIndex > this.imageLength - 1) {
      curIndex = 0
    }

    const imgToLoad = curIndex % this.imageLength

    if (opacity === 1) {
      this.setState({
        imageSource: this.props.images[imgToLoad].image,
      })
    }
    else {
      this.setState({
        imageSource2: this.props.images[imgToLoad].image,
      })
    }

    this.setState({ imageIndex: curIndex })
    this.pauseOnImage(opacity)

  }

  handleClearImageTimeout = () => {
    if (this.imageTimeout) {
      clearTimeout(this.imageTimeout)
    }
  }

  resetImages = () => {
    this.setState({
      imageIndex: 1,
      imageSource: this.props.images[0].image,
      imageSource2: this.props.images[1].image,
    })
    this.imageOpacity.setValue(0)
    this.pauseOnImage(0)
  }

  render() {
    return (
      <View
        backgroundColor={this.props.backgroundColor}
      >
        <Animated.Image
          style={[styles.image, this.imageStyle1, { width: this.props.width, height: this.props.height }]}
          source={this.state.imageSource}
        />
        <Animated.Image
          style={[styles.image, this.imageStyle2, { width: this.props.width, height: this.props.height }]}
          source={this.state.imageSource2}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
})

module.exports = CrossfadeCarousel