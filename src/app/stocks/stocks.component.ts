import { Component, OnInit } from '@angular/core';

import { Stock } from '../stock';
import { StockService } from '../stock.service'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: Stock[] = [];

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stockService.addStock({ name } as Stock)
      .subscribe(stock => {
        this.stocks.push(stock);
      });
  }
  
  constructor(private stockService: StockService) { }
  
  ngOnInit() {
    this.getStocks()
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks =stocks);
  }
}

