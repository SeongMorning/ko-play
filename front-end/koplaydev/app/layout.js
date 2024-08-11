import { Inter } from "next/font/google";
import "./globals.scss";
import Headers from "./component/Headers";
import ReduxProvider from "@/redux/provider";


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Ko-play",
  description: "Hope Education - koplay : multicultural education program",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "koplay",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    orientation: "landscape-primary",
    title: "koplay",
  },
  // Viewport 설정을 포함한 메타데이터
  viewport: {
    width: "device-width",
    viewportFit: "cover",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: "no",
  },
 
};
export const viewport = {
  themeColor: "#FFFFFF",
  width : "device-width",
  userScalable : "no"
}

export default function RootLayout({ children }) {

  return (
    <html lang="ko">
    <head>
      {/* 메타데이터와 뷰포트 설정을 자동으로 적용 */}
      <meta name="viewport" content={metadata.viewport ? `width=${metadata.viewport.width}, viewport-fit=${metadata.viewport.viewportFit}, initial-scale=${metadata.viewport.initialScale}, maximum-scale=${metadata.viewport.maximumScale}, user-scalable=${metadata.viewport.userScalable}` : 'width=device-width, initial-scale=1'} />
      <meta name="theme-color" content={metadata.themeColor} />
      <link rel="manifest" href={metadata.manifest} />
      <meta name="apple-mobile-web-app-capable" content={metadata.appleWebApp?.capable ? "yes" : "no"} />
      <meta name="apple-mobile-web-app-status-bar-style" content={metadata.appleWebApp?.statusBarStyle} />
      <meta name="apple-mobile-web-app-title" content={metadata.appleWebApp?.title} />
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </head>
    <body className={inter.className}>
      <ReduxProvider>
        <Headers />
        {children}
      </ReduxProvider>
    </body>
  </html>
  );
}
