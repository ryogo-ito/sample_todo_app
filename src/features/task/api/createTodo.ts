import axios from "axios";
import { TaskBase } from "../types";

export const callCreateTodo = async (
  title: string
): Promise<{ todos: TaskBase[]; error?: Error }> => {
  try {
    const { data } = await axios.post<TaskBase[]>("/mock/todo", {
      title,
    });

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
