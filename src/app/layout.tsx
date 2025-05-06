import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { getUser } from "@/lib/getUser";
import { Toaster } from "@/components/ui/sonner"


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Nocodefy",
  description: "The fastest way to build tiny tools",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.className} bg-background text-foreground`}>
          <ThemeContextProvider>
            <SidebarProvider>
              {user && <Sidebar />}
              <main className="h-screen flex flex-col items-center gap-12">
                <Navbar />
                <div className="w-full flex flex-1 flex-col p-5 overflow-hidden">
                  <div className="w-full flex-1 overflow-y-auto">
                    {children}
                  </div>
                </div>
              </main>
              <Toaster/>
            </SidebarProvider>
          </ThemeContextProvider>
      </body>
    </html>
  );
}
