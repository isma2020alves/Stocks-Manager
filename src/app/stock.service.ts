import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { STOCKS } from './mock-stocks';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  private stocksUrl = 'api/stocks'; // URL to web api
  
/** GET heroes from the server */
getStocks(): Observable<Stock[]> {
  // const stocks  = of(STOCKS);
  // this.messageService.add('StockService: fetched stocks');
  return this.http.get<Stock[]>(this.stocksUrl);
}

getStock(id: number): Observable<Stock> { 
  // For now, assume that a hero with the specified `id` always exists.
  // Error handling will be added in the next after.
  const stock = STOCKS.find(s => s.id === id)!;
  this.messageService.add(`StockService: fetched stock id=${id}`);
  return of(stock);
}
constructor (
  private http: HttpClient,
  private messageService: MessageService) { }
  
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }
}
    