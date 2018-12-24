import {Token} from './token';

export class Square {

  row: number;
  col: number;
  validSquare: boolean;
  token: Token = null;
  highlight = false;
  validMove = false;
  jumped = false;

  constructor(square: boolean, row: number, col: number) {
    this.row = row;
    this.col = col;
    this.validSquare = square;
  }

  addToken(token: Token) {
    if (this.token === null) {
      this.token = token;
      this.token.placeTokenTo(this.row, this.col);
    }
  }

  removeToken() {
    if (this.token !== null) {
      this.token = null;
    }
  }
}
