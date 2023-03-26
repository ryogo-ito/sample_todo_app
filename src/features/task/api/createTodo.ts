import axios from "axios";
import { Todo } from "../types";

export const callCreateTodo = async (
  title: string
): Promise<{ todos: Todo[]; error?: Error }> => {
  try {
    const { data } = await axios.post<Todo[]>("/mock/todo", {
      title,
    });

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
