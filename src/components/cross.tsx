import React from 'react';
import { Guess } from '../assets/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
  status: Guess,
}

class Cross extends React.Component<Props> {

  crossColor = () => {
    const { status } = this.props;
    let color;
    switch (status) {
      case Guess.INCORRECT: {
        color = 'red';
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
        color={ this.crossColor() }
        name={ 'skull-crossbones' }
      />
    );
  }

}

export default Cross;

