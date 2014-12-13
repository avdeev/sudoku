'use strict';

function SudokuObject(sudokuArr) {
  this.sudokuArr = sudokuArr;
  this.getRow = function(y) {
    return this.sudokuArr[y];
  }
  this.getColumn = function(x) {
    var column;
    for (var y = 0; y < 9; y++) {
      column.push(this.sudokuArr[y][x]);
    }
    return column;
  }
  this.checkSudoku = function() {

  }
}