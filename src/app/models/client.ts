import { IOrder } from "./order";

export interface IPhone {
  id: number;
  client_id: number;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

export interface IClient {
  id: number;
  first_name: string;
  last_name: string;
  patronymic: string;
  phone: string;
  email: string;
  created_at: Date;

  orders: {
    data: IOrder[];
  }
  emails: string[];
  phones: IPhone[];
}

export interface IClientSimple {
  id: number;
  fio: string;
  phone: string;
}

export const mappingClientToClientSimple = (client: IClient): IClientSimple | null => {
  if (!client) {
    return null;
  }

  let fio = client.last_name;
  if (client.first_name) {
    fio += ' ' + client.first_name;
  }
  if (client.patronymic) {
    fio += ' ' + client.patronymic;
  }

  return {
    id: client.id,
    phone: client.phone,
    fio,
  }
}