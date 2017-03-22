# CROSSFADE CAROUSEL

An image carousel for React Native where one image fades in over the top of another image fading out.

## PROPS

The Crossfade Carousel component accepts a variety of props:

- backgroundColor - A string representing a color name, hex color,etc. to display behind the images. There will be a brief moment during each image transition where this color will be busy as both images are semi-transparent.
- fadeTime - The time in ms it takes for the images to complete their fade animation
- height - the height in px of the images
- width - the width in px of the images
- images - An array of images in the following format:

[
  { image: require('path/to/image.jpg') }
]

Each array item has been left as an object so that it can potentially be extended to include such things as an image caption, etc.

- pauseTime - time in ms to hold on each image before fading out
- easeType - the React Native easing method to use for image transitions

