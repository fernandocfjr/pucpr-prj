import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LoadingScreen } from "./LoadingScreen";

type PublicRouteProps = {
  children: ReactElement;
};

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen label="Carregando..." />;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
