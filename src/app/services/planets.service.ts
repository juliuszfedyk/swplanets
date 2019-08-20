import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {concat, defer, EMPTY, from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {PlanetsPage} from '../models/planets-page.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  static planetsUrl = 'https://swapi.co/api/planets/';

  constructor(private httpClient: HttpClient) {
  }

  public getPlanets$(url?: string) {
    return defer(() => this.getPage$(url)
      .pipe(
        mergeMap((page: PlanetsPage) => {
          const results$ = from(page.results);
          const next$ = page.next ? this.getPlanets$(page.next) : EMPTY;
          return concat(results$, next$);
        })
      )
    );
  }

  public getplanet$(id: string) {
    const url = PlanetsService.planetsUrl + id;
    return this.httpClient.get(url);
  }

  private getPage$(url: string = PlanetsService.planetsUrl) {
    return this.httpClient.get(url);
  }
}
