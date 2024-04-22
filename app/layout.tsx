import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Toaster } from "sonner";

// PROVIDERS
import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { ConvexClientProvider } from "@/components/provider/ConvexProvider";
import { ModalProvider } from "@/components/provider/ModalProvider";

import "./globals.css";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Ishiki",
  description: "Clean notes app.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: '/logo.svg',
        href: "/logo.svg"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: '/logo-dark.svg',
        href: "/logo-dark.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="ishiki-theme"
          >
            <Toaster position="bottom-center" />
            <ModalProvider />
            <main>
              {children}
            </main>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
