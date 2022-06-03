export const human = "x";
export const ai = "o";

export const newBoard = () => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
];

export const equals3 = (a, b, c) => {
  return a === b && b === c && a !== "";
};

export const checkWinner = (board) => {
  let winner = null;

  // horizontal
  for (let i = 0; i < board.length; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < board.length; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }

  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }

  let isNextMovePossible = false;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      isNextMovePossible = !board[i][j];
      if (isNextMovePossible) break;
    }
    if (isNextMovePossible) break;
  }

  if (!winner && !isNextMovePossible) {
    return "tie";
  } else {
    return winner;
  }
};

export const bestMove = (board, hardMode) => {
  let bestScore = -Infinity;
  let move, score;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      // cell isEmpty?
      if (!board[i][j]) {
        board[i][j] = ai;
        score = minimax(board, false, hardMode);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }

  board[move.i][move.j] = ai;
  return board;
};

const mapScore = {
  x: -1,
  o: 1,
  tie: 0
};

const moveScore = (board, isMaximizing, hardMode) => {
  let winningScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (!board[i][j]) {
        board[i][j] = isMaximizing ? ai : human;
        const score = minimax(board, !isMaximizing, hardMode);
        board[i][j] = "";
        winningScore = isMaximizing
          ? Math.max(score, winningScore)
          : Math.min(score, winningScore);
      }
    }
  }
  return winningScore;
};

export const minimax = (board, isMaximizing, hardMode) => {
  const winner = checkWinner(board);
  if (!hardMode && Math.random() * 10 > 9.5) return 1;
  if (winner) return mapScore[winner];
  return moveScore(board, isMaximizing, hardMode);
};
