import { MainLayout } from "../layout/MainLayout";
import { Suspense } from "react";
import { Spinner } from "@chakra-ui/react";
import { Outlet, RouteObject } from "react-router-dom";
import { Todo } from "../features/todo/components/Todo";
import { TodoDetail } from "../features/todo/components/TodoDetail";

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Todo />,
      },
      { path: "/todo/:todoId", element: <TodoDetail /> },
    ],
  },
];