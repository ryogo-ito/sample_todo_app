import axios from "axios";
import { Todo } from "../types";

export const callDeleteTodoList = async (
  id: string
): Promise<{ todos: Todo[]; error?: Error }> => {
  try {
    const { data: todos } = await axios.delete<Todo[]>("/mock/todo", {
      params: {
        id,
      },
    });

    return { todos };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
