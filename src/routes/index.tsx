import { useRoutes } from 'react-router-dom';
import { protectedRoutes } from './protected';

export function AppRoutes() {
  const routes = protectedRoutes;

  const element = useRoutes(routes);

  return <>{element}</>;
}
