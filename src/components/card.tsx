import React from 'react';
import { Image, StyleSheet, View, ActivityIndicator } from 'react-native';

const Card = ({ image, loading }: { image: string, loading: boolean }) => {
  return (
    <View style={ styles.container }>
      <Image
        source={ { uri: image } }
        style={ styles.card }
      />
      { loading &&
        <ActivityIndicator
          size={ 'large' }
          color={ '#0000ff' }
          style={ { position: 'absolute' } }
        />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 314,
    width: 226,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Card;