import React from 'react';
import { Guess } from '../assets/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  status: Guess,
}

class Bulb extends React.Component<Props> {

  bulbColor = () => {
    const { status } = this.props;
    let color;
    switch (status) {
      case Guess.CORRECT: {
        color = 'green';
        break;
      }
      default: color = 'gray';
    }
    return color;
  }

  render() {
    return (
      <FontAwesome5
        size={ 15 }
        color={ this.bulbColor() }
        name={ 'check-circle' }
        solid={ true }
      />
    );
  }

}

export default Bulb;