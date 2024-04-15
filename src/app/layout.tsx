import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-popins'
});

export const metadata: Metadata = {
  title: "EI",
  description: "EI is a platform that provides information about different events",
  icons: {
    icon : '/assets/images/logo-no-background.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables : { colorPrimary: '#624cf5'}
    }}>
      <html lang="en">
        <body className={cn("font-IBMplex antialiased", poppins.variable)}>
          {children}</body>
      </html>
    </ClerkProvider>
  );
}
