import { Component, OnInit } from '@angular/core';
import { CheckersService } from '../checkers.service';

@Component({
  selector: 'va-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  gameBoard = [];

  constructor(
    private service: CheckersService
  ) { }

  ngOnInit() {
    this.service.restartGame();
    this.gameBoard = this.service.gameBoard;
  }

}
