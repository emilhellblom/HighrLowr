import { Options, Difficulties, GameOutcome } from '../assets/constants';

const translations = {
  'difficultyPicker': {
    'difficulty': 'Svårighet: ',
  },
  'difficulties': {
    [Difficulties.EASY]: 'Lätt',
    [Difficulties.MEDIUM]: 'Medium',
    [Difficulties.HARD]: 'Svår',
    [Difficulties.IMPOSSIBLE]: 'Omöjlig',
  },
  'gameOutcome': {
    [GameOutcome.WON]: 'WINNER WINNER\nCHICKEN DINNER',
    [GameOutcome.LOST]: 'WASTED',
  },
  'drawCardButtons': {
    [Options.HIGHER]: 'Högre',
    [Options.LOWER]: 'Lägre',
  },
};

export default translations;