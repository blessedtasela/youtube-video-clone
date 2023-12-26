import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { youtubeServiceInjectables } from './search.injectables';
import { NgxUiLoaderConfig, NgxUiLoaderModule, SPINNER } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "Searching....",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  bgsColor: "gray",
  fgsColor: "gray",
  fgsType: SPINNER.rectangleBouncePulseOut,
  fgsSize: 100,
  hasProgressBar: true
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [
    youtubeServiceInjectables
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
