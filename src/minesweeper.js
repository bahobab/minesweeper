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

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  var board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// console.log(generatePlayerBoard(4,4));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  var board = [];
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced != numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
    // The code in your while loop has the potential to place bombs on top of already existing bombs.
  }

  return board;
};

let printBoard = (board) => {
  console.log(board.map(row => {
    return row.join(' | ');
  }).join('\n'));
};

let playerBoard = generatePlayerBoard(3,4);
let bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard)
