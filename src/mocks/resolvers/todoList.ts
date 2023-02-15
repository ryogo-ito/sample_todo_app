import { TodoType } from "../../features/todo/types";
import {
  PathParams,
  ResponseComposition,
  ResponseResolver,
  rest,
  RestContext,
  RestRequest,
} from "msw";
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

const get: ResponseResolver<RestRequest<never>, RestContext> = (
  req,
  res,
  ctx
) => {
  return res(ctx.status(200), ctx.json(todoList));
};

const post: ResponseResolver<RestRequest<never>, RestContext> = async (
  req,
  res,
  ctx
) => {
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
};

const del = (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
  const id = req.url.searchParams.get("id");

  return res(
    ctx.status(200),
    ctx.json(todoList.filter((todo) => todo.id !== Number(id)))
  );
};

export const todoMocks = {
  get,
  post,
  del,
};