import { Component } from '@angular/core';
import { SpinnerService } from '../../services';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
  public hideSpinner: boolean = true;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.isLBS.subscribe((data) => {
      this.hideSpinner = !data;
    });
  }
}
