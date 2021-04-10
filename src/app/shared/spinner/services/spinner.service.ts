import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SpinnerService {
  public isLBS = new BehaviorSubject<boolean>(false);

  public showSpinner() {
    this.isLBS.next(true);
  }

  public hideSpinner() {
    this.isLBS.next(false);
  }
}
