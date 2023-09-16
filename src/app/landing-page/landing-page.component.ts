import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ToastrService } from 'ngx-toastr';
import { countriesList } from '../countries';
import { delay, retry, take } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  isLoading: boolean = true;
  newsData: any;
  countries: unknown[] = [];
  countriesNames: any[] = [];
  selectedCountry: any = 'us';
  constructor(
    private apiService: ApiDataService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.apiService
      .getSelectedCountry()
      .subscribe(
        (val) => (this.selectedCountry = this.findCountryNameByCode(val))
      );
    this.apiService.getNewsDatavalue().subscribe((val) => {
      this.newsData = val;
    });
  }

  findCountryNameByCode(code: string) {
    const country = countriesList.find(
      (country) => country.code === code.toUpperCase()
    );
    return country?.name;
  }
}
