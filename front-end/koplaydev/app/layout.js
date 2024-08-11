import { Inter } from "next/font/google";
import "./globals.scss";
import Headers from "./component/Headers";
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Ko-play",
  description: "Hope Education - koplay : multicultural education program",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "koplay",
  },
 
};
export const viewport = {
  themeColor: "#FFFFFF",
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ReduxProvider>
          <Headers />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
