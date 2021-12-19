import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { IStock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
      { id: 1, name: 'Apple', value: 300},
      { id: 2, name: 'Tesla', value: 300},
      { id: 3, name: 'Microsoft', value: 700},
    ];
    return {stocks};
  }
 // Overrides the genId method to ensure that a stock always has an id.
  // If the stocks array is empty,
  // the method below returns the initial number (1).
  // if the stocks array is not empty, the method below returns the highest
  // stock id + 1.
  genId(stocks: IStock[]): number {
    return stocks.length > 0 ? Math.max(...stocks.map(stock =>
       stock.id)) + 1 : 1;
  }
}
