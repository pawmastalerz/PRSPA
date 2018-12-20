import { AuthService } from 'src/services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-results-item',
  templateUrl: './search-results-item.component.html',
  styleUrls: ['./search-results-item.component.scss']
})
export class SearchResultsItemComponent implements OnInit {
  @Input()
  reservedFrom: string;
  @Input()
  reservedTo: string;
  @Input()
  searchResult: Array<any>;

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.isAuth$.subscribe(isAuth => (this.isAuth = isAuth));
  }

}
