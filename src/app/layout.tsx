import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BackgroundDecor } from "@/components/BackgroundDecor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "AI-Powered Web Performance Optimizer",
  description: "Analyze your website performance with AI-powered recommendations for optimization",
  keywords: "web performance, lighthouse, core web vitals, website optimization, AI recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.variable} min-h-screen bg-background text-foreground antialiased`}>        
        <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="inline-flex items-center gap-2" aria-label="Go to homepage">
              <div className="h-6 w-6 rounded-md bg-black/90 dark:bg-white/90" aria-hidden="true"></div>
              <span className="text-sm font-semibold tracking-tight">Web Performance Optimizer</span>
            </a>
            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#features" className="hover:text-foreground transition-colors">Features</a>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
                <a href="#cta" className="hover:text-foreground transition-colors">Get started</a>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>
        <BackgroundDecor />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="mt-8 border-t">
          <div className="container mx-auto px-4 py-6 text-xs text-muted-foreground flex items-center justify-between">
            <span>© {new Date().getFullYear()} WPO. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a className="hover:text-foreground" href="#privacy">Privacy</a>
              <a className="hover:text-foreground" href="#terms">Terms</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
