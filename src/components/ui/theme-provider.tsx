
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps as NextThemesProviderProps } from "next-themes"

// Define the Attribute type to match next-themes expectations
type Attribute = string | 'class' | 'data-theme' | 'data-mode'

// Define our own ThemeProviderProps since we can't import from next-themes/dist/types
type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: string;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
  attribute?: Attribute | Attribute[]; // Fixed type to match next-themes expectations
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
