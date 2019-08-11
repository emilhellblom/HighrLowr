const gameDifficulties = {
  EASY: {
    errors: 5,
    skips: 8,
    correct: 3,
  },
  MEDIUM: {
    errors: 3,
    skips: 3,
    correct: 8,
  },
  HARD: {
    errors: 2,
    skips: 1,
    correct: 15,
  },
  IMPOSSIBLE: {
    errors: 1,
    skips: 0,
    correct: 25,
  },
  FREE: {
    errors: 0,
    skips: 0,
    correct: 0,
  },
};

export {
  gameDifficulties,
};