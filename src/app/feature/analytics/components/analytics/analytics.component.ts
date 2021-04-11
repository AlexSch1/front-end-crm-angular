import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  public average: number;
  public pending: boolean = true;

  constructor() {}

  public ngOnInit(): void {}
}
