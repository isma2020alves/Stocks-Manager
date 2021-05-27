import { ApplicationRef, Component, OnInit } from '@angular/core';

import { Stock } from '../stock';
import { StockService } from '../stock.service'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  selectedStock?: Stock;

  stocks: Stock[] = [];
  
  constructor(private stockService: StockService, private messageService: 
MessageService) { }
  
  ngOnInit() {
    this.getStocks()
  }

  onSelect(stock: Stock) : void {
    this.selectedStock = stock;
    this.messageService.add(`StocksComponent: Selected stock id=${stock.id}`)
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks =stocks);
  }
}

