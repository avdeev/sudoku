# Sudoku
Generating Sudoku, the heuristic algorithm for solving algorithm and exhaustive search.

The application allows you to test the running time of algorithms on collections of sudoku.

## Demo
http://avdeev.github.io/sudoku

## Implemented algorithms

### Generating sudoku
```js
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
```

### Heuristic algorithm
#### Method "Single"
```js
  function solveSingle(i, j) {
    solved[i][j][2] = arrayDiff(solved[i][j][2], rowContent(i));
    solved[i][j][2] = arrayDiff(solved[i][j][2], colContent(j));
    solved[i][j][2] = arrayDiff(solved[i][j][2], sectContent(i, j));
    if ( 1 == solved[i][j][2].length ) {
      // Исключили все варианты кроме одного
      markSolved(i, j, solved[i][j][2][0]);
      return 1;
    }
    return 0;
  };
```

#### Method "Hidden Single"
```js
  function solveHiddenSingle(i, j) {
    var less_suggest = lessRowSuggest(i, j);
    var changed = 0;
    if ( 1 == less_suggest.length ) {
      markSolved(i, j, less_suggest[0]);
      changed++;
    }
    var less_suggest = lessColSuggest(i, j);
    if ( 1 == less_suggest.length ) {
      markSolved(i, j, less_suggest[0]);
      changed++;
    }
    var less_suggest = lessSectSuggest(i, j);
    if ( 1 == less_suggest.length ) {
      markSolved(i, j, less_suggest[0]);
      changed++;
    }
    return changed;
  };
```

#### Exhaustive search

```js
  function solve() {
    unknownI = 0;
    unknownJ = 0;

    getNextUnknownCell();
    while(!isSolved() || !checkSudoku()) {

      while(!checkSudoku() && solved[unknownI][unknownJ][0] < 10) {
        incUnknownCell();
        checked++;
      }

      if (solved[unknownI][unknownJ][0] < 10) {
        getNextUnknownCell();
      } else {
        getPreviousUnknownCell();
      }
    }
  };
```

## Vendors

* Bootstrap.js 2.3.1
* jQuery v1.9.1
* Modernizr 2.6.2