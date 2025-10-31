import type React from "react"
import type { Metadata } from "next"
import { Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Providers } from "@/app/providers"
import { Toaster } from "sonner"
import { Store } from "@/components/store-provider"

const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Weather Hub - Global Weather Information",
  description:
    "Search and view current weather information for cities around the world. Add your favorite cities and get detailed weather insights.",
  keywords: "weather, forecast, cities, temperature, global"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#166534" />
      </head>
      <body className={`${lato.variable} font-sans antialiased`} suppressHydrationWarning>
        <Store>
          <Providers>{children}</Providers>
        </Store>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
