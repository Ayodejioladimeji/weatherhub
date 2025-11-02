"use client"

import { Cloud, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-200 bg-gradient-to-r from-green-800 to-green-700 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Cloud className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">WeatherHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link href="/" className="text-sm font-medium text-green-50 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/favorites" className="text-sm font-medium text-green-50 hover:text-white transition-colors">
              Favorites
            </Link>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:bg-green-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <nav
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div
            className={`flex flex-col gap-4 py-4 px-2 border-t border-green-600 ${isMenuOpen ? "slide-down" : "slide-up"}`}
          >
            <Link
              href="/"
              onClick={handleNavClick}
              className="text-sm font-medium text-green-50 hover:text-white hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/favorites"
              onClick={handleNavClick}
              className="text-sm font-medium text-green-50 hover:text-white hover:bg-green-700 px-3 py-2 rounded-lg transition-colors"
            >
              Favorites
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
