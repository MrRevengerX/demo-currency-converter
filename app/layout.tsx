import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/lib/reactQueryProvider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "This is a simple currency converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-neutral-900`} cz-shortcut-listen="true">
        <ReactQueryProvider>
          {children}
          <footer className="flex py-3 items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://revengerx.dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Globe icon"
                width={16}
                height={16}
              />
              Checkout the portfolio →
            </a>
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
