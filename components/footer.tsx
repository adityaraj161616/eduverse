"use client"

import Link from "next/link"
import { BookOpen, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-green-900/20" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">eduverse</span>
            </Link>
            <p className="text-slate-300 leading-relaxed font-light">
              Empowering minds through innovative education and transformative learning experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">quick links</h3>
            <ul className="space-y-3">
              {[
                { href: "/courses", label: "courses" },
                { href: "/about", label: "about" },
                { href: "/contact", label: "contact" },
                { href: "/blog", label: "blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">support</h3>
            <ul className="space-y-3">
              {[
                { href: "/help", label: "help center" },
                { href: "/privacy", label: "privacy policy" },
                { href: "/terms", label: "terms of service" },
                { href: "/faq", label: "faq" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-slate-400">
                <Mail className="h-4 w-4" />
                <span className="font-light">hello@eduverse.com</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <Phone className="h-4 w-4" />
                <span className="font-light">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-slate-400">
                <MapPin className="h-4 w-4" />
                <span className="font-light">san francisco, ca</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 font-light">&copy; 2024 eduverse. all rights reserved.</p>
          <p className="text-slate-400 font-light mt-4 md:mt-0">made with ❤️ for learners worldwide</p>
        </div>
      </div>
    </footer>
  )
}
