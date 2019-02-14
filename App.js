import React from 'react';
import { StyleSheet, Text, View, Button , Image } from 'react-native';
import { ImagePicker , Permissions , Constants } from 'expo'
import styled from 'styled-components'

const TextView = styled(Text)`
    color: red !important;
`

export default class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      image: null
    }
  }

  pickFromGallery = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    console.log(permissions, status);
    if(status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  }

  render() {
    let { image } = this.state

    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <TextView>Hello, World</TextView>
        <Button
            title="Pick from Gallery"
            onPress={this.pickFromGallery}
        />
        {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
