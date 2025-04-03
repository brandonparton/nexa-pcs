import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Nexa PC's",
  description: "Custom PCs, Prebuilts, and Repairs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-black text-white px-6 py-4 flex gap-6">
          <Link href="/" className="font-bold text-xl text-blue-400">Nexa PC's</Link>
          <Link href="/build" className="hover:text-blue-300">Build</Link>
          <Link href="/store" className="hover:text-blue-300">Store</Link>
          <Link href="/repair" className="hover:text-blue-300">Repair</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}