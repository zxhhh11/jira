// import {QueryClient, QueryClientProvider} from 'react-query';
import React, { ReactNode } from "react";

import { AuthProvider } from "./auth-context";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    // <QueryClientProvider client={new QueryClient()}>
    <AuthProvider>{children}</AuthProvider>
    // </QueryClientProvider>
  );
};
