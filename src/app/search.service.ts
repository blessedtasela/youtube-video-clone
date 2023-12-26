import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Result } from './search-result.model';

export let YOUTUBE_API_KEY: string = environment.youtubeApiKey;
export let YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(
    private http: HttpClient,
    @Inject(YOUTUBE_API_KEY) private apiKey: string,
    @Inject(YOUTUBE_API_URL) private apiUrl: string
  ) { }

  search(query: string): Observable<Result[]> {
    const params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=100`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;

    return this.http.get(queryUrl).pipe(
      mergeMap((response: any) => {
        const videoItems = response['items'];

        if (!videoItems || videoItems.length === 0) {
          return [];
        }

        const videoDetailsRequests = videoItems.map((item: any) => {
          return this.http.get('https://www.googleapis.com/youtube/v3/videos', {
            params: {
              part: 'contentDetails',
              id: item.id.videoId,
              key: this.apiKey,
            },
          });
        });

        return forkJoin(videoDetailsRequests).pipe(
          map((detailsResponses: any) => {
            return videoItems.map((item: any, index: number) => {
              const details = detailsResponses[index]?.items[0]?.contentDetails;
              return new Result({
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnailUrl: item.snippet.thumbnails.high.url,
                duration: details ? details.duration : null,
              });
            });
          })
        );
      })
    );
  }
}




// "contentDetails": {
//   "duration": "PT15M31S",
//   "dimension": "2d",
//   "definition": "hd",
//   "caption": "true",
//   "licensedContent": true,
//   "regionRestriction": {
//     "allowed": ["US", "CA"],
//     "blocked": ["DE", "FR"]
//   }
// }

