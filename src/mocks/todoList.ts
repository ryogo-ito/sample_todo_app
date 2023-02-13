import { TodoType } from "../features/todo/types";
import { rest } from "msw";

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
    title: "ちんこ",
    complete: false,
  },
  {
    id: 4,
    title: "歯磨きちんこちんこ歯磨きちんこちんこ歯磨きちんこちんこ",
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
] as const;