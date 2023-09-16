import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNewsComponent } from './category-news.component';

describe('CategoryNewsComponent', () => {
  let component: CategoryNewsComponent;
  let fixture: ComponentFixture<CategoryNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryNewsComponent]
    });
    fixture = TestBed.createComponent(CategoryNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
