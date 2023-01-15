import Head from "./head";
import "../styles/globals.css";
import Header from "./Header";

export default async function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />

        {children}
      </body>
    </html>
  );
}
