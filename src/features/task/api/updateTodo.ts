import { axiosInstance } from '../../../axios';

export const callUpdateTodoComplete = async (
  id: string,
): Promise<{ error?: Error }> => {
  try {
    await axiosInstance.put(`/api/todos/${id}`);

    return {};
  } catch (e) {
    return { error: e as Error };
  }
};
