import axios from "axios";
import { TodoType } from "../types";

export const callDeleteTodoList = async (
  id: number
): Promise<{ todos: TodoType[]; error?: Error }> => {
  try {
    const { data: todos } = await axios.delete<TodoType[]>("/mock/todo", {
      params: {
        id,
      },
    });
    return { todos };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};