import {Component, Input, OnInit} from '@angular/core';
import {Pawn} from '../token';

@Component({
  selector: 'va-pawn',
  templateUrl: './pawn.component.html',
  styleUrls: ['./pawn.component.scss']
})
export class PawnComponent implements OnInit {

  @Input() pawn: Pawn;
  constructor() { }

  ngOnInit() {
  }

}
