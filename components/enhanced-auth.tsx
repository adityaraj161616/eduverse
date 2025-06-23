"use client"

import type React from "react"

import { useState } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Key,
  CheckCircle,
  AlertCircle,
  ChromeIcon as Google,
  Github,
} from "lucide-react"
import { toast } from "sonner"

interface AuthState {
  isLoading: boolean
  showPassword: boolean
  authMode: "login" | "register" | "forgot" | "verify"
  formData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    verificationCode: string
  }
  errors: {
    [key: string]: string
  }
  securityLevel: "basic" | "enhanced" | "premium"
  twoFactorEnabled: boolean
}

export function EnhancedAuth() {
  const { data: session, status } = useSession()
  const [authState, setAuthState] = useState<AuthState>({
    isLoading: false,
    showPassword: false,
    authMode: "login",
    formData: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      verificationCode: "",
    },
    errors: {},
    securityLevel: "basic",
    twoFactorEnabled: false,
  })

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (authState.authMode === "register" && !authState.formData.name.trim()) {
      errors.name = "Name is required"
    }

    if (!authState.formData.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(authState.formData.email)) {
      errors.email = "Email is invalid"
    }

    if (authState.authMode !== "forgot" && !authState.formData.password) {
      errors.password = "Password is required"
    } else if (authState.formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    }

    if (authState.authMode === "register" && authState.formData.password !== authState.formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
    }

    setAuthState((prev) => ({ ...prev, errors }))
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setAuthState((prev) => ({ ...prev, isLoading: true }))

    try {
      if (authState.authMode === "login") {
        const result = await signIn("credentials", {
          email: authState.formData.email,
          password: authState.formData.password,
          redirect: false,
        })

        if (result?.error) {
          toast.error("Invalid credentials")
        } else {
          toast.success("Welcome back!")
        }
      } else if (authState.authMode === "register") {
        // Handle registration
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: authState.formData.name,
            email: authState.formData.email,
            password: authState.formData.password,
          }),
        })

        if (response.ok) {
          toast.success("Account created successfully!")
          setAuthState((prev) => ({ ...prev, authMode: "login" }))
        } else {
          const data = await response.json()
          toast.error(data.message || "Registration failed")
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }))
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      toast.error("Social login failed")
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const getSecurityColor = () => {
    switch (authState.securityLevel) {
      case "basic":
        return "text-yellow-400 border-yellow-400/30"
      case "enhanced":
        return "text-blue-400 border-blue-400/30"
      case "premium":
        return "text-green-400 border-green-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.3,
      },
    },
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (session) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-black text-white flex items-center justify-center p-4"
      >
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <Avatar className="w-20 h-20 border-4 border-green-500/30">
                <AvatarImage src={session.user?.image || ""} />
                <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl">
                  {session.user?.name?.[0]?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Welcome back!</CardTitle>
            <CardDescription className="text-white/60">You are successfully authenticated</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{session.user?.name}</p>
                    <p className="text-xs text-white/60">Full Name</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{session.user?.email}</p>
                    <p className="text-xs text-white/60">Email Address</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-white">Security Level</p>
                    <p className="text-xs text-white/60">Account Protection</p>
                  </div>
                </div>
                <Badge variant="outline" className={getSecurityColor()}>
                  {authState.securityLevel}
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                asChild
              >
                <a href="/dashboard">Go to Dashboard</a>
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900/50 to-black" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
          <CardHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <CardTitle className="text-2xl text-white">
              {authState.authMode === "login" && "Welcome Back"}
              {authState.authMode === "register" && "Create Account"}
              {authState.authMode === "forgot" && "Reset Password"}
              {authState.authMode === "verify" && "Verify Account"}
            </CardTitle>
            <CardDescription className="text-white/60">
              {authState.authMode === "login" && "Sign in to your account to continue"}
              {authState.authMode === "register" && "Join thousands of learners worldwide"}
              {authState.authMode === "forgot" && "Enter your email to reset password"}
              {authState.authMode === "verify" && "Enter the verification code sent to your email"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.form
                key={authState.authMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {authState.authMode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={authState.formData.name}
                        onChange={(e) =>
                          setAuthState((prev) => ({
                            ...prev,
                            formData: { ...prev.formData, name: e.target.value },
                          }))
                        }
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    {authState.errors.name && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {authState.errors.name}
                      </p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/80">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={authState.formData.email}
                      onChange={(e) =>
                        setAuthState((prev) => ({
                          ...prev,
                          formData: { ...prev.formData, email: e.target.value },
                        }))
                      }
                      className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  {authState.errors.email && (
                    <p className="text-red-400 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {authState.errors.email}
                    </p>
                  )}
                </div>

                {authState.authMode !== "forgot" && authState.authMode !== "verify" && (
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/80">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      <Input
                        id="password"
                        type={authState.showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={authState.formData.password}
                        onChange={(e) =>
                          setAuthState((prev) => ({
                            ...prev,
                            formData: { ...prev.formData, password: e.target.value },
                          }))
                        }
                        className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-white/40 hover:text-white/60"
                        onClick={() => setAuthState((prev) => ({ ...prev, showPassword: !prev.showPassword }))}
                      >
                        {authState.showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    {authState.errors.password && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {authState.errors.password}
                      </p>
                    )}
                  </div>
                )}

                {authState.authMode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/80">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={authState.formData.confirmPassword}
                        onChange={(e) =>
                          setAuthState((prev) => ({
                            ...prev,
                            formData: { ...prev.formData, confirmPassword: e.target.value },
                          }))
                        }
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      />
                    </div>
                    {authState.errors.confirmPassword && (
                      <p className="text-red-400 text-sm flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {authState.errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {authState.authMode === "verify" && (
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode" className="text-white/80">
                      Verification Code
                    </Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      <Input
                        id="verificationCode"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={authState.formData.verificationCode}
                        onChange={(e) =>
                          setAuthState((prev) => ({
                            ...prev,
                            formData: { ...prev.formData, verificationCode: e.target.value },
                          }))
                        }
                        className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        maxLength={6}
                      />
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={authState.isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-12"
                >
                  {authState.isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {authState.authMode === "login" && "Sign In"}
                      {authState.authMode === "register" && "Create Account"}
                      {authState.authMode === "forgot" && "Send Reset Link"}
                      {authState.authMode === "verify" && "Verify Account"}
                    </>
                  )}
                </Button>
              </motion.form>
            </AnimatePresence>

            {(authState.authMode === "login" || authState.authMode === "register") && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("google")}
                    disabled={authState.isLoading}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Google className="w-4 h-4 mr-2" />
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleSocialLogin("github")}
                    disabled={authState.isLoading}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                </div>
              </>
            )}

            <div className="text-center space-y-2">
              {authState.authMode === "login" && (
                <>
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setAuthState((prev) => ({ ...prev, authMode: "forgot" }))}
                    className="text-white/60 hover:text-white"
                  >
                    Forgot your password?
                  </Button>
                  <p className="text-white/60">
                    Don't have an account?{" "}
                    <Button
                      type="button"
                      variant="link"
                      onClick={() => setAuthState((prev) => ({ ...prev, authMode: "register" }))}
                      className="text-blue-400 hover:text-blue-300 p-0"
                    >
                      Sign up
                    </Button>
                  </p>
                </>
              )}

              {authState.authMode === "register" && (
                <p className="text-white/60">
                  Already have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setAuthState((prev) => ({ ...prev, authMode: "login" }))}
                    className="text-blue-400 hover:text-blue-300 p-0"
                  >
                    Sign in
                  </Button>
                </p>
              )}

              {(authState.authMode === "forgot" || authState.authMode === "verify") && (
                <Button
                  type="button"
                  variant="link"
                  onClick={() => setAuthState((prev) => ({ ...prev, authMode: "login" }))}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Back to sign in
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
