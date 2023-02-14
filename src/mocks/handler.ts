import { todoMocks } from "./resolvers/todoList";
import { rest } from "msw";

export const handlers = [
  rest.get("/mock/todo", todoMocks.get),
  rest.post("/mock/todo", todoMocks.post),
  rest.delete("/mock/todo", todoMocks.del),
];