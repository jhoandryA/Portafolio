"use client";
import { IconContext } from "react-icons";
import type { ReactNode } from "react";

const iconDefaults = {
  attr: { "aria-hidden": true as const, focusable: "false" as const },
};
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <IconContext.Provider value={iconDefaults}>{children}</IconContext.Provider>
  );
}
