import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { IStock } from '../stock';
import { StockService } from '../stock.service'; 
import { MessageService } from '../message.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  stocks: IStock[] = [];

  add(name: string, value: any): void {
    name = name.trim();
    value = value;
    if (!name || !value) { return; }
    this.stockService.addStock({ name, value } as IStock)
      .subscribe(stock => {
        this.stocks.push(stock);
      });
  }

  goBack(): void {
    this.location.back();
  }


  delete(stock:IStock): void {
    this.stocks = this.stocks.filter(s => s !== stock);
    this.stockService.deleteStock(stock.id).subscribe();
  }
  
  constructor(private stockService: StockService, private location: Location,
    ) { }
  
  ngOnInit() {
    this.getStocks()
  }

  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }
}

