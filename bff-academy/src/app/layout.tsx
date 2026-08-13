import { Bevan, Poppins } from "next/font/google";
import "./globals.css";

const bevan = Bevan({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bevan",
});

const poppins = Poppins({
  weight: ["400", "500", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${bevan.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}