// src/components/ChessBoard.jsx
import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import GameStatus from "./GameStatus";

function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  const safeGameMutate = useCallback((modify: (game: Chess) => void) => {
    setGame((prevGame) => {
      const gameCopy = new Chess(prevGame.fen());
      modify(gameCopy);
      return gameCopy;
    });
  }, []);

  function onDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    let moveResult = null;
    if (!targetSquare) return false;

    safeGameMutate((gameCopy) => {
      try {
        moveResult = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q",
        });
      } catch {
        moveResult = null;
      }
    });

    if (moveResult === null) return false;
    return true;
  }

  function resetGame() {
    setGame(new Chess());
  }

  return (
    <div style={{ width: "560px", margin: "0 auto" }}>
      <GameStatus game={game} />
      <Chessboard options={{ position: game.fen(), onPieceDrop: onDrop }} />
      <button onClick={resetGame} style={{ marginTop: "16px", padding: "8px 24px" }}>
        🔄 New Game
      </button>
    </div>
  );
}

export default ChessBoard;
