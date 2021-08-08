import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IClient, IOrder, IResponse, IRequestCreateClient, IClientSimple, mappingClientToClientSimple } from '../models';
import { ENV_TOKEN } from '../app.module';
import { IEnvironment } from 'src/environments/models';

@Injectable()
export class APIService {
  host: string;

  constructor(private http: HttpClient, @Inject(ENV_TOKEN) environment: IEnvironment) {
    this.host = environment.host;
  }

  getUrl(path: string): string {
    return this.host + path;
  }

  getOrders(): Observable<IResponse<IOrder[]>> {
    const path = `api/orders`;
    return this.http.get(this.getUrl(path)) as Observable<IResponse<IOrder[]>>;
  }

  getOrder(idOrder: number): Observable<IResponse<IOrder>> {
    const path = `api/orders/${idOrder}`;
    return this.http.get(this.getUrl(path)) as Observable<IResponse<IOrder>>;
  }

  getOrderClient(idOrder: number): Observable<IResponse<IClient>> {
    const path = `api/orders/${idOrder}/clients`;
    return this.http.get(this.getUrl(path)) as Observable<IResponse<IClient>>;
  }

  getClients(filter: string): Observable<IResponse<IClientSimple[]>> {
    const path = `api/clients`;
    const request = this.http.get(this.getUrl(path), { params: { filter } }) as Observable<IResponse<IClient[]>>;
    return request.pipe(map(response => <IResponse<IClientSimple[]>>{
      status: response.status,
      message: response.message,
      data: response.data
        ? response.data?.map(mappingClientToClientSimple).filter(x => x) as IClientSimple[]
        : null
    }));
  }

  createOrderClient(idOrder: number, data: IRequestCreateClient): Observable<IResponse<IClient>> {
    const path = `api/orders/${idOrder}/clients`;
    return this.http.post(this.getUrl(path), data) as Observable<IResponse<IClient>>;
  }

  linkClientToOrder(idOrder: number, idClient: number): Observable<IResponse<IClient>> {
    const path = `api/link/add`;
    return this.http.post(this.getUrl(path), { idOrder, idClient }) as Observable<IResponse<IClient>>;
  }

  unlinkClientFromOrder(idOrder: number, idClient: number): Observable<IResponse<unknown>> {
    const path = `api/link/remove`;
    return this.http.post(this.getUrl(path), { idOrder, idClient }) as Observable<IResponse<unknown>>;
  }
}