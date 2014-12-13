'use strict';

function SudokuGenerate () {
  this.generate = function(cellEmptyInput) {
    this.refreshSudoku();

    for (var i = 0; i < this.getRandomInt(1, 9); i++) {
      this.transposeRowBig(this.getRandomInt(0, 2), this.getRandomInt(0, 2));
    }
    
    for (var i = 0; i < this.getRandomInt(1, 9); i++) {
      this.transposeColumnBig(this.getRandomInt(0, 2), this.getRandomInt(0, 2));
    }

    for (var i = 0; i < this.getRandomInt(3, 27); i++) {
      var multiplier = this.getRandomInt(0, 2);
      this.transposeRow(this.getRandomInt(0, 2) + 3 * multiplier, this.getRandomInt(0, 2) + 3 * multiplier);
    }

    for (var i = 0; i < this.getRandomInt(3, 27); i++) {
      var multiplier = this.getRandomInt(0, 2);
      this.transposeColumn(this.getRandomInt(0, 2) + 3 * multiplier, this.getRandomInt(0, 2) + 3 * multiplier);
    }

    this.removeElements(cellEmptyInput);
    return this.sudoku;
  }
  this.refreshSudoku = function() {
    this.sudoku = [
      [4, 6, 5, 2, 3, 1, 7, 8, 9],
      [8, 1, 2, 7, 6, 9, 3, 5, 4],
      [7, 9, 3, 5, 8, 4, 1, 6, 2],
      [5, 3, 9, 8, 2, 7, 6, 4, 1],
      [6, 2, 4, 1, 5, 3, 9, 7, 8],
      [1, 7, 8, 4, 9, 6, 2, 3, 5],
      [3, 8, 6, 9, 4, 2, 5, 1, 7],
      [9, 4, 7, 3, 1, 5, 8, 2, 6],
      [2, 5, 1, 6, 7, 8, 4, 9, 3]
    ]
  }
  this.transposeRow = function(row1, row2) {
    if (row1 != row2) {
      var temp = this.sudoku[row1];
      this.sudoku[row1] = this.sudoku[row2]
      this.sudoku[row2] = temp; 
    }
  }
  this.transposeColumn = function(col1, col2) {
    if (col1 != col2) {
      var temp;
      for (var i = 0; i < 9; i++) {
        temp = this.sudoku[i][col1];
        this.sudoku[i][col1] = this.sudoku[i][col2];
        this.sudoku[i][col2] = temp;
      }
    }
  }
  this.transposeRowBig = function(bigRow1, bigRow2) {
    for (var i = 0; i < 3; i++) {
      this.transposeRow(bigRow1 * 3 + i, bigRow2 * 3 + i);  
    }
  }
  this.transposeColumnBig = function(bigCol1, bigCol2) {
    for (var i = 0; i < 3; i++) {
      this.transposeColumn(bigCol1 * 3 + i, bigCol2 * 3 + i);  
    } 
  }
  this.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  this.removeElements = function(count) {
    var removeCounter = 0;
    var rndX, rndY;
    while(removeCounter < count) {
      rndX = this.getRandomInt(0, 8);
      rndY = this.getRandomInt(0, 8);
      if (this.sudoku[rndX][rndY]) {
        this.sudoku[rndX][rndY] = 0;
        removeCounter++;
      }
    }
  }
}

window.sudokuGenerate = new SudokuGenerate();