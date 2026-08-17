import { Paytone_One, Nunito } from "next/font/google";
import "./globals.css";

const paytone = Paytone_One({
  weight: "400", 
  subsets: ["latin"],
  variable: "--font-paytone",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} ${paytone.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}