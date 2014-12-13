'use strict';
var backtracking_call;
function SudokuTests () {
  this.getMin = function(arr) {
    var min;
    for (var i = 0; i < arr.length; i++) {
      if (typeof min == 'undefined') {
        min = arr[i];
      }
      if (min > arr[i]) {
        min = arr[i];
      }
    }
    return min;
  }
  this.getMax = function(arr) {
    var max;
    for (var i = 0; i < arr.length; i++) {
      if (typeof max == 'undefined') {
        max = arr[i];
      }
      if (max < arr[i]) {
        max = arr[i];
      }
    }
    return max;
  }
  this.getAvg = function(arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum / arr.length;
  }
  this.full = function(sudokuTests){
    var sudoku;
    var startTime = $.now();

    var backArr = [];
    var checkedArr = [];
    for (var i = 0; i < sudokuTests.length; i++) {
      sudoku = new SudokuFull(sudokuTests[i]);
      backArr.push(sudoku.back());
      checkedArr.push(sudoku.checked());
    }

    statistics.appendText('Возвратов назад: {max: ' + this.getMax(backArr) + ', min: ' + this.getMin(backArr) + ', avg: ' + this.getAvg(backArr) + '}');
    statistics.appendText('Проверок: {max: ' + this.getMax(checkedArr) + ', min: ' + this.getMin(checkedArr) + ', avg: ' + this.getAvg(checkedArr) + '}');
    statistics.appendText('Время выполнения: ' + ($.now() - startTime));
  }
  this.evristika = function(sudokuTests){
    var sudoku;
    var startTime = $.now();
    var backtracking_call_arr = [];
    var steps_arr = [];
    for (var i = 0; i < sudokuTests.length; i++) {
      backtracking_call = 0;
      sudoku = new SudokuEvristika(sudokuTests[i]);
      backtracking_call_arr.push(backtracking_call);
      steps_arr.push(sudoku.steps());
    }

    statistics.appendText('Обратный поиск: {max: ' + this.getMax(backtracking_call_arr) + ', min: ' + this.getMin(backtracking_call_arr) + ', avg: ' + this.getAvg(backtracking_call_arr) + '}');
    statistics.appendText('Количество шагов: {max: ' + this.getMax(steps_arr) + ', min: ' + this.getMin(steps_arr) + ', avg: ' + this.getAvg(steps_arr) + '}');

    statistics.appendText('Время выполнения: ' + ($.now() - startTime));
    
  }
}

window.sudokuTests = new SudokuTests();