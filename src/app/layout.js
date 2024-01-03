import { Control } from "./Control";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "./../components/Footer/Footer";
import Contact from "./../components/Contact/Contact";

export const metadata = {
  title: "origin project",
  description: "오리진 프로젝트",
  keywords: ["origin"],
};
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />

        {children}

        <Contact />
        <Footer />
      </body>
    </html>
  );
}
