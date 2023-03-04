import axios from "axios";
import { TaskBase } from "../types";

export const callDeleteTodoList = async (
  id: string
): Promise<{ todos: TaskBase[]; error?: Error }> => {
  try {
    const { data: todos } = await axios.delete<TaskBase[]>("/mock/todo", {
      params: {
        id,
      },
    });

    return { todos };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
