import {Component, Input, OnInit} from '@angular/core';
import {King} from '../token';

@Component({
  selector: 'va-king',
  templateUrl: './king.component.html',
  styleUrls: ['./king.component.scss']
})
export class KingComponent implements OnInit {

  @Input() king: King;

  constructor() { }

  ngOnInit() {
  }

}
