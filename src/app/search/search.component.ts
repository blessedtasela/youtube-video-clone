import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { fromEvent, map, filter, debounceTime, tap, switchMap } from 'rxjs';
import { SearchService } from '../search.service';
import { Result } from '../search-result.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  results: Result[] = [];
  loading: boolean = false;

  constructor(private searchService: SearchService,
    private el: ElementRef,
    private ngxService: NgxUiLoaderService) { }

  updateResults(newResult: Result[]): void {
    this.results = newResult;
    console.log('the results: ', this.results);
  }


  ngOnInit(): void {
    fromEvent(this.el.nativeElement, 'keyup')
      .pipe(
        map((e: any) => e.target.value),
        filter((text: string) => text.length > 1),
        debounceTime(300),
        tap(() => {
          this.ngxService.start();
        }),
        switchMap((query: string) =>
          this.searchService.search(query))
      )
      .subscribe({
        next: (results: Result[]) => {
          this.ngxService.stop()
          this.results = results;
        },
        error: (err: any) => {
          console.log(err);
          this.ngxService.stop()
        },
        complete: () => { // when completed
          this.ngxService.stop();
        }
      });
  }
}
