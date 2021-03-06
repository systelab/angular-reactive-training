import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Terminal } from '../terminal';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(protected httpClient: HttpClient) {
  }

  public firstObservable(terminal: Terminal): Observable<number> {
    const entry = terminal.log('firstObservable();', 'Adds a delay of 2 seconds.');
    return of(4)
      .pipe(delay(2000), map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }

  public secondObservable(n: number, terminal: Terminal): Observable<number> {
    const entry = terminal.log('secondObservable(' + n + ');', 'Adds a delay of 4 seconds.');

    return of(n * 2, n * 6)
      .pipe(delay(4000), map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }

  public thirdObservable(n: number, terminal: Terminal): Observable<number> {
    const entry = terminal.log('thirdObservable(' + n + ');', 'Adds a delay of 1 seconds.');
    return of(n + 3)
      .pipe(delay(1000), map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }

  public fourthObservable(n: number, terminal: Terminal): Observable<number> {
    const entry = terminal.log('fourthObservable(' + n + ');', 'Adds a delay of 5 seconds.');
    return of(n * 4)
      .pipe(delay(5000), map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }

  public fifthObservable(n: number, terminal: Terminal): Observable<number> {
    const entry = terminal.log('fifthObservable(' + n + ');', 'Adds a delay of 1 seconds.');
    return of(n + 5)
      .pipe(delay(1000), map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }

  public getRestObservable(n: number, terminal: Terminal): Observable<number> {
    let queryParameters = new HttpParams();
    if (n) {
      queryParameters = queryParameters.set('n', <any>n);
    }
    const entry = terminal.log('getRestObservable(' + n + ');', 'Adds a delay of 2 seconds.');

    return this.httpClient.get<any>(`http://localhost:8080/first`, {
      params: queryParameters
    })
      .pipe(map(value => {
        entry.comments += ' Returns ' + value + '.';
        return value;
      }));
  }
}
