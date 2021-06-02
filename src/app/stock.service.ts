import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { STOCKS } from './mock-stocks';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  private stocksUrl = 'api/stocks'; // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
/** GET heroes from the server */
getStocks(): Observable<Stock[]> {
  // const stocks  = of(STOCKS);
  // this.messageService.add('StockService: fetched stocks');
  return this.http.get<Stock[]>(this.stocksUrl)
  .pipe(
    tap(_ => this.log('fetched  stocks')),
    catchError(this.handleError<Stock[]>('getStocks', []))
  );
}

/** GET stock by id. Will 404 if id not found */
getStock(id: number): Observable<Stock> { 
  const url = `${this.stocksUrl}/${id}`;
  return this.http.get<Stock>(url).pipe(
    tap(_ => this.log('fetched stock id=${id}')),
    catchError(this.handleError<Stock>('getStock id=${id}'))
  )
}

/** PUT: update the hero on the server */
updateStock(stock: Stock): Observable<any> {
  return this.http.put(this.stocksUrl, stock, this.httpOptions).pipe(
    tap(_ => this.log(`updated stock id=${stock.id}`))
  );
}


constructor (
  private http: HttpClient,
  private messageService: MessageService) { }
  
private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
    