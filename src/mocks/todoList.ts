import { TodoType } from "../features/todo/types";
import { rest } from "msw";
import { a } from "msw/lib/glossary-de6278a9";

interface ReqType {
  title: string;
  complete: boolean;
}

interface ResType {
  id: string;
  title: string;
  complete: string;
}

export const todoList: TodoType[] = [
  {
    id: 1,
    title: "歯磨き",
    complete: false,
  },
  {
    id: 2,
    title: "宿題",
    complete: true,
  },
  {
    id: 3,
    title: "洗濯",
    complete: false,
  },
  {
    id: 4,
    title: "買い物",
    complete: false,
  },
];

export const TODO_HANDLER = [
  rest.get("/mock/todo", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(todoList));
  }),
  rest.post<ReqType, ResType>("/mock/todo", async (req, res, ctx) => {
    const { title } = await req.json();
    return res(
      ctx.status(200),
      ctx.json([
        ...todoList,
        {
          id: ++todoList.length,
          title,
          complete: false,
        },
      ])
    );
  }),
  rest.delete("/mock/todo", (req, res, ctx) => {
    const id = req.url.searchParams.get("id");

    return res(
      ctx.status(200),
      ctx.json(todoList.filter((todo) => todo.id !== Number(id)))
    );
  }),
] as const;