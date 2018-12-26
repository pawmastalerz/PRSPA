import { Component, OnInit, Input } from '@angular/core';
import { CarForUser } from 'src/models/carForUser';

@Component({
  selector: 'app-current-item',
  templateUrl: './current-item.component.html',
  styleUrls: ['./current-item.component.scss']
})
export class CurrentItemComponent implements OnInit {
  @Input()
  carDetails: CarForUser;

  constructor() {}

  ngOnInit() {
  }
}
