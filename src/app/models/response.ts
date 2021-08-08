export interface IResponse<T> {
  status: Status;
  message?: string;
  data: T | null;
}

export enum Status {
  Error = 'error',
  Success = 'success',
}