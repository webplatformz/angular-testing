import {Component, EventEmitter, Output} from '@angular/core';
import {FilterCriteria} from '../filter-criteria';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Output() updateFilterCriteria = new EventEmitter<FilterCriteria>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = fb.group({
      'salonName': [],
      'gender': []
    });
  }

  onSearch() {
    const salonName = this.searchForm.controls.salonName.value;
    const gender = this.searchForm.controls.gender.value;
    this.updateFilterCriteria.emit({salonName, gender});
  }

}
