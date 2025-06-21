"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  X,
  BookOpen,
  Bell,
  Search,
  Globe,
  ChevronDown,
  Home,
  ChevronRight,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  BookMarked,
  Trophy,
  Calendar,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "info" | "success" | "warning"
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [])

  const loadNotifications = () => {
    // Mock notifications
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Course Available",
        message: "Advanced React Patterns is now live!",
        time: "2 hours ago",
        read: false,
        type: "info",
      },
      {
        id: "2",
        title: "Assignment Due",
        message: "Web Development project due tomorrow",
        time: "1 day ago",
        read: false,
        type: "warning",
      },
      {
        id: "3",
        title: "Course Completed",
        message: "Congratulations on completing UI/UX Design!",
        time: "3 days ago",
        read: true,
        type: "success",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery("")
    }
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ]

  const navItems = [
    { name: "courses", href: "/courses" },
    { name: "about", href: "/about" },
    { name: "contact", href: "/contact" },
  ]

  // Generate breadcrumbs
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter((segment) => segment)
    const breadcrumbs = [{ name: "Home", href: "/" }]

    let currentPath = ""
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ")
      breadcrumbs.push({ name, href: currentPath })
    })

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl shadow-lg border-b border-white/20"
            : "bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <BookOpen className="h-6 w-6 text-white" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-display font-bold text-white">
                eduverse
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-300 lowercase relative group ${
                    pathname === item.href ? "text-green-600" : "text-white/90 hover:text-green-400"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ${
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <AnimatePresence>
                  {showSearch ? (
                    <motion.form
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 250, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      onSubmit={handleSearch}
                      className="flex items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-9 text-sm border-gray-300 focus:border-green-500 bg-white text-gray-700"
                        autoFocus
                        onBlur={() => !searchQuery && setShowSearch(false)}
                      />
                    </motion.form>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSearch(true)}
                      className="text-white/90 hover:text-green-400 hover:bg-green-50"
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                  )}
                </AnimatePresence>
              </div>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white/90 hover:text-green-400 hover:bg-green-50">
                    <Globe className="w-4 h-4 mr-1" />
                    {languages.find((lang) => lang.code === selectedLanguage)?.flag}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-black/80 border border-white/20">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => setSelectedLanguage(language.code)}
                      className={`cursor-pointer text-white/90 hover:bg-gray-800 ${
                        selectedLanguage === language.code ? "bg-green-50 text-green-600" : ""
                      }`}
                    >
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Notifications */}
              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="relative text-white/90 hover:text-green-400 hover:bg-green-50"
                    >
                      <Bell className="w-4 h-4" />
                      {unreadCount > 0 && (
                        <Badge
                          variant="destructive"
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0 bg-red-500"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80 bg-black/80 border border-white/20">
                    <div className="p-3 border-b border-white/20">
                      <h3 className="font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <DropdownMenuItem
                          key={notification.id}
                          className="p-3 cursor-pointer hover:bg-gray-800 text-white/90"
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="flex items-start space-x-3 w-full">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.read ? "bg-gray-300" : "bg-blue-500"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white truncate">{notification.title}</p>
                              <p className="text-sm text-white/70 truncate">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Auth Buttons / Profile */}
              {session ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-green-500/20">
                        <AvatarImage
                          src={session.user?.image || "/placeholder-avatar.png"}
                          alt={session.user?.name || "User"}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold">
                          {session.user?.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-black/90 border border-white/20" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">{session.user?.name}</p>
                        <p className="text-xs leading-none text-slate-400">{session.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-white/20" />

                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Profile Settings</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/my-courses" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <BookMarked className="mr-2 h-4 w-4" />
                        <span>My Courses</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/achievements" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <Trophy className="mr-2 h-4 w-4" />
                        <span>Achievements</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/schedule" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Schedule</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/20" />

                    <DropdownMenuItem asChild>
                      <Link href="/billing" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link href="/help" className="text-white/90 hover:bg-gray-800 cursor-pointer">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        <span>Help & Support</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-white/20" />

                    <DropdownMenuItem
                      className="text-red-400 hover:bg-red-900/20 cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-white/90 hover:text-green-400 hover:bg-green-50">
                      sign in
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      get started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white/90 hover:text-green-400 hover:bg-green-50 transition-all duration-300"
            >
              <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/20 shadow-lg"
            >
              <div className="px-6 py-6 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 h-10 bg-white text-gray-700"
                  />
                  <Button type="submit" size="sm" className="px-4">
                    <Search className="w-4 h-4" />
                  </Button>
                </form>

                {/* Mobile Navigation Links */}
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block py-2 px-3 rounded-lg font-medium transition-colors ${
                        pathname === item.href
                          ? "text-green-600 bg-green-50"
                          : "text-white/90 hover:text-green-400 hover:bg-green-50"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile Auth Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="pt-4 border-t border-white/20 space-y-3"
                >
                  {session ? (
                    <>
                      <div className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={session.user?.image || "/placeholder-avatar.png"}
                            alt={session.user?.name || "User"}
                          />
                          <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                            {session.user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{session.user?.name}</p>
                          <p className="text-slate-400 text-sm">{session.user?.email}</p>
                        </div>
                      </div>

                      <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white/90 hover:text-green-400 hover:bg-green-50"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>

                      <Button
                        onClick={() => {
                          handleLogout()
                          setIsOpen(false)
                        }}
                        variant="outline"
                        className="w-full border-red-500 text-red-400 hover:bg-red-900/20"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full text-white/90 hover:text-green-400 hover:bg-green-50">
                          sign in
                        </Button>
                      </Link>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg">
                          get started
                        </Button>
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Breadcrumb Navigation */}
      {pathname !== "/" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-0 right-0 z-40 bg-black/80 backdrop-blur-sm border-b border-white/20 py-3"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.href} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />}
                  {index === 0 && <Home className="w-4 h-4 mr-2 text-gray-500" />}
                  {index === breadcrumbs.length - 1 ? (
                    <span className="text-green-600 font-medium">{crumb.name}</span>
                  ) : (
                    <Link href={crumb.href} className="text-white/90 hover:text-green-400 transition-colors">
                      {crumb.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </>
  )
}
