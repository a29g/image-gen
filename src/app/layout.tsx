import ClientProvider from "../../components/ClientProvider";
import Header from "../../components/Header";
import Prompt from "../../components/Prompt";
import "../styles/global.css";

export const metadata = {
  title: "Art Gallery",
  description: "created by Adarsh gupta",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          {/* Header*/}
          <Header />
          {/* prompt  */}
          <Prompt />
          {/* images  */}
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
