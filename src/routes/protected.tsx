import { Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';
import { Outlet, RouteObject } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { TaskTable } from '../features/task/components/TaskTable';
import { TaskDetail } from '../features/task/components/TaskDetail';
import { Calender } from '../features/calender/components/Calender';

function App() {
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
}

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <TaskTable />,
      },
      { path: '/task/:taskId', element: <TaskDetail /> },
      {
        path: '/calender',
        element: <Calender />,
      },
    ],
  },
];
