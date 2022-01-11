import React from 'react';
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

interface SquareProps {
  value: number;
  status: "X" | "O" | "";
  onClick: (i: number) => void;
}

interface SquareState {
  value: string | null;
}

//class component
class Square extends React.Component<SquareProps, SquareState> {
  render() {
    const { value, onClick, status } = this.props;
    return (
      <button
        className="square"
        onClick={() => onClick(value)}>
        {status}
      </button>
    )
  }
}

interface BoardState {
  turn: 'x' | 'o';
  gameStatus?: string,
  x: number[];
  o: number[]
}
const defaultState: BoardState = {
  turn: 'x',
  gameStatus: "",
  x: [],
  o: []
}

export class Board extends React.Component {

  state: BoardState = defaultState;

  getSquareStatus(i: number) {
    if (this.state.x.includes(i)) {
      return "X";
    }
    else if (this.state.o.includes(i)) {
      return "O";
    }
    else {
      return "";
    }
  }

  checkSolution(values: number[]) {
    let win = false;
    winningSolutions.forEach((solution: number[]) => {
      if (solution.every((value: number) => values.includes(value))) {
        win = true;
      }
    })
    return win;
  }


  renderSquare(i: number) {
    return <Square
      value={i}
      status={this.getSquareStatus(i)}
      onClick={(value: number) => {
        if (this.state.gameStatus || this.getSquareStatus(i) !== "") {
          return;
        }
        const state = { ...this.state } as BoardState;
        state[state.turn].push(value);

        if (this.checkSolution(state[state.turn])) {
          state.gameStatus = `Player ${state.turn.toUpperCase()} wins!`;
        }
        else if (state.x.length + state.o.length === 9) {
          state.gameStatus = `It's a tie`
        }

        state.turn = state.turn === 'x' ? 'o' : 'x'; //ternary statement = if turn is x then flip it to o, otherwise it's x
        this.setState(state);
      }} />;
  }

  handleStartOver = () => {
    this.setState(defaultState)
  }

  render() {
    return (
      <div>
        <div className="status">{!this.state.gameStatus ? `Current Player: ${this.state.turn.toUpperCase()}` : this.state.gameStatus}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button onClick={this.handleStartOver}>Start Over</button>
      </div>
    )
  }
}

//functional component
function App() {
  return <Board />
}

export default App;
