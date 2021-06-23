import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Stock } from './stock';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const stocks = [
      { id: 1, name: 'Apple', value: 300},
      { id: 2, name: 'Tesla', value: '500'},
      { id: 3, name: 'Microsoft', value: 700},
      { id: 4, name: 'Jp Morgan', value: 100},
      { id: 5, name: 'Google', value: 100},
      { id: 6, name: 'Amazon', value: 100},
      { id: 7, name: 'Alibaba', value: 100}
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
