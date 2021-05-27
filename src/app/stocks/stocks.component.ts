import { ApplicationRef, Component, OnInit } from '@angular/core';
import { Stock } from '../stock';
import { STOCKS } from '../mock-stocks';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks = STOCKS;
  selectedStock?: Stock;
  
  constructor() { }
  
  ngOnInit(): void {
  }
  onSelect(stock: Stock) : void {
    this.selectedStock = stock;
}
}

