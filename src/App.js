import { useState } from "react";
import { human, bestMove, newBoard, checkWinner } from "./util";

import "./styles.css";

export default function App() {
  const [board, setBoard] = useState(newBoard());
  const [isHardMode, setHardMode] = useState(false);

  const announceWinner = () => {
    const winner = checkWinner(board);
    let status;
    switch (winner) {
      case "x":
        status = "`x` winner !";
        break;
      case "o":
        status = "`o` winner !";
        break;
      case "tie":
        status = "It's a `tie`";
        break;
      default:
    }

    if (status) {
      setTimeout(() => {
        alert(status);
        setBoard(newBoard());
      }, 20);
      return true;
    }
  };

  const onPress = (i, j) => {
    if (board[i][j]) {
      return alert("choose empty cell");
    }
    board[i][j] = human;
    setBoard([...board]);
    if (announceWinner()) return;
    setTimeout(aiTurn, 20);
  };

  const aiTurn = () => {
    setBoard(bestMove(board, isHardMode));
    announceWinner();
  };

  return (
    <div className="App">
      <div className="title">Tic Tac Toe</div>
      <div className="level">
        <input
          type="checkbox"
          checked={isHardMode}
          onChange={() => setHardMode(!isHardMode)}
        />
        <span className="text">hard</span>
      </div>
      <div className="board">
        {board.map((row, i) => (
          <div
            key={"row-" + i}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {row.map((cell, j) => (
              <div
                key={"col-" + j}
                className="cell"
                onClick={() => onPress(i, j)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
