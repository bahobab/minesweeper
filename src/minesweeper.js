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
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [
    [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]
  ];

  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;

  neighborOffsets.forEach((offset) => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];

    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex, neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });

  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  let tile = playerBoard[0][0];
  // console.log('Tile', playerBoard[0][0]);
  if (tile !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (tile === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

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

flipTile(playerBoard, bombBoard, 1, 2);
console.log('Updated Player Board: ');

printBoard(playerBoard);
