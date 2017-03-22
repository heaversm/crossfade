/**
 * Crossfade Carousel App
 * 
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';

import { imagesArray } from './data/imagesArray'
import CrossfadeCarousel from './components/CrossfadeCarousel'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class crossfade extends Component {
  render() {
    console.log(deviceWidth, deviceHeight)
    return (
      <View style={styles.container}>
        <CrossfadeCarousel
          images={imagesArray}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: deviceWidth,
    height: deviceHeight,
  },
});

AppRegistry.registerComponent('crossfade', () => crossfade);
