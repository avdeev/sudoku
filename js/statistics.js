'use strict';

function Statistics () {
  this.init = function() {
    this.$container = $('#statistics-content');
    this.$cellFull = $('#cell-full');
    this.$cellEmpty = $('#cell-empty');
  }
  this.appendText = function(text) {
    this.$container.append($('<p>', {
      text: text
    }));
  }
  this.appendHtml = function(html) {
    this.$container.append(html);
  }
  this.clear = function() {
    this.$container.empty(); 
  }
  this.cellCountRefresh = function(fullCellCount) {
    this.$cellFull.html(fullCellCount);
    this.$cellEmpty.html(81 - fullCellCount);
  } 
}

window.statistics = new Statistics();

$(function(){
  statistics.init();
});