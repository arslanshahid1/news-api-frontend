import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  @Input() newsData: any[] = [];
  @Input() title?: string = '';
  dataToShow: any = [];
  itemsPerLoad = 10;
  currentIndex = 0;
  noMoreNews: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.dataToShow = [];
    // this.loadData();
  }
  ngOnChanges() {
    window.scrollTo(0, 0);
    this.dataToShow = [];
    this.currentIndex = 0;
    this.noMoreNews = false;
    this.loadData();
  }
  openNews(url: any) {
    window.open(url, '_blank');
  }

  public trackItem(index: number, item: any) {
    return item.url;
  }

  loadData() {
    if (this.dataToShow.length == this.newsData.length) {
      this.noMoreNews = true;
      return;
    }
    const newData = this.newsData.slice(
      this.currentIndex,
      this.currentIndex + this.itemsPerLoad
    );
    this.dataToShow = this.dataToShow.concat(newData);
  }

  onLoadMore() {
    this.currentIndex += this.itemsPerLoad;
    this.loadData();
  }
}
