import type { Metadata } from "next";
import { cookies } from "next/headers";

import { GamesProvider, QueryProvider, ThemeProvider } from "../context";

import { SkeletonTheme } from "react-loading-skeleton";

// Styles
import { css } from "../../styled-system/css";
import "./globals.css";

// Fonts
import { Exo_2, Outfit, Zen_Tokyo_Zoo } from "next/font/google";
import "@fontsource-variable/exo-2";
import "@fontsource-variable/outfit";
import "@fontsource/zen-tokyo-zoo";

const exo = Exo_2({
  variable: "--font-exo-2",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

const zenTokyo = Zen_Tokyo_Zoo({
  variable: "--font-zen-tokyo",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "GamesCollector",
  description: "Build your own collection of games",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");

  return (
    <html
      lang="en"
      data-theme={theme ? theme.value : process.env.NEXT_PUBLIC_THEME_DEFAULT}
    >
      <body
        className={`${exo.variable} ${outfit.variable} ${zenTokyo.variable} ${css({ textStyle: "body" })} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider>
            <GamesProvider>
              <SkeletonTheme baseColor="#2F2633" highlightColor="#734985">
                {children}
              </SkeletonTheme>
            </GamesProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
