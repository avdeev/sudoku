'use strict';

function Timer () {
  this.init = function() {
    this.$container = $('#js-timer');
    this.intervalId = null;
  }
  this.start = function() {
    this.stop();
    this.timeWrite();
    this.intervalId = setInterval(function(){
      timer.timeIncrement();
      timer.timeWrite();
    }, 1000)
  }
  this.timeEmpty = function() {
    this.datetime = {
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }
  this.timeIncrement = function() {
    if (this.datetime.seconds >= 60) {
      this.datetime.minutes++;
      this.datetime.seconds = 0;
    }
    if (this.datetime.minutes >= 60) {
      this.datetime.hours++;
      this.datetime.minutes = 0;
    }

    this.datetime.seconds++;
  }
  this.timeWrite = function() {
    if (this.datetime.hours < 10) this.datetime.hours = "0" + parseInt(this.datetime.hours);
    if (this.datetime.minutes < 10) this.datetime.minutes = "0" + parseInt(this.datetime.minutes);
    if (this.datetime.seconds < 10) this.datetime.seconds = "0" + parseInt(this.datetime.seconds);
    this.$container.html(this.datetime.hours + ":" + this.datetime.minutes + ":" + this.datetime.seconds);
  }
  this.stop = function() {
    clearInterval(this.intervalId);
    this.timeEmpty();
  }
}

window.timer = new Timer();

$(function(){
  timer.init();
});