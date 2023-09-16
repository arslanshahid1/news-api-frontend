import { Component, OnInit } from '@angular/core';
import { ApiDataService } from './api-data.service';
import { countriesList } from './countries';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'news-website';
  newsData: any;
  countries: unknown[] = [];
  countriesNames: any[] = [];
  selectedCountry: any = 'us';

  constructor(private apiService: ApiDataService, private router: Router) {}
  ngOnInit(): void {
    this.apiService.topHeadlinesByCountry('us').subscribe((data) => {
      this.newsData = data.articles;
      this.apiService.setNewsDataValue(this.newsData);
    });

    this.apiService.takeOneCountry().subscribe((data) => {
      let sources = data.sources;
      let countriesFromApi = sources.map((source: any) => source.country);
      this.countries = [...new Set(countriesFromApi)];
      countriesList.forEach((x: any) => {
        if (this.countries.includes(x.code.toLowerCase())) {
          this.countriesNames.push(x);
        }
      });
    });
  }

  onCountrySelect(countryName: any) {
    this.selectedCountry = countryName;
    this.apiService
      .topHeadlinesByCountry(this.selectedCountry)
      .subscribe((data) => {
        this.newsData = data.articles;
        this.apiService.setNewsDataValue(this.newsData);
      });
  }

  onSelectedCategory(category: any) {
    this.apiService.setSelectedCategory(category);
    this.apiService
      .topHeadlinesByCountryAndCategory(this.selectedCountry, category)
      .subscribe((data) => {
        this.newsData = data.articles;
        this.apiService.setNewsDataValue(this.newsData);
        this.router.navigate(['category-news']);
      });
  }

  goToTop() {
    window.scrollTo(0, 0);
  }
}
