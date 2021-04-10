import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent implements OnInit {
  public links: any[] = [
    { url: '/overview', name: 'Обзор', iconName: 'face' },
    { url: '/analytics', name: 'Аналитика', iconName: 'face' },
    { url: '/history', name: 'История', iconName: 'face' },
    { url: '/order', name: 'Добавить заказ', iconName: 'face' },
    { url: '/categories', name: 'Ассортимент', iconName: 'face' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
