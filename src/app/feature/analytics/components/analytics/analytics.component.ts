import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';
import { AnalyticsCtrlService } from '../../../../backend-bridge/analytics-ctrl/analytics-ctrl.service';
import { ActivatedRoute } from '@angular/router';
import { IAnalyticsPage } from '../../../../shared/interfacces';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements AfterViewInit {
  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;
  public analytics: IAnalyticsPage;
  public average: number = 0;
  public gainConfig: any = {
    label: 'Выручка',
    color: 'rgb(255,99,132)',
  };
  private orderConfig: any = {
    label: 'Заказы',
    color: 'rgb(255,99,132)',
  };

  constructor(private route: ActivatedRoute) {
    this.analytics = this.route.snapshot.data.analytics;
    const analytics = this.analytics;
    this.average = this.analytics.average;
    this.gainConfig.labels = analytics.chart.map((item) => {
      return item.label;
    });
    this.gainConfig.data = analytics.chart.map((item) => {
      return item.gain;
    });
    this.orderConfig.labels = analytics.chart.map((item) => {
      return item.label;
    });
    this.orderConfig.data = analytics.chart.map((item) => {
      return item.order;
    });
  }

  public ngAfterViewInit(): void {
    this.initCharts();
  }

  public initCharts() {
    const gainCtx = this.gainRef.nativeElement.getContext('2d');
    const orderCtx = this.orderRef.nativeElement.getContext('2d');
    // gainCtx.canvas.height = '300px';
    // orderCtx.canvas.height = '300px';
    console.log(gainCtx.canvas.height);

    console.log(this.gainConfig);
    console.log(this.orderConfig);
    new Chart(gainCtx, this.createCharConfig(this.gainConfig));
    new Chart(orderCtx, this.createCharConfig(this.orderConfig));
  }

  private createCharConfig({ labels, data, label, color }): any {
    return {
      type: 'line',
      options: {
        responsive: true,
      },
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: color,
            steppedLine: false,
            fill: false,
          },
        ],
      },
    };
  }
}
