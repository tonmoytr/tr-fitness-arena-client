"use client";

import { ThemeProvider } from "@gravity-ui/uikit";
import { Toaster } from "sonner";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme="light">
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
