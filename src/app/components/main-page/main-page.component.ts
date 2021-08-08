import { Component, OnInit } from '@angular/core';
import { IOrder, Status } from 'src/app/models';
import { APIService } from 'src/app/services';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {
  orders: IOrder[] = [];

  constructor(private api: APIService) { }

  ngOnInit(): void {
    this.api.getOrders()
      .subscribe(dataOrders => {
        if (dataOrders.status === Status.Error) {
          return;
        }

        this.orders = dataOrders.data!;
      });
  }
}
