import "../styles/globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Pretendard } from "@/styles/font";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "./LayoutProvider";

interface Metadata {
  title: string;
  description: string;
}

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "탑개미자원",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="ko">
      <body className={Pretendard.className}>
        <Toaster
          containerStyle={{
            fontSize: "0.875rem",
          }}
        />
        <div className="background" />
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
