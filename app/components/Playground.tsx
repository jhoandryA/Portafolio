"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Chess, type Square } from "chess.js";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiRefreshCw,
  FiRepeat,
  FiSend,
  FiMessageSquare,
} from "react-icons/fi";
import { profile } from "@/app/lib/constants";

const symbols: Record<string, string> = {
  wk: "♔",
  wq: "♕",
  wr: "♖",
  wb: "♗",
  wn: "♘",
  wp: "♙",
  bk: "♚",
  bq: "♛",
  br: "♜",
  bb: "♝",
  bn: "♞",
  bp: "♟",
};
const pieceNames: Record<string, string> = {
  k: "rey",
  q: "dama",
  r: "torre",
  b: "alfil",
  n: "caballo",
  p: "peón",
};
const startingFen = new Chess().fen();
type GameState = {
  fen: string;
  history: string[];
  lastMove: { from: string; to: string } | null;
};
type Message = {
  role: "user" | "guide";
  text: string;
  link?: { href: string; label: string };
};
const questions = [
  "¿Qué proyectos tienes?",
  "¿Con qué trabajas?",
  "¿Estás disponible?",
];
function answer(question: string): Message {
  const q = question
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  if (/proyect|trabajo|portafolio|web|e-commerce/.test(q))
    return {
      role: "guide",
      text: "Jhoandry ha desarrollado sitios como FortexMan360, Shiyan Ryans y Cody Motors; colaboró en FOCCADI y creó sistemas como PostulaPe, el backend de gestión académica y EquilibrioS. Son siete proyectos con distintos retos.",
      link: { href: "/proyectos", label: "Explorar los siete proyectos" },
    };
  if (/tecnolog|lenguaj|stack|herramient|react|java|python|trabajas/.test(q))
    return {
      role: "guide",
      text: "Combina React, Next.js y WordPress para la web; Java, Spring Boot y Node.js para el backend; y MySQL, PostgreSQL y SQL Server para los datos. También trabaja con JavaScript, TypeScript, C#, PHP y Python.",
      link: { href: "/#technologies", label: "Conocer sus herramientas" },
    };
  if (
    /disponib|contact|correo|contrat|freelance|precio|cotiza|presupuesto/.test(
      q,
    )
  )
    return {
      role: "guide",
      text: `Está disponible para proyectos freelance, prácticas y oportunidades de desarrollo. Cuéntale tu idea por el formulario o escríbele a ${profile.email}. El alcance y el presupuesto se conversan según cada proyecto.`,
      link: { href: "/#contact", label: "Conversar con Jhoandry" },
    };
  if (/experien|estudi|sise|formacion|atento|trayector|cv|curriculum/.test(q))
    return {
      role: "guide",
      text: "Estudia Desarrollo de Sistemas de Información y Software en el Instituto SISE. Complementa su formación con dos certificaciones: fundamentos del desarrollo web moderno y desarrollo con WordPress.",
      link: { href: profile.cv, label: "Ver su currículum" },
    };
  if (/peru|lima|donde|ubic|pais/.test(q))
    return {
      role: "guide",
      text: "Jhoandry está en Lima, Perú. Su portafolio reúne trabajo en desarrollo web, backend y aplicaciones de gestión.",
      link: { href: "/#about", label: "Conocer un poco más" },
    };
  if (/servici|ofrec|ayuda|sistema/.test(q))
    return {
      role: "guide",
      text: "Puede ayudarte con desarrollo web, e-commerce, diseño UI/UX, APIs, bases de datos y sistemas de gestión. Su enfoque es conectar una experiencia clara con una lógica sólida.",
      link: { href: "/#services", label: "Explorar sus servicios" },
    };
  if (/ajedrez|jueg|regla|mover/.test(q))
    return {
      role: "guide",
      text: "Juegas con las piezas blancas. Selecciona una pieza para ver sus movimientos disponibles y elige una casilla. Puedes girar el tablero y empezar una nueva partida cuando quieras. ¡Piensa tu siguiente movimiento!",
    };
  if (/hola|buen|gracia|saludo/.test(q))
    return {
      role: "guide",
      text: "¡Hola! Qué bueno verte por aquí. Puedes preguntarme por los proyectos, la experiencia o las herramientas de Jhoandry. Y si te apetece, jugar una partida.",
    };
  return {
    role: "guide",
    text: "Puedo orientarte sobre el trabajo de Jhoandry: sus proyectos, tecnologías, experiencia y disponibilidad. Para conversar sobre una idea en particular, lo mejor es escribirle directamente.",
    link: { href: "/#contact", label: "Hablemos de tu idea" },
  };
}
function spanishMove(move: string) {
  return move
    .replace(
      /^[KQRBN]/,
      (piece) => ({ K: "R", Q: "D", R: "T", B: "A", N: "C" })[piece] || piece,
    )
    .replace(/=Q/, "=D");
}

export default function Playground() {
  const [state, setState] = useState<GameState>({
    fen: startingFen,
    history: [],
    lastMove: null,
  });
  const [selected, setSelected] = useState<Square | null>(null);
  const [focused, setFocused] = useState<Square>("e2");
  const [flipped, setFlipped] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "guide",
      text: "¡Hola! Soy la guía del portafolio de Jhoandry. Puedo ayudarte a conocer sus proyectos, su experiencia y cómo contactarlo. ¿Por dónde empezamos?",
    },
  ]);
  const [input, setInput] = useState("");
  const [replying, setReplying] = useState(false);
  const workerRef = useRef<Worker | null>(null);
  const requestId = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetDialog = useRef<HTMLDialogElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const game = useMemo(() => new Chess(state.fen), [state.fen]);
  const thinking = game.turn() === "b" && !game.isGameOver();
  const legalMoves = useMemo(
    () =>
      selected
        ? game.moves({ square: selected, verbose: true }).map((move) => move.to)
        : [],
    [selected, game],
  );
  const files = flipped
    ? ["h", "g", "f", "e", "d", "c", "b", "a"]
    : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];
  const squares = ranks.flatMap((rank) =>
    files.map((file) => `${file}${rank}` as Square),
  );
  const status = game.isCheckmate()
    ? game.turn() === "w"
      ? "Jaque mate. Esta vez ganaron las negras."
      : "¡Jaque mate! Ganaste la partida."
    : game.isDraw()
      ? "Partida en tablas. ¿Jugamos otra?"
      : thinking
        ? "Las negras están pensando…"
        : game.isCheck()
          ? "Estás en jaque. Encuentra tu movimiento."
          : "Tu turno · juegan las blancas";

  useEffect(() => {
    try {
      workerRef.current = new Worker(
        new URL("../lib/chess.worker.ts", import.meta.url),
      );
    } catch {
      workerRef.current = null;
    }
    return () => {
      workerRef.current?.terminate();
      if (replyTimer.current) clearTimeout(replyTimer.current);
    };
  }, []);
  useEffect(() => {
    if (game.turn() !== "b" || game.isGameOver()) return;
    const id = ++requestId.current;
    const fen = state.fen;
    let cancelled = false;
    const apply = (
      move: { from: string; to: string; promotion?: string } | null,
    ) => {
      if (!move || cancelled) return;
      setState((previous) => {
        if (previous.fen !== fen) return previous;
        const next = new Chess(previous.fen);
        try {
          const played = next.move(move);
          return {
            fen: next.fen(),
            history: [...previous.history, played.san],
            lastMove: { from: played.from, to: played.to },
          };
        } catch {
          return previous;
        }
      });
    };
    const fallback = () => {
      const moves = game.moves({ verbose: true });
      const move = moves.sort(
        (a, b) => Number(!!b.captured) - Number(!!a.captured),
      )[0];
      if (move) apply(move);
    };
    const worker = workerRef.current;
    const timeout = setTimeout(fallback, 6000);
    if (worker) {
      worker.onmessage = (event) => {
        if (event.data.id === id) {
          clearTimeout(timeout);
          apply(event.data.move);
        }
      };
      worker.onerror = () => {
        clearTimeout(timeout);
        fallback();
      };
      worker.postMessage({ fen, id });
    } else {
      clearTimeout(timeout);
      setTimeout(fallback, 400);
    }
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [game, state.fen]);
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, replying]);
  const move = (square: Square) => {
    setFocused(square);
    if (thinking || game.isGameOver()) return;
    if (selected && legalMoves.includes(square)) {
      const next = new Chess(state.fen);
      const played = next.move({ from: selected, to: square, promotion: "q" });
      setState({
        fen: next.fen(),
        history: [...state.history, played.san],
        lastMove: { from: played.from, to: played.to },
      });
      setSelected(null);
    } else {
      const piece = game.get(square);
      setSelected(piece?.color === "w" ? square : null);
    }
  };
  const reset = () => {
    requestId.current++;
    setState({ fen: startingFen, history: [], lastMove: null });
    setSelected(null);
    setFocused("e2");
    resetDialog.current?.close();
  };
  const send = (text = input) => {
    const question = text.trim();
    if (!question || replying) return;
    setMessages((previous) => [...previous, { role: "user", text: question }]);
    setInput("");
    setReplying(true);
    replyTimer.current = setTimeout(() => {
      setMessages((previous) => [...previous, answer(question)]);
      setReplying(false);
    }, 450);
  };
  const boardKeys = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const delta: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 8,
      ArrowUp: -8,
    };
    if (!(event.key in delta)) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(63, index + delta[event.key]));
    setFocused(squares[next]);
    boardRef.current
      ?.querySelector<HTMLButtonElement>(`[data-index="${next}"]`)
      ?.focus();
  };
  return (
    <main id="main-content" className="playground-page content-width">
      <Link href="/" className="back-link">
        <FiArrowLeft /> Volver al inicio
      </Link>
      <div className="playground-intro">
        <div>
          <h1>
            Un movimiento
            <br />
            <span className="gradient-text">a la vez.</span>
          </h1>
        </div>
        <p>
          Crear también es explorar, jugar y pensar distinto.
          <br />
          Tómate una pausa y conoce un poco más de mi trabajo.
        </p>
      </div>
      <div className="playground-layout">
        <section className="portfolio-chat" aria-labelledby="chat-title">
          <div className="chat-header">
            <FiMessageSquare />
            <div>
              <h2 id="chat-title">Conoce mi trabajo</h2>
              <span>Guía del portafolio</span>
            </div>
            <span className="status-dot" />
          </div>
          <div
            className="chat-messages"
            ref={chatRef}
            role="log"
            aria-label="Conversación sobre el portafolio"
            aria-live="polite"
          >
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.role}`}>
                <span className="chat-sender">
                  {message.role === "guide" ? "GUÍA" : "TÚ"}
                </span>
                <p>{message.text}</p>
                {message.link && (
                  <Link href={message.link.href} className="chat-action">
                    {message.link.label}
                    <FiArrowUpRight />
                  </Link>
                )}
              </div>
            ))}
            {replying && (
              <div
                className="chat-typing"
                role="status"
                aria-label="Preparando respuesta"
              >
                <i />
                <i />
                <i />
              </div>
            )}
          </div>
          <div className="chat-questions">
            {questions.map((question) => (
              <button
                key={question}
                onClick={() => send(question)}
                disabled={replying}
              >
                {question}
                <FiArrowUpRight />
              </button>
            ))}
          </div>
          <form
            className="chat-input-form"
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <label htmlFor="portfolio-question" className="sr-only">
              Pregunta sobre el portafolio
            </label>
            <input
              id="portfolio-question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="¿Qué te gustaría conocer?"
              maxLength={300}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={replying || !input.trim()}
              aria-label="Enviar pregunta a la guía"
            >
              <FiSend />
            </button>
          </form>
        </section>
        <section className="chess-section" aria-label="Partida de ajedrez">
          <div className="player-bar">
            <div className="player-avatar">
              JA<span>.</span>
            </div>
            <div>
              <strong>El otro lado del tablero</strong>
              <span>
                {thinking
                  ? "Pensando el siguiente movimiento…"
                  : "Modo práctica · negras"}
              </span>
            </div>
            <span className="player-color black" />
          </div>
          <div
            className="chess-board"
            ref={boardRef}
            role="grid"
            aria-label="Tablero de ajedrez. Juegas con blancas. Usa las flechas del teclado para recorrerlo."
          >
            {squares.map((square, index) => {
              const piece = game.get(square);
              const light =
                (square.charCodeAt(0) - 97 + Number(square[1])) % 2 === 0;
              const available = legalMoves.includes(square);
              return (
                <button
                  type="button"
                  role="gridcell"
                  key={square}
                  data-square={square}
                  data-index={index}
                  tabIndex={focused === square ? 0 : -1}
                  aria-selected={selected === square}
                  aria-label={`${square}, ${piece ? `${pieceNames[piece.type]} ${piece.color === "w" ? "blanco" : "negro"}` : "casilla vacía"}${available ? ", movimiento disponible" : ""}`}
                  onKeyDown={(event) => boardKeys(event, index)}
                  onClick={() => move(square)}
                  className={`chess-square ${light ? "light" : "dark"} ${selected === square ? "is-selected" : ""} ${state.lastMove?.from === square || state.lastMove?.to === square ? "is-last-move" : ""} ${piece?.type === "k" && piece.color === game.turn() && game.isCheck() ? "is-check" : ""}`}
                >
                  {index % 8 === 0 && (
                    <span className="board-rank" aria-hidden="true">
                      {square[1]}
                    </span>
                  )}
                  {index >= 56 && (
                    <span className="board-file" aria-hidden="true">
                      {square[0]}
                    </span>
                  )}
                  {piece && (
                    <span
                      className={`chess-piece ${piece.color === "w" ? "white" : "black"}`}
                      aria-hidden="true"
                    >
                      {symbols[`${piece.color}${piece.type}`]}
                    </span>
                  )}
                  {available && (
                    <span
                      className={`legal-move ${piece ? "is-capture" : ""}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
          <div className="player-bar bottom">
            <div className="player-avatar you">TÚ</div>
            <div>
              <strong>Tu siguiente movimiento</strong>
              <span>Juegas con blancas</span>
            </div>
            <span className="player-color white" />
          </div>
          <p className="board-help">
            Selecciona una pieza y elige una casilla. También puedes usar las
            flechas y Enter.
          </p>
        </section>
        <aside className="chess-sidebar">
          <div className="game-status" role="status" aria-live="polite">
            <span className="status-dot" />
            <p>{status}</p>
          </div>
          <div className="move-history">
            <h2>LA PARTIDA</h2>
            <div className="move-history-head">
              <span>#</span>
              <span>BLANCAS</span>
              <span>NEGRAS</span>
            </div>
            <div className="move-history-list">
              {state.history.length === 0 ? (
                <p className="history-empty">
                  Todas las buenas partidas
                  <br />
                  empiezan con un movimiento.
                </p>
              ) : (
                Array.from(
                  { length: Math.ceil(state.history.length / 2) },
                  (_, i) => (
                    <div className="move-row" key={i}>
                      <span>{i + 1}.</span>
                      <span>{spanishMove(state.history[i * 2])}</span>
                      <span>
                        {state.history[i * 2 + 1]
                          ? spanishMove(state.history[i * 2 + 1])
                          : "—"}
                      </span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>
          <div className="game-controls">
            <button
              onClick={() =>
                state.history.length
                  ? resetDialog.current?.showModal()
                  : reset()
              }
            >
              <FiRefreshCw /> Nueva partida
            </button>
            <button onClick={() => setFlipped((value) => !value)}>
              <FiRepeat /> Girar tablero
            </button>
          </div>
          <div className="playground-contact">
            <span>¿PASAMOS DE LAS IDEAS AL CÓDIGO?</span>
            <Link href="/#contact">
              Conversemos <FiArrowRight />
            </Link>
          </div>
        </aside>
      </div>
      <dialog
        ref={resetDialog}
        className="reset-dialog"
        aria-labelledby="reset-dialog-title"
      >
        <h2 id="reset-dialog-title">¿Empezamos otra partida?</h2>
        <p>La partida actual se reiniciará.</p>
        <div>
          <button
            className="outline-button"
            onClick={() => resetDialog.current?.close()}
          >
            Seguir jugando
          </button>
          <button className="pill-button" onClick={reset}>
            Nueva partida <FiArrowRight />
          </button>
        </div>
      </dialog>
    </main>
  );
}
