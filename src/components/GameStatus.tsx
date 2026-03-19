// src/components/GameStatus.jsx
function GameStatus({ game }) {
  const turn = game.turn() === "w" ? "White" : "Black";

  if (game.isCheckmate()) {
    const winner = game.turn() === "w" ? "Black" : "White";
    return <h2>🏆 Checkmate! {winner} wins!</h2>;
  }

  if (game.isDraw()) {
    return <h2>🤝 Draw!</h2>;
  }

  if (game.isStalemate()) {
    return <h2>😐 Stalemate!</h2>;
  }

  if (game.isCheck()) {
    return <h2>⚠️ {turn} is in Check!</h2>;
  }

  return <h2>🎯 {turn}'s Turn</h2>;
}

export default GameStatus;
