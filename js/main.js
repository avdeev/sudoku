'use strict';
$(function() {

  if (location.pathname.indexOf('/game') !== -1) {
    var $sudokuCellFull = $('#sudoku-cell-full');
    game.start(parseInt(81 - $sudokuCellFull.val()));
    statistics.cellCountRefresh(playField.getFullCellCount());

    $('#js-start').on('click', function(){
      game.start(parseInt(81 - $sudokuCellFull.val()));
      statistics.cellCountRefresh(playField.getFullCellCount());
    });

    $('#js-clear').on('click', function(){
      playField.clear();
      playField.checkSudoku();
    });

    $('#sudoku-cell-full').on('keyup keydown', function(){
      var $this = $(this);
      var sudokuCellFull = parseInt($this.val());
      if (!sudokuCellFull || sudokuCellFull < 0 || sudokuCellFull > 81) {
        $this.val('');
      }
    });
  }

  if (location.pathname.indexOf('/tests') !== -1) {
    var $testsSudokuCount = $('#tests-sudoku-count');
    var $testsSudokuCellFull = $('#tests-sudoku-cell-full');
    var sudokuForTests = [];

    $('#js-tests-full').on('click', function(){
      if (sudokuForTests) {
        sudokuTests.full(sudokuForTests);
      }
    });

    $('#js-tests-evristika').on('click', function(){
      if (sudokuForTests) {
        sudokuTests.evristika(sudokuForTests);
      }
    });

    $('#js-tests-generate').on('click', function(){
      var startTime = $.now();
      sudokuForTests = [];
      var testsSudokuCellFull = parseInt($testsSudokuCellFull.val());
      var testsSudokuCount = parseInt($testsSudokuCount.val());
      for (var i = 0; i < testsSudokuCount; i++) {
        sudokuForTests.push(sudokuGenerate.generate(81 - testsSudokuCellFull));
      }
      $('#js-tests-generate-count').html(testsSudokuCount);
      statistics.appendText('Время генерации: ' + ($.now() - startTime));
    });

    $('#statistics-clear').on('click', function(e){
      e.preventDefault();
      statistics.clear();
    });
  }  

  $('#play-field').on('keyup', 'input', function(){
    playField.checkSudoku();
    var fullCellCount = playField.getFullCellCount();
    statistics.cellCountRefresh(fullCellCount);
    if (fullCellCount == 81) {
      game.stop();
      alert(playField.checkSudokuBool() ? 'Поздравляю, вы собрали судоку!' : 'Судоку собрано неверно');
    }
  });

});