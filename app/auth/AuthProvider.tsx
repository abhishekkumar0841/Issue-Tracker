'use client'
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren, ReactNode } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
