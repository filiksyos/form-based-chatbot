import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Form-Based Chatbot",
  description: "AI-powered conversational chatbot with interactive form questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
