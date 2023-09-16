import { Component, OnInit } from '@angular/core';
import { ApiDataService } from '../api-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
@Component({
  selector: 'app-category-news',
  templateUrl: './category-news.component.html',
  styleUrls: ['./category-news.component.scss'],
})
export class CategoryNewsComponent implements OnInit {
  newsData: any;
  title: string = '';
  constructor(
    private apiService: ApiDataService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.apiService.getNewsDatavalue().subscribe((val) => {
      this.newsData = val;
    });

    this.apiService.getSelectedCategory().subscribe((val) => {
      this.title = val;
    });

    if (!this.title) {
      this.router.navigate(['']);
    }
  }

  showSuccess() {
    this.toastr.success(
      `Showing articles of category ${this.title}`,
      'Category changed'
    );
  }
}
