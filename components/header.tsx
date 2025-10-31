"use client"

import { Cloud } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-gradient-to-r from-green-800 to-green-700 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">WeatherHub</span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-green-50 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/favorites" className="text-sm font-medium text-green-50 hover:text-white transition-colors">
              Favorites
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
