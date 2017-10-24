'use strict';

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

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  for (var rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
    var row = [];
    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

console.log(generatePlayerBoard(4, 4));