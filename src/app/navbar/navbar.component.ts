import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiDataService } from '../api-data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { countriesList } from '../countries';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  countries: unknown[] = [];
  @Input() countriesNames: any[] = [];
  @Output() selectedCountryname = new EventEmitter<any>();
  @Output() selectedCategory = new EventEmitter<any>();
  selectedCountry: any;
  coutryNamesForm!: FormGroup;
  categoryNamesForm!: FormGroup;

  categories = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  newsData: any;

  constructor(
    private apiService: ApiDataService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.setCountryName('us');
    this.getNews();
    this.getCountryName();
    this.initForms();
  }
  goToHome() {
    this.router.navigate(['']);
  }

  initForms() {
    this.coutryNamesForm = new FormGroup({
      countryName: new FormControl('us'),
    });
    this.categoryNamesForm = new FormGroup({
      category: new FormControl(''),
    });
  }

  getNews() {
    this.apiService.getNewsDatavalue().subscribe((val) => {
      this.newsData = val;
    });
  }
  setCountryName(name: string) {
    this.apiService.setSelectedCountry(name);
  }
  getCountryName() {
    this.apiService.getSelectedCountry().subscribe((x) => {
      this.selectedCountry = this.findCountryNameByCode(x);
    });
  }

  submit() {
    let submittedCountryname =
      this.coutryNamesForm.controls['countryName'].value.toLowerCase();
    this.setCountryName(submittedCountryname);
    this.selectedCountryname.emit(submittedCountryname);
    let country = this.findCountryNameByCode(submittedCountryname);
    if (this.newsData.length) {
      this.toastr.success(`Country changed to ${country}`, '', {
        timeOut: 2000,
      });
    }
    this.router.navigate(['']);
  }

  onCategoryClick() {
    let submittedCategory =
      this.categoryNamesForm.controls['category'].value.toLowerCase();
    let submittedCountryname =
      this.coutryNamesForm.controls['countryName'].value.toLowerCase();
    this.selectedCategory.emit(submittedCategory);
  }

  findCountryNameByCode(code: string) {
    const country = countriesList.find(
      (country) => country.code === code.toUpperCase()
    );
    return country?.name;
  }

  showSuccess(category: string, countryCode: string) {
    let country = this.findCountryNameByCode(countryCode);
    this.toastr.success(
      `Showing articles of ${category} category in ${country}`,
      'Category changed'
    );
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let element = document.querySelector('.navbar') as HTMLElement;
    if (window.pageYOffset > element.clientHeight) {
      element.classList.add('navbar-scrolled');
    } else {
      element.classList.remove('navbar-scrolled');
    }
  }
}
