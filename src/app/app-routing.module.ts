import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoryNewsComponent } from './category-news/category-news.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'category-news', component: CategoryNewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
