import React from "react";
import { useAuthStore } from "../store/AuthStore";
import { Navigate } from "react-router-dom";
import { PublicRoutes } from "./PublicRoutes";
import { Routes, Route } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { NotFounPage } from "../templates/NotFounPage";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        path="/auth/*"
        element={
          <IsPublic>
            <PublicRoutes />
          </IsPublic>
        }
      />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <PrivateRoutes />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFounPage />} />
    </Routes>
  );
};

type TProps = {
  children: React.ReactNode;
};

/**
 * This is a TypeScript React function that checks if a user is authenticated and redirects them to the
 * sign-in page if they are not.
 * @param  - The code defines a React functional component called `RequireAuth` that takes in a single
 * prop called `children`. The component uses the `useAuthStore` hook to retrieve the `isAuthenticated`
 * and `user` values from the authentication store. If `isAuthenticated` is false, the component
 * returns
 * @returns The `RequireAuth` component is being returned. If the user is not authenticated, the
 * component returns a `Navigate` component that redirects the user to the sign-in page. If the user is
 * authenticated, the component returns the `children` prop, which is a set of components that are
 * passed as children to the `RequireAuth` component.
 */
export const RequireAuth: React.FC<TProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) return <Navigate to={"/auth/signin"} />;
  return <>{children}</>;
};

/**
 * The IsPublic function checks if a user is authenticated and redirects them to the home page if they
 * are, otherwise it renders its children.
 * @param  - The above code defines a React functional component named `IsPublic` that takes in a
 * single prop named `children`. The component uses the `useAuthStore` hook to get the
 * `isAuthenticated` and `user` values from the authentication store. If `isAuthenticated` is true, the
 * component
 * @returns If the user is authenticated, the component returns a `Navigate` component that redirects
 * the user to the home page. Otherwise, it returns the `children` prop, which is the content that is
 * passed to the component.
 */
export const IsPublic: React.FC<TProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated) return <Navigate to={"/home"} />;
  return <>{children}</>;
};
