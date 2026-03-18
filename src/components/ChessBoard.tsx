// src/components/ChessBoard.jsx
import { useState, useCallback } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";

function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  // Helper to safely mutate game state
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
          promotion: "q", // Always promote to queen for now
        });
      } catch {
        moveResult = null;
      }
    });

    // If the move was illegal, return false to snap piece back
    if (moveResult === null) return false;

    return true;
  }

  return (
    <div style={{ width: "560px", margin: "0 auto" }}>
      <Chessboard options={{ position: game.fen(), onPieceDrop: onDrop }} />
    </div>
  );
}

export default ChessBoard;
