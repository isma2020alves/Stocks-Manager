import { Component, OnInit, Input } from '@angular/core';
import { Stock } from '../stock';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  @Input() stock?: Stock;

  constructor() { }

  ngOnInit(): void {
  }

}
