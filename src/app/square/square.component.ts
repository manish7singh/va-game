import { Component, Input, OnInit } from '@angular/core';
import { Square } from '../square';
import {CheckersService} from '../checkers.service';

@Component({
  selector: 'va-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  @Input() square: Square;
  @Input() i;
  @Input() j;

  constructor(
    private service: CheckersService
  ) { }

  ngOnInit() {
  }

}
