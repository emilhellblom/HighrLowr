import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Options } from '../assets/constants';
import translate from '../tools/translate';

type Props = {
  drawCard: (arg: Options) => void,
  loading: boolean
}

const Buttons = ({ drawCard, loading }: Props) => {
  return (
    <View style={ styles.buttonContainer }>
      <TouchableOpacity
        style={ styles.button }
        onPress={ () => drawCard(Options.HIGHER) }
        disabled={ loading }
      >
        <Text>
          { translate('drawCardButtons', Options.HIGHER) }
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={ styles.button }
        onPress={ () => drawCard(Options.LOWER) }
        disabled={ loading }
      >
        <Text>
          { translate('drawCardButtons', Options.LOWER) }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'grey',
    height: 50,
    width: 100,
    borderRadius: 5,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Buttons;