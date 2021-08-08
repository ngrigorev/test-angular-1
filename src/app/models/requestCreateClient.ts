import { IClient } from "./client";

export interface IRequestCreateClient {
  password: string;
  data: IClient;
}