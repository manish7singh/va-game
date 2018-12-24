import { Square } from './square';
import { Pawn } from './token';

export class Board {

  gameBoard = [];

  constructor() {
    this.resetBoard();
    this.placeTokens();
  }

  resetBoard() {
    for (let i = 0; i < 8; i = i + 2) {
      const evenRow = [], oddRow = [];
      for (let j = 0; j < 8; j = j + 2) {
        evenRow[j] = new Square(false, i, j);
        evenRow[j + 1] = new Square(true, i, j + 1);
      }
      for (let j = 0; j < 8; j = j + 2) {
        oddRow[j] = new Square(true, i + 1, j);
        oddRow[j + 1] = new Square(false, i + 1, j + 1);
      }
      this.gameBoard[i] = evenRow;
      this.gameBoard[i + 1] = oddRow;
    }
  }

  placeTokens() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.gameBoard[i][j].validSquare === true) {
          this.gameBoard[i][j].addToken(new Pawn('red', i, j));
        }
      }
    }
    for (let i = 5; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.gameBoard[i][j].validSquare === true) {
          this.gameBoard[i][j].addToken(new Pawn('black', i, j));
        }
      }
    }
  }

}
