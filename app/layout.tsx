import type { Metadata } from "next";
import { Inter, Playwrite_US_Trad } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

const playwrite = Playwrite_US_Trad({
  weight: ['400'],
  variable: '--font-playwrite'
})

export const metadata: Metadata = {
  title: "La Casa del Alfajor",
  description: "Alfajores artesanales hechos con ingredientes naturales. Envío a todo Lima.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} ${playwrite.variable}`} suppressHydrationWarning>
        <CartProvider>
          {children}
          <Toaster position="bottom-right" />
        </CartProvider>
      </body>
    </html>
  );
}