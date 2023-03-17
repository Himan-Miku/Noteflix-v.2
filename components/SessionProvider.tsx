"use client";

import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type ProviderProps = {
  children: React.ReactNode;
  session: Session | null;
};

export function SessionProvider({ children, session }: ProviderProps) {
  return <Provider>{children}</Provider>;
}
