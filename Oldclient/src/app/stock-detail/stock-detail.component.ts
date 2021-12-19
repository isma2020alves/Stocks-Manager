import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { IStock } from '../stock';
import { StockService } from '../stock.service'; 

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stock: IStock | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private stockService: StockService
  ) { }

  ngOnInit(): void {
    this.getStock();
  }

  getStock(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.stockService.getStock(id)
      .subscribe(stock => this.stock = stock);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.stock) {
      this.stockService.updateStock(this.stock)
        .subscribe(() => this.goBack());
    }
  }
}
