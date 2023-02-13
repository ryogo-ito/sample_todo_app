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

export const handlers = [
  rest.get("/mock/todo", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
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
      ])
    );
  }),

  rest.post<ReqType, ResType>("/mock/todo", async (req, res, ctx) => {
    const { title } = await req.json();
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 5,
          title,
          complete: false,
        },
      ])
    );
  }),
];