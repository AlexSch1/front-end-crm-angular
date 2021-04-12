import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { IFilter } from '../../../../shared/interfacces';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent {
  public form: FormGroup = this.fb.group({
    order: [null],
    start: [null],
    end: [null],
  });
  @Output() public onFilter: EventEmitter<IFilter> = new EventEmitter();
  constructor(private fb: FormBuilder) {}

  public submitFilter() {
    const value = this.form.value;
    const filter: IFilter = {};

    if (value.order) {
      filter.order = value.order;
    }

    if (value.start) {
      filter.start = value.start;
    }
    if (value.end) {
      filter.end = value.end;
    }

    this.onFilter.emit(filter);
  }
}
