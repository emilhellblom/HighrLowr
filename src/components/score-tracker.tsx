import React, { ComponentType } from 'react';
import { Guess } from '../assets/constants';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type ComponentProps = {
  status: Guess,
}

type Props = {
  instances: number,
  guesses: Guess[],
  component: ComponentType<ComponentProps>,
  style?: StyleProp<ViewStyle>,
  alignment?: 'row' | 'column',
}

class ScoreTracker extends React.Component<Props> {

  renderTrackerBulbs = () => {
    const { instances, guesses, component } = this.props;

    const Component = component;

    const bulbs = [];
    for (let i = 0; i < instances; i++) {
      bulbs.push(<Component key={ i } status={ guesses[i] }/>);
    }

    return bulbs;
  }

  render() {
    const { alignment, style } = this.props;
    return (
      <View style={ [styles.container, { flexDirection: alignment }, style] }>
        { this.renderTrackerBulbs() }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 100,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default ScoreTracker;