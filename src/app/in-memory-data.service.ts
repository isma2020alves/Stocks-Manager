import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
      { id: 1, name: 'Apple'},
      { id: 2, name: 'Tesla'},
      { id: 3, name: 'Microsoft'},
      { id: 4, name: 'Jp Morgan'},
      { id: 5, name: 'Google'},
      { id: 6, name: 'Amazon'},
      { id: 7, name: 'Alibaba'}
    ];
    return {stocks};
  }
 // Overrides the genId method to ensure that a stock always has an id.
  // If the stocks array is empty,
  // the method below returns the initial number (1).
  // if the stocks array is not empty, the method below returns the highest
  // stock id + 1.
  genId(stocks: Stock[]): number {
    return stocks.length > 0 ? Math.max(...stocks.map(stock =>
       stock.id)) + 1 : 1;
  }
}
