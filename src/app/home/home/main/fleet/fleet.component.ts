import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  // mySlideImages = [1, 2, 3, 4, 5, 6, 7].map(
  //   i => `https://picsum.photos/640/480?image=${i}`
  // );

  mySlideImages = [1, 2, 3, 4, 5, 6, 7].map(
    i => `https://picsum.photos/640/480?image=${i}`
  );

  mySlideOptions = {
    items: 1,
    loop: true,
    rewind: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dots: false,
    nav: false,
    margin: 70,
    height: 620,
    responsive: {
      768: {
        items: 3
      }
    }
  };

  constructor() {}

  ngOnInit() {}
}
