"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Video,
  TrendingUp,
  BookOpen,
  Award,
  Calendar,
  HelpCircle,
} from "lucide-react"

export default function Navbar() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    // Check initial scroll position
    handleScroll()

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {scrolled && (
          <motion.nav
            key="navbar"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed top-0 left-0 right-0 z-50 navbar-solid"
          >
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">E</span>
                  </div>
                  <span className="text-2xl font-logo bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-normal">
                    EduVerse
                  </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="navbar-button px-3 py-2">
                    Home
                  </Link>
                  <Link href="/courses" className="navbar-button px-3 py-2">
                    Courses
                  </Link>
                  <Link href="/about" className="navbar-button px-3 py-2">
                    About
                  </Link>
                  <Link href="/contact" className="navbar-button px-3 py-2">
                    Contact
                  </Link>
                </div>

                {/* Auth Section */}
                <div className="flex items-center space-x-4">
                  {session ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/10">
                          <Avatar className="h-10 w-10 border-2 border-blue-500/20 hover:border-blue-500/40 transition-colors">
                            <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                              {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-64 p-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 shadow-xl"
                        align="end"
                        forceMount
                      >
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none text-white">{session.user?.name}</p>
                            <p className="text-xs leading-none text-slate-400">{session.user?.email}</p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-700" />

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/profile" className="flex items-center">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/dashboard" className="flex items-center">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            <span>Dashboard</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/virtual-classes" className="flex items-center">
                            <Video className="mr-2 h-4 w-4" />
                            <span>Virtual Classes</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/progress" className="flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            <span>Progress</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/my-courses" className="flex items-center">
                            <BookOpen className="mr-2 h-4 w-4" />
                            <span>My Courses</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/achievements" className="flex items-center">
                            <Award className="mr-2 h-4 w-4" />
                            <span>Achievements</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/schedule" className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Schedule</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator className="bg-slate-700" />

                        <DropdownMenuItem
                          className="text-slate-200 hover:text-white hover:bg-slate-800 focus:text-white focus:bg-slate-800 cursor-pointer"
                          asChild
                        >
                          <Link href="/help" className="flex items-center">
                            <HelpCircle className="mr-2 h-4 w-4" />
                            <span>Help & Support</span>
                          </Link>
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 focus:text-red-300 focus:bg-red-900/20 cursor-pointer"
                          onClick={handleSignOut}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" className="navbar-button" asChild>
                        <Link href="/login">Sign In</Link>
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-2 rounded-full transition-all duration-300"
                      >
                        <Link href="/register">Get Started</Link>
                      </Button>
                    </div>
                  )}

                  {/* Mobile Menu Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="md:hidden text-white hover:bg-white/10"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </div>
              </div>

              {/* Mobile Navigation */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden border-t border-white/10 bg-black/90"
                  >
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      <Link
                        href="/"
                        className="mobile-menu-item block px-3 py-2 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Home
                      </Link>
                      <Link
                        href="/courses"
                        className="mobile-menu-item block px-3 py-2 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Courses
                      </Link>
                      <Link
                        href="/about"
                        className="mobile-menu-item block px-3 py-2 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        About
                      </Link>
                      <Link
                        href="/contact"
                        className="mobile-menu-item block px-3 py-2 rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        Contact
                      </Link>
                      {!session && (
                        <>
                          <Link
                            href="/login"
                            className="mobile-menu-item block px-3 py-2 rounded-md"
                            onClick={() => setIsOpen(false)}
                          >
                            Sign In
                          </Link>
                          <Link
                            href="/register"
                            className="block px-3 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            Get Started
                          </Link>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
