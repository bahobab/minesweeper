// const printBoard = (board) => {
//   console.log(board[0].join('|'));
//   console.log(board[1].join('|'));
//   console.log(board[2].join('|'));
//   // console.log(board);
// };
//
// let board = [
//   [' ', ' ', ' '],
//   [' ', ' ', ' '],
//   [' ', ' ', ' ']
// ];
// console.log('Current Board:');
// printBoard(board);
//
// board[0][1] = 1;
// board[2][2] = 'B';
//
// console.log('Current Board:');
// printBoard(board);

class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('GAME OVER !!!!!');
      this._board.print(this._board.playerBoard);
    } else if (!this._board.hasSafeTiles()) {
      console.log('CONGRATULATIONS... YOU WON !!!!');
    } else {
      console.log('Current Board: ');
      this._board.print(this._board.playerBoard);
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    let tile = this._playerBoard[0][0];
    // console.log('Tile', playerBoard[0][0]);
    if (tile !== ' ') {
      console.log('This tile has already been flipped!');
      return;
    } else if (tile === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]
    ];

    const numberOfRows = this._bombBoard.length;
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfBombs = 0;

    neighborOffsets.forEach((offset) => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];

      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return (this._numberOfTiles !== this.numberOfBombs);
  }

  print(board) {
    console.log(board.map(row => {
      return row.join(' | ');
    }).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    var board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      var row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];

    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
      var row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
        row.push(null);
      }
      board.push(row);
    }

    // place bombs randomly
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced != numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }

      // The code in your while loop has the potential to place bombs on top of already existing bombs.
    }

    return board;
  }
}

// generatePlayerBoard

// console.log(generatePlayerBoard(4,4));

// generateBombBoard

// getNumberOfNeighborBombs

// flipTile

// printBoard



// let playerBoard = generatePlayerBoard(3,4);
// let bombBoard = generateBombBoard(3,4,5);

// console.log('Player Board: ');
// printBoard(playerBoard);

// console.log('Bomb Board: ');
// printBoard(bombBoard)
//
// flipTile(playerBoard, bombBoard, 1, 2);
// console.log('Updated Player Board: ');
//
// printBoard(playerBoard);

const g = new Game(4,6,10);

g.playMove(3,2);
