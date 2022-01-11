import React, { useEffect, useState } from 'react';
import './App.css';
const winningSolutions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
function Square({ value, status, onClick, className }: any) {
  return (
    <button data-value={value} onClick={() => onClick(value)} className={`ttt-square ${className || ""}`}>{status}</button>
  )
}
function isWinner(turn: "X" | "O", values: string[]) {
  let win = false;
  winningSolutions.forEach((solution: number[]) => {
    if (solution.every((num: number) => values[num] === turn)) {
      win = true;
    }
  })
  return win;
}
interface BoardState {
  turn: "X" | "O";
  values: string[];
  displayStatus: string;
  playCount: number;
  gameComplete?: boolean;
}
const defaults: BoardState = {
  turn: "X",
  displayStatus: "Player X's turn",
  values: Array(9),
  playCount: 0,
  gameComplete: false
};

const boardSquares = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

function Board2(props: any) {
  const [turn, setTurn] = useState<"X" | "O">(defaults.turn);
  const [displayStatus, setDisplayStatus] = useState<string>(defaults.displayStatus)
  const [values, setValues] = useState<string[]>(defaults.values);
  const getDisplayStatus = (turn: "X" | "O", newTurn: "X" | "O", values: string[]) => {
    if (isWinner(turn, values)) {
      return `Player ${turn} has won!`
    } else if (values.filter((val: string | null) => val !== undefined).length === 9) {
      return `Cat has won.`
    }
    return `Player ${newTurn}'s turn.`
  };
  const handleSquareClick = (value: number) => {
    const gameValues = [...values];
    gameValues[value] = turn;
    const newTurn = turn === "X" ? "O" : "X";
    const display = getDisplayStatus(turn, newTurn, gameValues);
    setDisplayStatus(display);
    setTurn(newTurn)
    setValues(gameValues);
  }
  const handleStartOver = () => {
    setValues(defaults.values);
    setTurn(defaults.turn);
    setDisplayStatus(defaults.displayStatus);
  }
  return (<div className="ttt-board">
    <div className='ttt-status'>
      {displayStatus}
    </div>
    <div>
      <Square value={0} status={values[0]} onClick={handleSquareClick} />
      <Square value={1} status={values[1]} onClick={handleSquareClick} />
      <Square value={2} status={values[2]} onClick={handleSquareClick} />
    </div>
    <div>
      <Square value={3} status={values[3]} onClick={handleSquareClick} />
      <Square value={4} status={values[4]} onClick={handleSquareClick} />
      <Square value={5} status={values[5]} onClick={handleSquareClick} />
    </div>
    <div>
      <Square value={6} status={values[6]} onClick={handleSquareClick} />
      <Square value={7} status={values[7]} onClick={handleSquareClick} />
      <Square value={8} status={values[8]} onClick={handleSquareClick} />
    </div>
    <button onClick={handleStartOver}>Start Over</button>
  </div>)
}
type BoardProps = {
  onComplete: (winner: "X" | "O" | "Cat") => void;
}
function Board({ onComplete }: BoardProps) {
  const [state, setState] = useState<BoardState>(defaults);
  const getDisplayStatus = (turn: "X" | "O", newTurn: "X" | "O", values: string[], playNum: number) => {
    if (isWinner(turn, values)) {
      return `Player ${turn} has won!`
    } else if (playNum === state.values.length) {
      return `Cat has won.`
    }
    return `Player ${newTurn}'s turn.`
  };
  const handleSquareClick = (value: number) => {
    const { turn, values, playCount, gameComplete } = state
    if (gameComplete || state.values[value]) {
      return;
    }
    const gameValues = [...values];
    gameValues[value] = turn;
    const newTurn = turn === "X" ? "O" : "X";
    const newPlayCount = playCount + 1;
    const display = getDisplayStatus(turn, newTurn, gameValues, newPlayCount);
    const hasWon = isWinner(turn, gameValues)
    const isDone = newPlayCount === 9 || hasWon;
    if (isDone) {
      onComplete(hasWon ? turn : "Cat")
    }
    setState({
      turn: newTurn,
      values: gameValues,
      displayStatus: display,
      playCount: newPlayCount,
      gameComplete: isDone
    });
  }
  const handleStartOver = () => {
    setState(defaults)
  }
  return (<div className="ttt-board">
    <div className='ttt-status'>
      {state.displayStatus}
    </div>
    {
      boardSquares.map((row: number[], index: number) => (
        <div key={index} className="board-row">
          {
            row.map((index: number) => {
              return (
                <Square value={index} status={state.values[index]} onClick={handleSquareClick} />
              )
            })
          }
        </div>
      ))
    }
    {/* <div className="board-row">
      <Square value={0} status={state.values[0]} onClick={handleSquareClick} />
      <Square value={1} status={state.values[1]} onClick={handleSquareClick} />
      <Square value={2} status={state.values[2]} onClick={handleSquareClick} />
    </div>
    <div className="board-row">
      <Square value={3} status={state.values[3]} onClick={handleSquareClick} />
      <Square value={4} status={state.values[4]} onClick={handleSquareClick} />
      <Square value={5} status={state.values[5]} onClick={handleSquareClick} />
    </div>
    <div className="board-row">
      <Square value={6} status={state.values[6]} onClick={handleSquareClick} />
      <Square value={7} status={state.values[7]} onClick={handleSquareClick} />
      <Square value={8} status={state.values[8]} onClick={handleSquareClick} />
    </div> */}
    <button className="startOver" onClick={handleStartOver}>Start Over</button>
  </div>)
}
interface WinnerBoard {
  X: number;
  O: number;
  Cat: number;
}
function App() {
  const [winners, setWinners] = useState<WinnerBoard>({ X: 0, O: 0, Cat: 0 })

  useEffect(() => {
    const winnersLC = window.localStorage.getItem("winners")
    if (winnersLC) {
      setWinners(JSON.parse(winnersLC))
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem("winners", JSON.stringify(winners))
  }, [winners])
  const handleComplete = (winner: "X" | "O" | "Cat") => {
    setWinners({ ...winners, [winner]: winners[winner] + 1 })
  }
  return (
    <div className="App">
      <div className="winCountBox">
        <div className="winCount">
          X: {winners.X}
        </div>
        <div className="winCount">
          O: {winners.O}
        </div>
        <div className="winCount">
          Cat: {winners.Cat}
        </div>
      </div>
      <Board onComplete={handleComplete} />
    </div>
  );
}
export default App;




