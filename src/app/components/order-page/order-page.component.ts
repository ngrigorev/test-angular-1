import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { IClient, IOrder, Status, IRequestCreateClient } from 'src/app/models';
import { APIService } from 'src/app/services';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { InfoModalComponent } from '../info-modal/info-modal.component';
import { SearchModalComponent } from '../search-modal/search-modal.component';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.sass']
})
export class OrderPageComponent implements OnInit {
  id: number;
  order: IOrder | null = null;
  client: IClient | null = null;

  constructor(private api: APIService, private activateRoute: ActivatedRoute, public dialog: MatDialog) {
    this.activateRoute.params.subscribe(params => this.id = params['id']);
  }

  ngOnInit(): void {
    this.api.getOrder(this.id)
      .subscribe(dataOrder => {
        if (dataOrder.status === Status.Error) {
          return;
        }

        this.order = dataOrder.data;

        this.api.getOrderClient(this.id)
          .subscribe(dataClient => {
            if (dataClient.status === Status.Error) {
              return;
            }

            this.client = dataClient.data;
          });
      });
  }

  get canCreateFlag(): boolean {
    return !!this.order?.customer && !this.client;
  }

  openCreateDialog() {
    if (!this.canCreateFlag) {
      return;
    }

    this.dialog.open(ConfirmModalComponent)
      .afterClosed()
      .subscribe((result: string) => {
        this.createClient(result);
      });
  }

  createClient(password: string) {
    if (!password) {
      return;
    }

    const customer = this.order?.customer!;

    const client: IRequestCreateClient = {
      password,
      data: {
        first_name: customer.first_name,
        last_name: customer.last_name,
        patronymic: customer.third_name,
        phone: customer.phone,
      } as IClient
    };

    this.api.createOrderClient(this.id, client)
      .subscribe(response => {
        if (response.status === Status.Success) {
          this.client = response.data;
        }

        if (response.message) {
          this.openMessageInfo(response.message);
        }
      });
  }

  unlink() {
    if (!this.order || !this.client) {
      return;
    }

    this.api.unlinkClientFromOrder(this.order?.id!, this.client?.id!)
      .subscribe(response => {
        if (response.status === Status.Success) {
          this.client = null;
        }

        if (response.message) {
          this.openMessageInfo(response.message);
        }
      });
  }

  openLinkDialog() {
    if (!this.canCreateFlag) {
      return;
    }

    this.dialog.open(SearchModalComponent)
      .afterClosed()
      .subscribe((clientId: number) => {
        this.api.linkClientToOrder(this.order?.id!, clientId)
          .subscribe(response => {
            if (response.status === Status.Success) {
              this.client = response.data;
            }

            if (response.message) {
              this.openMessageInfo(response.message);
            }
          })
      });
  }

  openMessageInfo(msg: string) {
    this.dialog.open(InfoModalComponent, { data: msg });
  }
}
