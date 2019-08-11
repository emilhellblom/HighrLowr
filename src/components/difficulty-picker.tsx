import React from 'react';
import {
  View,
  Picker,
  StyleSheet,
} from 'react-native';
import { Difficulties } from '../assets/constants';

type Props = {
  onChangeDifficulty: (arg: any) => void
  currentDifficulty: Difficulties,
}

class DifficultyPicker extends React.Component<Props> {

  render() {
    const { onChangeDifficulty, currentDifficulty } = this.props;
    return (
      <View style={ styles.container }>
        <Picker
          selectedValue={ currentDifficulty }
          style={ styles.picker }
          onValueChange={ (itemValue) => onChangeDifficulty(itemValue) }
        >
          <Picker.Item label={ 'Easy' } value={ Difficulties.EASY } />
          <Picker.Item label={ 'Medium' } value={ Difficulties.MEDIUM } />
          <Picker.Item label={ 'Hard' } value={ Difficulties.HARD } />
          <Picker.Item label={ 'Impossible' } value={ Difficulties.IMPOSSIBLE } />
        </Picker>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 250,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: 100,
  },
});

export default DifficultyPicker;