import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { STOCKS } from './mock-stocks';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

getStocks(): Observable<Stock[]> {
  const stocks  = of(STOCKS);
  this.messageService.add('StockService: fetched stocks');
  return stocks;
}

  constructor(private messageService: MessageService) { }
}
