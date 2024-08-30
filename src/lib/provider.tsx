"use client";

import { SessionProvider } from "next-auth/react";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function Provider({
  children,
}: ThemeProviderProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
