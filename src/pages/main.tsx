import React, { Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import axios from 'axios';
import Card from '../components/card';
import Buttons from '../components/buttons';
import DifficultyPicker from '../components/difficulty-picker';
import ScoreTracker from '../components/score-tracker';
import { CardValues, Options, Difficulties, Guess, GameOutcome } from '../assets/constants';
import translate from '../tools/translate';
import { gameDifficulties } from '../assets/game-specs';
import Bulb from '../components/bulb';
import Cross from '../components/cross';

interface DeckResponse {
  data: {
    deck_id: string,
  }
}

interface CardResponse {
  data: {
    cards: Card[]
  }
}

interface Card {
  image: string,
  value: string,
  suit: string,
  code: string,
}

type State = {
  card: Card | {},
  correctGuesses: Guess[],
  incorrectGuesses: Guess[],
  deckId: string,
  modalVisible: boolean,
  difficulty: Difficulties | null,
  gameResult: GameOutcome | null,
  isLoading: boolean,
}

const getValue = (cardValue: CardValues | string) => {
  switch(cardValue) {
    case CardValues.JACK: return 11;
    case CardValues.QUEEN: return 12;
    case CardValues.KING: return 13;
    case CardValues.ACE: return 14;
    default: return parseInt(cardValue, 10);
  }
}

export default class Main extends Component<null, State> {

  state = {
    card: {
      image: '',
      value: '',
      suit: '',
      code: '',
    },
    correctGuesses: [],
    incorrectGuesses: [],
    deckId: '',
    modalVisible: false,
    difficulty: Difficulties.EASY,
    gameResult: null,
    isLoading: false,
  }

  async componentDidMount() {
    try{
      this.setState({ isLoading: true });
      await this.initializeGame();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }


  getDeck = async (): Promise<DeckResponse | undefined> => {
    try {
      const newDeck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      return newDeck;
    } catch (error) {
      console.log(error);
    }
  }

  getNewCard = async (deckId: string): Promise<CardResponse | undefined> => {
    try {
      const newCard = await axios.get(`https://deckofcardsapi.com/api/deck/${ deckId }/draw/?count=1`)
      return newCard;
    } catch (error) {
      console.log(error);
    }
  }

  initializeGame = async () => {
    try {
      const deckRes = await this.getDeck();
      if (!deckRes) {
        return;
      }

      const { data: { deck_id } } = deckRes;
      const cardRes = await this.getNewCard(deck_id);

      if (!cardRes) {
        return;
      }

      const { data: { cards } } = cardRes;
      this.setState({ deckId: deck_id, card: cards[0] });
    } catch (error) {
      console.log(error);
    }
  }

  drawCard = async (higherOrLower?: Options) => {
    const { card, deckId, correctGuesses, incorrectGuesses } = this.state;

    const newCard = await this.getNewCard(deckId);
    if (!newCard) {
      return;
    }
    const { value: cardValue } = newCard.data.cards[0];
    const newValue = getValue(cardValue);
    const oldValue = getValue(card.value);

    let outcome;

    if (higherOrLower === Options.HIGHER) {
      outcome = newValue > oldValue;
    } else if (higherOrLower === Options.LOWER) {
      outcome = newValue < oldValue;
    }

    if (outcome) {
      this.setState({ correctGuesses: [...correctGuesses, Guess.CORRECT] });
    } else {
      this.setState({ correctGuesses: [], incorrectGuesses: [...incorrectGuesses, Guess.INCORRECT] });
    }

    this.checkIfGameOver();

    this.setState({ card: newCard.data.cards[0] });
  }

  onChangeDifficulty = (input: Difficulties) => {
    this.setState({ difficulty: input });
  }

  checkIfGameOver = () => {
    const { correctGuesses, incorrectGuesses, difficulty } = this.state;

    if (correctGuesses.length === gameDifficulties[difficulty].correct) {
      this.setState({ gameResult: GameOutcome.WON });
    }

    if (incorrectGuesses.length === gameDifficulties[difficulty].errors) {
      this.setState({ gameResult: GameOutcome.LOST });
    }
  }

  resetGame = async () => {
    this.setState({ gameResult: null, correctGuesses: [], incorrectGuesses: [] });
    try{
      this.setState({ isLoading: true });
      await this.initializeGame();
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { card, difficulty, correctGuesses, gameResult, incorrectGuesses, isLoading } = this.state;
    console.log(this.state);
    return (
      <View style={ styles.container }>
        <View style={ styles.gameContainer }>
          <TouchableOpacity
            onPress={ () => this.setState({ modalVisible: true }) }
          >
            <Text>
              { `${ translate('difficultyPicker', 'difficulty') } ${ translate('difficulties', difficulty) }` }
            </Text>
          </TouchableOpacity>
          <View style={ { height: 20 } }/>
          <TouchableOpacity onPress={ this.resetGame } disabled={ isLoading }>
            <View style={ styles.newGameButton }>
              <Text style={ styles.newGameButtonLabel }>
                { 'New game' }
              </Text>
            </View>
          </TouchableOpacity>

          <View style={ { height: 20 } }/>
          <Card image={ card.image } loading={ isLoading } />
          <Buttons drawCard={ this.drawCard } loading={ isLoading }/>
          <View style={ [styles.scoreTrackerContainer, { left: 20 }] }>
            <ScoreTracker
              instances={ gameDifficulties[difficulty].errors }
              guesses={ incorrectGuesses }
              alignment={ 'column' }
              component={ Cross }
              style={ styles.scoreTracker }
            />
          </View>
          <View style={ [styles.scoreTrackerContainer, { right: 20 }] }>
            <ScoreTracker
              instances={ gameDifficulties[difficulty].correct }
              guesses={ correctGuesses }
              component={ Bulb }
              alignment={ 'column' }
              style={ styles.scoreTracker }
            />
          </View>
        </View>
        <Modal
          animationType={ 'fade' }
          transparent={ true }
          visible={ this.state.modalVisible }
        >
          <TouchableWithoutFeedback
            onPress={ () => this.setState({ modalVisible: false }) }
          >
            <View style={ styles.modalPicker }>
              <DifficultyPicker onChangeDifficulty={ this.onChangeDifficulty } currentDifficulty={ difficulty } />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {
          gameResult &&
          <View style={ styles.gameFinishedContainer }>
            <Text style={ styles.gameFinishedTitle }>
              { translate('gameOutcome', gameResult) }
            </Text>
            <TouchableOpacity onPress={ this.resetGame }>
              <View style={ styles.gameFinishedButton }>
                <Text style={ styles.gameFinishedButtonLabel }>
                  { 'New game' }
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newGameButton: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 3,
  },
  newGameButtonLabel: {

  },
  scoreTrackerContainer: {
    position: 'absolute',
    height: 400,
  },
  scoreTracker: {
    width: 30,
    height: 400,
  },
  modalPicker: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameFinishedContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.9,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameFinishedTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  gameFinishedButton: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'black',
    opacity: 1,
    borderColor: 'blue',
    padding: 4,
    marginTop: 20,
  },
  gameFinishedButtonLabel: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});
