import axios from "axios";
import { TodoType } from "../types";

export const callCreateTodo = async (
  title: string
): Promise<{ todos: TodoType[]; error?: Error }> => {
  try {
    const { data } = await axios.post<TodoType[]>("/mock/todo", {
      title,
    });

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};