import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IStock } from './stock';
import { MessageService } from './message.service';
import { STOCKS } from './mock-stocks';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  
  private stocksUrl = 'api/stocks'; // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  };
  
  constructor (
    private http: HttpClient,
    private messageService: MessageService) { }

/** GET stocks from the server */
getStocks(): Observable<IStock[]> {
  // const stocks  = of(STOCKS);
  // this.messageService.add('StockService: fetched stocks');
  return this.http.get<IStock[]>(this.stocksUrl)
  .pipe(
    tap(_ => this.log('fetched  stocks')),
    catchError(this.handleError<IStock[]>('getStocks', []))
  );
}

/** GET stock by id. Return `undefined` when id not found */
getStockNo404<Data>(id: number): Observable<IStock> {
  const url = `${this.stocksUrl}/?id=${id}`;
  return this.http.get<IStock[]>(url)
    .pipe(
      map(stocks => stocks[0]), // returns a {0|1} element array
      tap(s => {
        const outcome = s ? `fetched` : `did not find`;
        this.log(`${outcome} stock id=${id}`);
      }),
      catchError(this.handleError<IStock>(`getStock id=${id}`))
    );
}

/** GET stock by id. Will 404 if id not found */
getStock(id: number): Observable<IStock> { 
  const url = `${this.stocksUrl}/${id}`;
  return this.http.get<IStock>(url).pipe(
    tap(_ => this.log('fetched stock id=${id}')),
    catchError(this.handleError<IStock>('getStock id=${id}'))
    )
  }
  
  /* GET stocks whose name contains search term */
    searchStocks(term: string): Observable<IStock[]> {
    if (!term.trim()) {
      // if not search term, return empty stock array.
      return of([]);
    }
    return this.http.get<IStock[]>(`${this.stocksUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
          this.log(`found stocks matching "${term}"`) :
          this.log(`no stocks matching "${term}"`)),
        catchError(this.handleError<IStock[]>('searchStocks', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new stock to the server */
  addStock(stock: IStock): Observable<IStock> {
    return this.http.post<IStock>(this.stocksUrl, stock, this.httpOptions).pipe(
      tap((newStock: IStock) => this.log(`added stock w/ id=${newStock.id}`)),
      catchError(this.handleError<IStock>('addStock'))
    );
    }
            
    /** DELETE: delete the stock from the server */
    deleteStock(id: number): Observable<IStock> {
      const url = `${this.stocksUrl}/${id}`;
      
      return this.http.delete<IStock>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted stock id=${id}`)),
        catchError(this.handleError<IStock>('deleteStock'))
        );
      }
      
      /** PUT: update the stock on the server */
      updateStock(stock: IStock): Observable<any> {
        return this.http.put(this.stocksUrl, stock, this.httpOptions).pipe(
          tap(_ => this.log(`updated stock id=${stock.id}`))
        );
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
      
      /** Log a StockService message with the MessageService */
      private log(message: string) {
        this.messageService.add(`StockService: ${message}`);
        }
    }
    