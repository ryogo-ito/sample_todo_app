import { axiosInstance } from '../../../axios';

export const callCreateTodo = async (
  name: string,
): Promise<{ error?: Error }> => {
  try {
    await axiosInstance.post('/api/todos', {
      name,
    });

    return {};
  } catch (e) {
    return { error: e as Error };
  }
};
