import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpEvent,
  HttpHandler,
} from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { shareReplay, switchMap, take } from 'rxjs/operators';

const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 21600000; // 6 hours in milliseconds

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {
  cache$!: Observable<any>;

  apiKey = 'd8b176050b0f4f77b9aa8b9b8f67e0c3';
  private newsData: BehaviorSubject<[]>;
  private selectedCategory: BehaviorSubject<''>;
  private selectedCountry: BehaviorSubject<''>;

  constructor(private httpClient: HttpClient) {
    this.newsData = new BehaviorSubject<[]>([]);
    this.selectedCategory = new BehaviorSubject<''>('');
    this.selectedCountry = new BehaviorSubject<''>('');
  }

  setNewsDataValue(val: any) {
    this.newsData.next(val);
  }

  getNewsDatavalue(): Observable<[]> {
    return this.newsData.asObservable();
  }

  setSelectedCategory(val: any) {
    this.selectedCategory.next(val);
  }

  getSelectedCategory(): Observable<''> {
    return this.selectedCategory.asObservable();
  }

  setSelectedCountry(val: any = 'us') {
    this.selectedCountry.next(val);
  }

  getSelectedCountry(): Observable<''> {
    return this.selectedCountry.asObservable();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request);
  }

  makeGetAllCoutriesCall() {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);
      this.cache$ = timer$.pipe(
        switchMap(() => this.getAllCountries()),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  takeOneCountry() {
    return this.makeGetAllCoutriesCall().pipe(take(1));
  }

  getAllCountries(): Observable<any> {
    return this.httpClient.get(
      `https://newsapi.org/v2/top-headlines/sources?apiKey=${this.apiKey}`
    );
  }

  topHeadlinesByCountry(country: string): Observable<any> {
    return this.httpClient.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.apiKey}`
    );
  }

  topHeadlinesByCountryAndCategory(
    country: string,
    category: string
  ): Observable<any> {
    return this.httpClient.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${this.apiKey}`
    );
  }
}
