'use strict';

function PlayField () {
  this.sudokuSize = 9;
  this.init = function() {
    this.$container = $('#play-field');

    this.$container.find('input')
      .on('keyup keydown', function(){
        var value = $(this).val();
        if (!/\d/.test(value) || value == '0') {
          $(this).val('');
        }
      });
  }
  this.set = function(arr) {
    for (var x = 0; x < arr.length; x++) {
      for (var y = 0; y < arr[x].length; y++) {
        if (arr[x][y]) {
          this.setCell(y, x, arr[x][y]);
          this.disabledCell(y, x);
        }
      }
    }
  }
  this.setFromEvristika = function(arr) {
    for (var x = 0; x < arr.length; x++) {
      for (var y = 0; y < arr[x].length; y++) {
        if (arr[x][y][0]) {
          this.setCell(y, x, arr[x][y][0]);
          this.disabledCell(y, x);
        }
      }
    }
  }
  this.getCell = function(x, y) {
    return this.$container.find('.cell.x-' + x + '.y-' + y + ' input').val();
  }
  this.setCell = function(x, y, value) {
    this.$container.find('.cell.x-' + x + '.y-' + y + ' input').val(value);
  }
  this._getRowInputs = function(y) {
    return this.$container.find('.cell.y-' + y + ' input');
  }
  this.getRow = function(y) {
    return this._getValueFromInputs(this._getRowInputs(y));
  }
  this._getColumnInputs = function(x) {
    return this.$container.find('.cell.x-' + x + ' input');
  }
  this.getColumn = function(x) {
    return this._getValueFromInputs(this._getColumnInputs(x));
  }
  this._getBlockInputs = function(blockNumber) {
    return this.$container.find('.block.block-' + blockNumber + ' input');
  }
  this.getBlock = function(blockNumber) {
    return this._getValueFromInputs(this._getBlockInputs(blockNumber));
  }
  this._getValueFromInputs = function($inputs) {
    var arr = [];
    $inputs.each(function(){
      var cellValue = $(this).val();
      if (cellValue) {
        arr.push(parseInt(cellValue));
      }
    });
    return arr;
  }
  this.disabledCell = function(x, y) {
    this.$container.find('.cell.x-' + x + '.y-' + y + ' input').attr('disabled', true);
  }
  this.enableCell = function(x, y) {
    this.$container.find('.cell.x-' + x + '.y-' + y + ' input').attr('disabled', false);
  }
  this.empty = function() {
    this.$container.find('input').val('').attr('disabled', false); 
  }
  this.clear = function() {
    this.$container.find('input[disabled!="disabled"]').val('');
  }
  this.checkRow = function(y) {
    return this._checkArray(this.getRow(y));
  }
  this.checkColumn = function(x) {
    return this._checkArray(this.getColumn(x));
  }
  this.checkBlock = function(blockNumber) {
    return this._checkArray(this.getBlock(blockNumber));
  }
  this.checkRows = function() {
    var errorArr = [];
    for (var y = 0; y < this.sudokuSize; y++) {
      if (!this.checkRow(y)) {
        errorArr.push(y);
      }
    }
    return errorArr;
  }
  this.checkColumns = function() {
    var errorArr = [];
    for (var x = 0; x < this.sudokuSize; x++) {
      if (!this.checkColumn(x)) {
        errorArr.push(x);
      }
    }
    return errorArr;
  }
  this.checkBlocks = function() {
    var errorArr = [];
    for (var blockNumber = 0; blockNumber < this.sudokuSize; blockNumber++) {
      if (!this.checkBlock(blockNumber)) {
        errorArr.push(blockNumber);
      }
    }
    return errorArr;
  }
  this.getGetCheckSudokuValue = function() {
    return {
      rows: this.checkRows(),
      columns: this.checkColumns(),
      blocks: this.checkBlocks()
    }
  }
  this.checkSudoku = function() {
    var checkSudokuValues = this.getGetCheckSudokuValue();

    this.sudokuRight();

    for (var i = 0; i < checkSudokuValues.rows.length; i++) {
      this.rowError(checkSudokuValues.rows[i]);
    }

    for (var i = 0; i < checkSudokuValues.columns.length; i++) {
      this.columnError(checkSudokuValues.columns[i]);
    }

    for (var i = 0; i < checkSudokuValues.blocks.length; i++) {
      this.blockError(checkSudokuValues.blocks[i]);
    }
  }
  this.checkSudokuBool = function() {
    var checkSudokuValues = this.getGetCheckSudokuValue();
    return !(!!checkSudokuValues.rows.length || !!checkSudokuValues.columns.length || !!checkSudokuValues.blocks.length);
  }
  this._checkArray = function(arr) {
    var digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (var i = 0; i < arr.length; i++) {
      var index = digits.indexOf(arr[i]);
      if (index != -1) {
        digits[index] = 0;
      } else {
        return false;
      }
    }
    return true;
  }
  this.rowError = function(y) {
    var $inputs = this._getRowInputs(y);
    $inputs.closest('.control-group').addClass('error');
  }
  this.columnError = function(x) {
    var $inputs = this._getColumnInputs(x);
    $inputs.closest('.control-group').addClass('error');
  }
  this.blockError = function(blockNumber) {
    var $inputs = this._getBlockInputs(blockNumber);
    $inputs.closest('.control-group').addClass('error');
  }
  this.sudokuRight = function() {
    this.$container.find('.control-group').removeClass('error');
  }
  this.getFullCellCount = function() {
    var count = 0;
    this.$container.find('input').each(function(){
      if ($(this).val()) {
        count++;
      }
    });
    return count;
  }
}

window.playField = new PlayField();

$(function(){
  playField.init();
});