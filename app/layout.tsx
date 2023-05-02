import "./globals.css";
import AuthContextProvider from "@/components/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body className="w-screen h-screen flex justify-center items-center">
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
