import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "../context/LocaleContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hôm nay ăn gì đây?",
  description: "Khám phá quán ăn Quy Nhơn cực hot gần bạn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-neutral-950 text-white`}
      >
        <LocaleProvider>
          <div className="flex min-h-screen flex-col">
          <header className="border-b border-rgba-white-10 bg-rgba-black-60 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
              <div className="text-lg font-bold">
                Hôm Nay <span className="text-emerald-400">Ăn Gì</span> Đây?
              </div>
              <div className="text-sm text-neutral-300">
                Khám phá địa điểm ăn uống cực hot
              </div>
            </div>
          </header>

          <main className="mx-auto flex w-full max-w-6xl flex-1 px-4 py-6">
            {children}
          </main>

            <footer className="border-t border-rgba-white-10 bg-rgba-black-60 py-4 text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} Hôm Nay Ăn Gì Đây?
          </footer>
        </div>
        </LocaleProvider>
      </body>
    </html>
  );
}

