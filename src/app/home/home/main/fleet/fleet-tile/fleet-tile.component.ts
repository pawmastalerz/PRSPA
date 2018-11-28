import { CarForUser } from 'src/models/carForUser';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-fleet-tile',
  templateUrl: './fleet-tile.component.html',
  styleUrls: ['./fleet-tile.component.scss']
})
export class FleetTileComponent implements OnInit {
  @Input()
  carDetails: any;

  constructor() {
    console.log(this.carDetails);
  }

  ngOnInit() {}
}
