export interface TaskBase {
  id: string;
  title: string;
  complete: boolean;
  createdAt: Date;
  updatedAt: Date;
}


export interface TaskInput {
  title: string;
  description?: string;
}
