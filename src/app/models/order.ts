export interface IOrderCustomer {
  first_name: string;
  last_name: string;
  third_name: string;
  phone: string;
}

export interface IOrder {
  id: number;
  customer: IOrderCustomer;
}