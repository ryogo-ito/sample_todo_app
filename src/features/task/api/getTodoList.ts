import { axiosInstance } from '../../../axios';
import { Todo } from '../types';

export const callGetTaskList = async (): Promise<{
  todos: Todo[];
  error?: Error;
}> => {
  try {
    const { data } = await axiosInstance.get<Todo[]>('/api/todos');

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
