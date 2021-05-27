import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Stock } from '../stock';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stock : Stock = {
    id: 1,
    name: 'Apple',
    ticker: 'AAPL'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
