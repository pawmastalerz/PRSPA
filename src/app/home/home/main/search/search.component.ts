import { CarService } from 'src/services/car.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm = new FormGroup({
    model: new FormControl('', Validators.required),
    reservedFrom: new FormControl('', Validators.required),
    reservedTo: new FormControl('', Validators.required)
  });

  constructor(private carService: CarService) {}

  ngOnInit() {}

  onSearch() {
    this.carService.searchForAvaliableCars(
      this.searchForm.value.model,
      this.searchForm.value.reservedFrom,
      this.searchForm.value.reservedTo
    );
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }
}
