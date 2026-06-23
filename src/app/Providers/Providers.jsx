"use client";

import { ThemeProvider } from "@gravity-ui/uikit";

export default function Providers({ children }) {
  return (
    <ThemeProvider theme="light">
      {children}
    </ThemeProvider>
  );
}