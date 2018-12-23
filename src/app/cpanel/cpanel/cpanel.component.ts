import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.scss']
})
export class CpanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

}
