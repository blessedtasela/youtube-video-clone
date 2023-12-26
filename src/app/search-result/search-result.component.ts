import { Component, Input } from '@angular/core';
import { Result } from '../search-result.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() result!: Result;

  constructor() { }
  
  formatDuration(duration: any): string {
    if (!duration) return 'N/A'; // Return 'N/A' if duration is not available
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

    if (!match) return 'N/A'; // Return 'N/A' if there are no matches

    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
  }

}