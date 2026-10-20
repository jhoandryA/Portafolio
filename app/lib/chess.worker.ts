import { Chess, type Move } from "chess.js";

const values: Record<string, number> = {
  p: 100,
  n: 320,
  b: 335,
  r: 500,
  q: 900,
  k: 20000,
};
function evaluate(game: Chess) {
  if (game.isCheckmate()) return game.turn() === "w" ? -100000 : 100000;
  if (game.isDraw()) return 0;
  let score = 0;
  for (const rank of game.board())
    for (const piece of rank) {
      if (!piece) continue;
      const file = piece.square.charCodeAt(0) - 97;
      const row = Number(piece.square[1]) - 1;
      const center = 3.5 - (Math.abs(file - 3.5) + Math.abs(row - 3.5)) / 2;
      const advance = piece.color === "w" ? row : 7 - row;
      const position =
        piece.type === "p"
          ? advance * 8 + center * 5
          : piece.type === "n" || piece.type === "b"
            ? center * 14
            : center * 2;
      score += (values[piece.type] + position) * (piece.color === "w" ? 1 : -1);
    }
  return score;
}
function sortedMoves(game: Chess): Move[] {
  return game
    .moves({ verbose: true })
    .sort(
      (a, b) =>
        (values[b.captured || ""] || 0) - (values[a.captured || ""] || 0),
    );
}
function search(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
): number {
  if (depth === 0 || game.isGameOver()) return evaluate(game);
  const maximizing = game.turn() === "w";
  let best = maximizing ? -Infinity : Infinity;
  for (const move of sortedMoves(game)) {
    game.move(move);
    const score = search(game, depth - 1, alpha, beta);
    game.undo();
    best = maximizing ? Math.max(best, score) : Math.min(best, score);
    if (maximizing) alpha = Math.max(alpha, best);
    else beta = Math.min(beta, best);
    if (beta <= alpha) break;
  }
  return best;
}
const worker = self as unknown as {
  onmessage:
    | ((event: MessageEvent<{ fen: string; id: number }>) => void)
    | null;
  postMessage: (value: unknown) => void;
};
worker.onmessage = (event) => {
  const { fen, id } = event.data;
  const game = new Chess(fen);
  const maximizing = game.turn() === "w";
  let bestScore = maximizing ? -Infinity : Infinity;
  let bestMove: Move | undefined;
  for (const move of sortedMoves(game)) {
    game.move(move);
    const score = search(game, 2, -Infinity, Infinity);
    game.undo();
    if (!bestMove || (maximizing ? score > bestScore : score < bestScore)) {
      bestScore = score;
      bestMove = move;
    }
  }
  worker.postMessage({
    id,
    move: bestMove
      ? { from: bestMove.from, to: bestMove.to, promotion: "q" }
      : null,
  });
};
export {};
