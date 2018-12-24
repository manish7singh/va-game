import { Injectable } from '@angular/core';
import { Board } from './board';
import { King, Pawn, Token } from './token';
import { Square } from './square';

@Injectable({
  providedIn: 'root'
})
export class CheckersService {

  gameBoard = [];
  selectedToken: Token = null;
  jumpedTwice = false;
  blackTurn = true;
  gameWinner = null;

  constructor() {
    this.restartGame();
  }

  restartGame() {
    this.gameBoard = new Board().gameBoard;
    this.blackTurn = true;
    this.gameWinner = null;
  }

  // Clear Selections, Select Token, Find Square & Highlight Token, SuggestedMoves
  chooseToken(token: Token) {
    if (this.jumpedTwice) {
      if (this.selectedToken === token) {
        this.removeSelections();
        this.selectedToken = token;
        this.findSquare(token).highlight = true;
        this.selectSquareToMove(token);
      }
    } else if (this.blackTurn === token.isBlack) {
      this.removeSelections();
      this.selectedToken = token;
      this.findSquare(token).highlight = true;
      this.selectSquareToMove(token);
    }
  }

  // Remove all selections & highlights for a Fresh Position
  removeSelections() {
    this.gameBoard.forEach(row =>
      row.forEach( square => {
        square.highlight = square.validMove = square.jumped = false;
        if (square.token) {
          square.token.jumped = false;
        }
      })
    );
  }

  // Finds the Square Details of the Current Token
  findSquare(token: Token) {
    let selectedSquare: Square = null;
    this.gameBoard.forEach(row =>
      row.forEach(square => {
        if (square.token === token) {
          selectedSquare = square;
        }
      })
    );
    return selectedSquare;
  }

  // Select the Square where the Current Token can MOVE or JUMP
  selectSquareToMove(token: Token) {
    // Possible Squares where the Token can move
    const frontRight = this.findSquareToMove(token).frontRight;
    const frontLeft = this.findSquareToMove(token).frontLeft;
    const backRight = this.findSquareToMove(token).backRight;
    const backLeft = this.findSquareToMove(token).backLeft;

    // HighLight Valid Square
    if (frontRight !== null) {
      frontRight.highlight = frontRight.validMove = true;
    }
    if (frontLeft !== null) {
      frontLeft.highlight = frontLeft.validMove = true;
    }
    if (backRight !== null) {
      backRight.highlight = backRight.validMove = true;
    }
    if (backLeft !== null) {
      backLeft.highlight = backLeft.validMove = true;
    }
  }

  // Find the Square where the Current Token can MOVE or JUMP
  findSquareToMove(token: Token) {
    let frontRight, frontLeft, backRight, backLeft;

    frontRight = this.checkMoveOrJumpPossibility(token, this.getAllDiagonalSquares(token).frontRightDiagonal.square,
      this.getAllDiagonalSquares(token).frontRightDiagonal.jumpSquare);
    frontLeft = this.checkMoveOrJumpPossibility(token, this.getAllDiagonalSquares(token).frontLeftDiagonal.square,
      this.getAllDiagonalSquares(token).frontLeftDiagonal.jumpSquare);
    backRight = this.checkMoveOrJumpPossibility(token, this.getAllDiagonalSquares(token).backRightDiagonal.square,
      this.getAllDiagonalSquares(token).backRightDiagonal.jumpSquare);
    backLeft = this.checkMoveOrJumpPossibility(token, this.getAllDiagonalSquares(token).backLeftDiagonal.square,
      this.getAllDiagonalSquares(token).backLeftDiagonal.jumpSquare);
    return {
      frontRight: frontRight,
      frontLeft: frontLeft,
      backRight: backRight,
      backLeft: backLeft
    };
  }

  // Checks if the Current Square is Empty for a MOVE or JUMP
  checkMoveOrJumpPossibility(token: Token, square: Square, jumpSquare: Square): Square {
    let validSquare: Square = null;

    if (square) {
      if (square.token === null) {
        validSquare = square;
      }
      if (this.canJump(token, square, jumpSquare) && !this.jumpedTwice) {
        square.token.jumped = jumpSquare.jumped = true;
        validSquare = jumpSquare;
      }
    }
    return validSquare;
  }

  // Check if a Token can JUMP or not
  canJump(token: Token, square: Square, jumpSquare: Square) {
    if (square === null || jumpSquare === null || square.token === null) {
      return false;
    } else if (token.isBlack === !square.token.isBlack && jumpSquare !== null && jumpSquare.token === null) {
      return true;
    } else {
      return false;
    }
  }

  // Get the List of Square where Token can MOVE or JUMP
  getAllDiagonalSquares(token: Token) {
    return {
      frontRightDiagonal: this.getValidDiagonalSquare(token, true, true),
      frontLeftDiagonal: this.getValidDiagonalSquare(token, true, false),
      backRightDiagonal: this.getValidDiagonalSquare(token, false, true),
      backLeftDiagonal: this.getValidDiagonalSquare(token, false, false)
    };
  }

  // Check if next Diagonal Square is Valid for a MOVE or JUMP
  getValidDiagonalSquare(token: Token, front: boolean, right: boolean) {
    let nextRow = -1, nextCol = -1, nextJumpRow = -1, nextJumpCol = -1;

    if (front) {
      if (right) {
        nextRow = (<Pawn>token).moveFrontRightDiagonally().row;
        nextCol = (<Pawn>token).moveFrontRightDiagonally().col;
        nextJumpRow = (<Pawn>token).jumpFrontRightDiagonally().row;
        nextJumpCol = (<Pawn>token).jumpFrontRightDiagonally().col;
      } else {
        nextRow = (<Pawn>token).moveFrontLeftDiagonally().row;
        nextCol = (<Pawn>token).moveFrontLeftDiagonally().col;
        nextJumpRow = (<Pawn>token).jumpFrontLeftDiagonally().row;
        nextJumpCol = (<Pawn>token).jumpFrontLeftDiagonally().col;
      }
    } else if (!front && token.tokenType === 'king') {
      if (right) {
        nextRow = (<King>token).moveBackRightDiagonally().row;
        nextCol = (<King>token).moveBackRightDiagonally().col;
        nextJumpRow = (<King>token).jumpBackRightDiagonally().row;
        nextJumpCol = (<King>token).jumpBackRightDiagonally().col;
      } else {
        nextRow = (<King>token).moveBackLeftDiagonally().row;
        nextCol = (<King>token).moveBackLeftDiagonally().col;
        nextJumpRow = (<King>token).jumpBackLeftDiagonally().row;
        nextJumpCol = (<King>token).jumpBackLeftDiagonally().col;
      }
    }

    return {
      token: token,
      square: this.checkSquareOnBoard(nextRow, nextCol),
      jumpSquare: this.checkSquareOnBoard(nextJumpRow, nextJumpCol)
    };
  }

  // Check if Square Exits on Game Board
  checkSquareOnBoard(row: number, col: number) {
    if ((row > -1 && row < 8) && (col > -1 && col < 8)) {
      return this.gameBoard[row][col];
    }
    return null;
  }

  // Choose Square from highlighted Squares for Token to MOVE or JUMP
  chooseSquareToMoveToken(square: Square) {
    if (this.selectedToken !== null && square.validMove) {
      this.findSquare(this.selectedToken).removeToken();
      square.addToken(this.selectedToken);
      if (square.jumped === true) {
        this.removeJumpedToken(square);
      }
      // Check if the Token reached the End of the Game Board
      if (square.row === 0 || square.row === 7) {
        this.kingMaker(this.selectedToken);
      }
      if (square.jumped === false || !this.checkForJump(square)) {
        this.blackTurn = !this.blackTurn;
        this.jumpedTwice = false;
        this.removeSelections();
        this.getGameWinner(this.blackTurn);
      } else {
        this.jumpedTwice = true;
        this.chooseToken(this.selectedToken);
      }
    }
  }

  removeJumpedToken(square: Square) {
    const tokens = [];

    tokens.push(this.getTokenDetails(square.row - 1, square.col - 1));
    tokens.push(this.getTokenDetails(square.row - 1, square.col + 1));
    tokens.push(this.getTokenDetails(square.row + 1, square.col - 1));
    tokens.push(this.getTokenDetails(square.row + 1, square.col + 1));

    this.findSquare(tokens.find(token => token !== null && token.jumped === true)).removeToken();
  }

  getTokenDetails(row: number, col: number): Token {
    const square = this.checkSquareOnBoard(row, col);

    if (square !== null && square.token !== null) {
      return square.token;
    }
    return null;
  }

  kingMaker(token: Token) {
    const king = new King(token.isBlack === true ? 'black' : 'red', token.row, token.col);
    const square = this.findSquare(token);
    square.removeToken();
    square.addToken(king);
    this.selectedToken = king;
  }

  checkForJump(square: Square): boolean {
    const token = square.token;
    if (this.canJump(token, this.getAllDiagonalSquares(token).frontRightDiagonal.square, this.getAllDiagonalSquares(token).frontRightDiagonal.jumpSquare) ||
      this.canJump(token, this.getAllDiagonalSquares(token).frontLeftDiagonal.square, this.getAllDiagonalSquares(token).frontLeftDiagonal.jumpSquare) ||
      this.canJump(token, this.getAllDiagonalSquares(token).backRightDiagonal.square, this.getAllDiagonalSquares(token).backRightDiagonal.jumpSquare) ||
      this.canJump(token, this.getAllDiagonalSquares(token).backLeftDiagonal.square, this.getAllDiagonalSquares(token).backLeftDiagonal.jumpSquare)) {
      return true;
    }
    return false;
  }

  getGameWinner(turn: boolean) {
    const redTeam: Token[] = [];
    const blackTeam: Token[] = [];

    this.gameBoard.forEach(row => {
      row.forEach(square => {
        if (square.token !== null) {
          if (square.token.isBlack) {
            blackTeam.push(square.token);
          } else {
            redTeam.push(square.token);
          }
        }
      });
    });

    if (turn) {
      redTeam.forEach(token => {
        this.gameWinner = this.canMove(token) ? 'Black' : null;
      });
    } else {
      blackTeam.forEach(token => {
        this.gameWinner = this.canMove(token) ? 'Red' : null;
      });
    }
  }

  canMove(token: Token): boolean {
    // Possible Squares where the Token can move
    const frontRight = this.findSquareToMove(token).frontRight;
    const frontLeft = this.findSquareToMove(token).frontLeft;
    const backRight = this.findSquareToMove(token).backRight;
    const backLeft = this.findSquareToMove(token).backLeft;

    return !(frontRight === null && frontLeft === null && backRight === null && backLeft === null);
  }
}
