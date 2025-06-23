"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Calendar, Shield, ImageIcon } from "lucide-react"

export default function TestAuthPage() {
  const { data: session, status } = useSession()
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testUserLookup = async () => {
    if (!session?.user?.email) return

    setLoading(true)
    try {
      const response = await fetch(`/api/auth/verify-user?email=${session.user.email}`)
      const data = await response.json()
      setUserInfo(data.user)
    } catch (error) {
      console.error("Error fetching user info:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Authentication Test</CardTitle>
            <CardDescription className="text-slate-300">
              Please sign in to test the authentication system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/90">You need to be logged in to test the authentication system.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Authentication Test Dashboard</h1>
          <p className="text-slate-400">Verify that signup, login, and profile management work correctly</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Session Info */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="w-5 h-5" />
                Session Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-green-500/20">
                  <AvatarImage
                    src={session.user?.image || "/placeholder-avatar.png"}
                    alt={session.user?.name || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg font-semibold">
                    {session.user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-semibold">{session.user?.name}</h3>
                  <p className="text-slate-400 text-sm">{session.user?.email}</p>
                  <Badge variant="secondary" className="mt-1">
                    {(session.user as any)?.provider || "credentials"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-green-500" />
                  <span className="text-white">Email:</span>
                  <span className="text-slate-300">{session.user?.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-white">Role:</span>
                  <span className="text-slate-300">{(session.user as any)?.role || "student"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ImageIcon className="w-4 h-4 text-purple-500" />
                  <span className="text-white">Avatar:</span>
                  <span className="text-slate-300">{session.user?.image ? "Google Photo" : "Placeholder"}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Info */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Database Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!userInfo ? (
                <Button
                  onClick={testUserLookup}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                >
                  {loading ? "Loading..." : "Fetch User Data from MongoDB"}
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">User ID:</span>
                    <span className="text-slate-300 font-mono text-xs">{userInfo.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Provider:</span>
                    <Badge variant="outline" className="text-slate-300">
                      {userInfo.provider}
                    </Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Enrolled Courses:</span>
                    <span className="text-slate-300">{userInfo.enrolledCourses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Completed Courses:</span>
                    <span className="text-slate-300">{userInfo.completedCourses}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Created:</span>
                    <span className="text-slate-300">{new Date(userInfo.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white">Avatar URL:</span>
                    <span className="text-slate-300 text-xs truncate max-w-32">{userInfo.avatar}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Test Results */}
        <Card className="mt-6 bg-white/10 backdrop-blur-md border border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Authentication Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="text-green-400 font-semibold">✅ Login Working</div>
                <div className="text-sm text-slate-300 mt-1">User successfully authenticated</div>
              </div>

              <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="text-blue-400 font-semibold">✅ Profile Display</div>
                <div className="text-sm text-slate-300 mt-1">
                  {session.user?.image ? "Google photo loaded" : "Placeholder image shown"}
                </div>
              </div>

              <div className="text-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                <div className="text-purple-400 font-semibold">
                  {userInfo ? "✅ Database Connected" : "⏳ Test Database"}
                </div>
                <div className="text-sm text-slate-300 mt-1">
                  {userInfo ? "MongoDB data retrieved" : "Click button to test"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
