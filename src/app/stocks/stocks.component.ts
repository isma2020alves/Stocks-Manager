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

  add(name: string, value: string): void {
    name = name.trim();
    value = value.trim();
    if (!name || !value) { return; }
    this.stockService.addStock({ name, value } as Stock)
      .subscribe(stock => {
        this.stocks.push(stock);
      });
  }

  delete(stock:Stock): void {
    this.stocks = this.stocks.filter(s => s !== stock);
    this.stockService.deleteStock(stock.id).subscribe();
  }
  
  constructor(private stockService: StockService) { }
  
  ngOnInit() {
    this.getStocks()
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }
}

