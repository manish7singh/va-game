export class Token {
  tokenType = 'token';
  jumped = false;
  isBlack = true;
  row;
  col;

  constructor(color: string, row: number, col: number) {
    if (color === 'black') {
      this.isBlack = true;
    } else if (color === 'red') {
      this.isBlack = false;
    }
    this.row = row;
    this.col = col;
  }

  placeTokenTo(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}

export class Pawn extends Token {
  tokenType = 'pawn';

  // Viewing from Red Side as System
  moveFrontRightDiagonally() {
    const col = this.col + 1;
    const row = this.isBlack ? this.row - 1 : this.row + 1;
    return {row, col};
  }

  moveFrontLeftDiagonally() {
    const col = this.col - 1;
    const row = this.isBlack ? this.row - 1 : this.row + 1;
    return {row, col};
  }

  jumpFrontRightDiagonally() {
    const col = this.col + 2;
    const row = this.isBlack ? this.row - 2 : this.row + 2;
    return {row, col};
  }

  jumpFrontLeftDiagonally() {
    const col = this.col - 2;
    const row = this.isBlack ? this.row - 2 : this.row + 2;
    return {row, col};
  }
}

export class King extends Token {
  tokenType = 'king';

  // Viewing from Red Side as System
  moveBackRightDiagonally() {
    const col = this.col + 1;
    const row = this.isBlack ? this.row + 1 : this.row - 1;
    return {row, col};
  }

  moveBackLeftDiagonally() {
    const col = this.col - 1;
    const row = this.isBlack ? this.row + 1 : this.row - 1;
    return {row, col};
  }

  jumpBackRightDiagonally() {
    const col = this.col + 2;
    const row = this.isBlack ? this.row + 2 : this.row - 2;
    return {row, col};
  }

  jumpBackLeftDiagonally() {
    const col = this.col - 2;
    const row = this.isBlack ? this.row + 2 : this.row - 2;
    return {row, col};
  }
}
