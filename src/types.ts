export interface FireBaseRes<T> {
  createTime: string;
  fields: T;
  name: string;
  updateTime: string;
}

export interface FireBaseValue {
  stringValue: string;
  timestampValue: string;
  numberValue: number;
}
