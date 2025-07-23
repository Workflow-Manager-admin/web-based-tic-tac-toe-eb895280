import React, { useState, useEffect } from "react";
import "./App.css";

/**
 * Palette:
 * Primary: #0d47a1; Secondary: #1976d2; Accent: #ffeb3b
 * Board and UI are minimal and responsive. All logic contained here.
 */

// Helpers for game logic
const emptyBoard = () => Array(3).fill(null).map(() => Array(3).fill(null));
const getNextPlayer = player => (player === "X" ? "O" : "X");

/**
 * PUBLIC_INTERFACE
 * Minimalistic and responsive Tic Tac Toe game UI and logic.
 * - Manages state for board, turn, win, and draw.
 * - Indicates current player, notifies on game over, and provides reset.
 */
function App() {
  // Board is a 3x3 array, each cell: null | "X" | "O"
  const [board, setBoard] = useState(emptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null); // null | "X" | "O" | "Draw"
  const [moves, setMoves] = useState(0);

  // Reset board to initial state
  // PUBLIC_INTERFACE
  const handleReset = () => {
    setBoard(emptyBoard());
    setCurrentPlayer("X");
    setWinner(null);
    setMoves(0);
  };

  // Check for win or draw on every move
  useEffect(() => {
    const checkWin = (b) => {
      // Check rows, columns, and two diagonals
      for (let i = 0; i < 3; ++i) {
        if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
        if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
      }
      if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
      if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
      return null;
    };

    const winnerPlayer = checkWin(board);
    if (winnerPlayer) setWinner(winnerPlayer);
    else if (moves === 9) setWinner("Draw");
    // else (not finished)
  }, [board, moves]);

  // PUBLIC_INTERFACE
  // Handles click on a cell of the board
  const handleSquareClick = (r, c) => {
    if (winner || board[r][c]) return; // can't play if game over or filled
    const newBoard = board.map((row, rowIdx) => 
      rowIdx !== r ? row : row.map((cell, cellIdx) => cellIdx !== c ? cell : currentPlayer)
    );
    setBoard(newBoard);
    setCurrentPlayer(getNextPlayer(currentPlayer));
    setMoves(m => m + 1);
  };

  // Styling for player and winner
  const playerColor = { X: "var(--ttt-x)", O: "var(--ttt-o)" };

  return (
    <div className="App ttt-app-bg">
      <main className="ttt-main">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-board" data-testid="ttt-board">
          {board.map((row, rowIdx) =>
            <div className="ttt-board-row" key={rowIdx}>
              {row.map((cell, colIdx) =>
                <button
                  className="ttt-cell"
                  key={colIdx}
                  aria-label={`Row ${rowIdx + 1}, Col ${colIdx + 1}`}
                  onClick={() => handleSquareClick(rowIdx, colIdx)}
                  disabled={!!cell || !!winner}
                  style={{ color: cell ? playerColor[cell] : undefined }}
                  data-testid={`cell-${rowIdx}-${colIdx}`}
                >
                  {cell}
                </button>
              )}
            </div>
          )}
        </div>
        <div className="ttt-controls" data-testid="ttt-controls">
          {!winner ? (
            <div className="ttt-status">
              Turn: <span style={{ color: playerColor[currentPlayer], fontWeight: 600 }}>{currentPlayer}</span>
            </div>
          ) : winner === "Draw" ? (
            <div className="ttt-status ttt-draw">It's a draw!</div>
          ) : (
            <div className="ttt-status ttt-win">
              Winner: <span style={{ color: playerColor[winner], fontWeight: 700 }}>{winner}</span>
            </div>
          )}
          <button className="ttt-reset-btn" onClick={handleReset}>
            {winner ? "Replay" : "Reset"}
          </button>
        </div>
        <footer className="ttt-footer">
          <span>
            <span className="ttt-foot-title">Minimal Tic Tac Toe</span>
            &nbsp;&ndash; React {React.version}
          </span>
        </footer>
      </main>
    </div>
  );
}

export default App;
