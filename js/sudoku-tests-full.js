/**
 * Решаем Судоку.
 *
 * Функция решает судоку. Входной параметр -- массив 9х9 с исходными значениями.
 * Возвращает массив 9х9, каждый элемент которого является массивом из двух элементов:
 * числа и его типа. Тип показывает было ли это исходное число или число, найденное
 * в ходе решения.
 *
 * @author   Victor Grischenko <victor.grischenko@gmail.com>
 * @license  GPLv3
 */
SudokuFull = function(in_val) {
  var solved = [];
  var steps = 0;
  var unknownI, unknownJ;
  var back = 0;
  var checked = 0;

  initSolved(in_val);
  solve();


  /**
   * Инициализация рабочего массива
   *
   * Рабочий массив представляет собой матрицу 9х9, каждый элемент которой
   * является списком из трех элементов: число, тип элемента (in - заполнен
   * по услвоию, unknown - решение не найдено, solved - решено) и перечень
   * предполагаемых значений элемента.
   */
  function initSolved(in_val) {
    steps = 0;
    var suggest = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for ( var i=0; i<9; i++) {
      solved[i] = [];
      for ( var j=0; j<9; j++ ) {
        if ( in_val[i][j] ) {
          solved[i][j] = [in_val[i][j], 'in'];
        }
        else {
          solved[i][j] = [0, 'unknown'];
        }
      }
    }
  }; // end of method initSolved()


  /**
   * Решение судоку
   *
   * Метод в цикле пытается решить судоку, если на текущем этапе не изменилось
   * ни одного элемента, то решение прекращается.
   */
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
  }; // end of method solve()

  function incUnknownCell() {
    solved[unknownI][unknownJ][0]++;
  }

  function getPreviousUnknownCell() {
    back++;
    solved[unknownI][unknownJ][0] = 0;
    for (var j = 8; j >= 0; j--) {
      for (var i = 8; i >= 0; i-- ) {
        if (solved[i][j][0] && solved[i][j][1] == 'unknown') {
          unknownI = i;
          unknownJ = j;
          incUnknownCell();
          return;
        }
      }
    }
  }

  function getNextUnknownCell() {
    for (var j = 0; j < 9; j++) {
      for (var i = 0; i < 9; i++) {
        if (!solved[i][j][0] && solved[i][j][1] == 'unknown') {
          unknownI = i;
          unknownJ = j;
          incUnknownCell();
          return;
        }
      }
    }
  }

  /**
   * Расчет смещения секции
   */
  function sectOffset(i, j) {
    return {
      j: Math.floor(j/3)*3,
      i: Math.floor(i/3)*3
    };
  }; // end of method sectOffset()

  /**
   * Содержимое строки
   */
  function rowContent(i) {
    var content = [];
    for ( var j=0; j<9; j++ ) {
      if ( 0 != solved[i][j][0] ) {
        content[content.length] = solved[i][j][0];
      }
    }
    return content;
  }; // end of method rowContent()


  /**
   * Содержимое столбца
   */
  function colContent(j) {
    var content = [];
    for ( var i=0; i<9; i++ ) {
      if ( 0 != solved[i][j][0] ) {
        content[content.length] = solved[i][j][0];
      }
    }
    return content;
  }; // end of method colContent()


  /**
   * Содержимое секции
   */
  function sectContent(i, j) {
    var content = [];
    var offset = sectOffset(i, j);
    for ( var k=0; k<3; k++ ) {
      for ( var l=0; l<3; l++ ) {
        if ( 0 != solved[offset.i+k][offset.j+l][0] ) {
          content[content.length] = solved[offset.i+k][offset.j+l][0];
        }
      }
    }
    return content;
  }; // end of method sectContent()

  function checkArray(arr) {
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

  function checkSudoku() {
    for (var i = 0; i < 9; i++) {
      if (!checkArray(rowContent(i))) {
        return false;
      }
    }

    for (var i = 0; i < 9; i++) {
      if (!checkArray(colContent(i))) {
        return false;
      }
    }

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (!checkArray(sectContent(i, j))) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Проверка на найденное решение
   */
  function isSolved() {
    var is_solved = true;
    for ( var i=0; i<9; i++) {
      for ( var j=0; j<9; j++ ) {
        if ( 0 == solved[i][j][0] ) {
          is_solved = false;
        }
      }
    }
    return is_solved;
  }; // end of method isSolved()

  /**
   * Возвращает найденное решение
   */
  this.solved = function() {
    return solved;
  }; // end of solved()

  this.back = function() {
    return back;
  }

  this.checked = function() {
    return checked;
  }
}; // end of class sudoku()
