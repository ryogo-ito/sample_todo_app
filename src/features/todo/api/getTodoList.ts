import axios from "axios";
import { TodoType } from "../types";

export const callGetTodoList = async (): Promise<{
  todos: TodoType[];
  error?: Error;
}> => {
  try {
    const { data } = await axios.get<TodoType[]>("/mock/todo");

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};