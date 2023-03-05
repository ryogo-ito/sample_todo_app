import axios from "axios";
import { TaskBase } from "../types";

export const callGetTodoList = async (): Promise<{
  todos: TaskBase[];
  error?: Error;
}> => {
  try {
    const { data } = await axios.get<TaskBase[]>("/mock/todo");

    return { todos: data };
  } catch (e) {
    return { todos: [], error: e as Error };
  }
};
