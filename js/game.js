'use strict';

function Game () {
  this.start = function(cellEmptyInput) {
    playField.empty();
    playField.set(sudokuGenerate.generate(cellEmptyInput));
    timer.start();
  } 
  this.stop = function() {
    // проверить решение
    // остановить время
    timer.stop();
  }
}

window.game = new Game();