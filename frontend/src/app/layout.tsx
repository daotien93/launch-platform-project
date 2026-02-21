import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { LocaleProvider } from "../context/LocaleContext";
import { LanguageSelector } from "../components/ui/LanguageSelector";
import { Button } from "../components/ui/Button";
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
        <AuthProvider>
          <LocaleProvider>
            <div className="flex min-h-screen flex-col relative">
              {/* Background emojis */}
              <div className="fixed inset-0 pointer-events-none opacity-5 overflow-hidden">
                <div className="absolute top-10 left-10 text-4xl animate-bounce">🍕</div>
                <div className="absolute top-20 right-20 text-3xl animate-pulse">🍔</div>
                <div className="absolute bottom-20 left-20 text-4xl animate-bounce" style={{animationDelay: '1s'}}>🍣</div>
                <div className="absolute bottom-10 right-10 text-3xl animate-pulse" style={{animationDelay: '2s'}}>🥗</div>
                <div className="absolute top-1/2 left-5 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🥤</div>
                <div className="absolute top-1/3 right-5 text-3xl animate-pulse" style={{animationDelay: '1.5s'}}>🍰</div>
                <div className="absolute bottom-1/3 left-10 text-2xl animate-bounce" style={{animationDelay: '2.5s'}}>🌮</div>
                <div className="absolute top-2/3 right-10 text-3xl animate-pulse" style={{animationDelay: '3s'}}>🍜</div>
              </div>
            <header className="border-b border-rgba-white-10 bg-rgba-black-60 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <div className="text-lg font-bold">
                  Hôm Nay <span className="text-emerald-400">Ăn Gì</span> Đây?
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                  <div className="hidden sm:block">
                    <LanguageSelector />
                  </div>

                  <div className="flex items-center gap-2 md:gap-3">
                    <Button variant="outline" className="text-xs px-2 py-1.5 md:px-3">
                      <span className="hidden sm:inline">➕ </span>Thêm quán
                    </Button>
                    <Button variant="outline" className="text-xs px-2 py-1.5 md:px-3">
                      <span className="hidden md:inline">Đăng </span>nhập
                    </Button>
                    <Button variant="primary" className="text-xs px-2 py-1.5 md:px-3">
                      <span className="hidden md:inline">Đăng </span>ký
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile language selector */}
              <div className="sm:hidden border-t border-rgba-white-5 px-4 py-2">
                <LanguageSelector />
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
        </AuthProvider>
      </body>
    </html>
  );
}

