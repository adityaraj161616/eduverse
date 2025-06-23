"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  Clock,
  Users,
  Video,
  Play,
  Settings,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Monitor,
  MessageCircle,
  PhoneOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface VirtualClass {
  id: string
  title: string
  instructor: string
  instructorAvatar: string
  date: string
  time: string
  duration: number
  participants: number
  maxParticipants: number
  status: "upcoming" | "live" | "ended"
  description: string
  subject: string
}

interface ChatMessage {
  id: string
  user: string
  message: string
  timestamp: string
}

export default function VirtualClassesPage() {
  const [classes, setClasses] = useState<VirtualClass[]>([])
  const [activeClass, setActiveClass] = useState<VirtualClass | null>(null)
  const [isInClass, setIsInClass] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isCameraOff, setIsCameraOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVirtualClasses()
  }, [])

  const fetchVirtualClasses = async () => {
    try {
      const response = await fetch("/api/virtual-classes")
      const data = await response.json()
      setClasses(data.classes || [])
    } catch (error) {
      console.error("Error fetching virtual classes:", error)
      // Mock data for demo
      setClasses([
        {
          id: "1",
          title: "Advanced React Patterns",
          instructor: "Sarah Johnson",
          instructorAvatar: "/placeholder-avatar.png",
          date: "2024-01-15",
          time: "10:00 AM",
          duration: 90,
          participants: 24,
          maxParticipants: 50,
          status: "live",
          description: "Deep dive into advanced React patterns and best practices",
          subject: "Web Development",
        },
        {
          id: "2",
          title: "Machine Learning Fundamentals",
          instructor: "Dr. Michael Chen",
          instructorAvatar: "/placeholder-avatar.png",
          date: "2024-01-16",
          time: "2:00 PM",
          duration: 120,
          participants: 0,
          maxParticipants: 30,
          status: "upcoming",
          description: "Introduction to machine learning concepts and algorithms",
          subject: "Data Science",
        },
        {
          id: "3",
          title: "UI/UX Design Principles",
          instructor: "Emma Rodriguez",
          instructorAvatar: "/placeholder-avatar.png",
          date: "2024-01-14",
          time: "11:00 AM",
          duration: 60,
          participants: 18,
          maxParticipants: 25,
          status: "ended",
          description: "Essential principles for creating beautiful user interfaces",
          subject: "Design",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const joinClass = (classItem: VirtualClass) => {
    setActiveClass(classItem)
    setIsInClass(true)
    // Initialize chat with some demo messages
    setChatMessages([
      {
        id: "1",
        user: "Instructor",
        message: "Welcome everyone! Let's get started.",
        timestamp: "10:00 AM",
      },
      {
        id: "2",
        user: "John Doe",
        message: "Excited to learn!",
        timestamp: "10:01 AM",
      },
    ])
  }

  const leaveClass = () => {
    setIsInClass(false)
    setActiveClass(null)
    setChatMessages([])
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        user: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setChatMessages([...chatMessages, message])
      setNewMessage("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500"
      case "upcoming":
        return "bg-blue-500"
      case "ended":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (isInClass && activeClass) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Virtual Classroom Interface */}
        <div className="flex h-screen">
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="bg-gray-800 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">{activeClass.title}</h1>
                <Badge className="bg-red-500">LIVE</Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Users className="h-4 w-4" />
                  <span>{activeClass.participants} participants</span>
                </div>
              </div>
              <Button onClick={leaveClass} variant="destructive" size="sm">
                <PhoneOff className="h-4 w-4 mr-2" />
                Leave Class
              </Button>
            </div>

            {/* Video Grid */}
            <div className="flex-1 bg-black p-4">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 h-full">
                {/* Instructor Video */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={activeClass.instructorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{activeClass.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                    {activeClass.instructor} (Instructor)
                  </div>
                </div>

                {/* Student Videos */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="relative bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback>S{index + 1}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded text-sm">
                      Student {index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-gray-800 p-4 flex items-center justify-center space-x-4">
              <Button onClick={() => setIsMuted(!isMuted)} variant={isMuted ? "destructive" : "secondary"} size="sm">
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => setIsCameraOff(!isCameraOff)}
                variant={isCameraOff ? "destructive" : "secondary"}
                size="sm"
              >
                {isCameraOff ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              </Button>
              <Button
                onClick={() => setIsScreenSharing(!isScreenSharing)}
                variant={isScreenSharing ? "default" : "secondary"}
                size="sm"
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="w-80 bg-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold flex items-center">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat
              </h3>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className="text-sm">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-blue-400">{message.user}</span>
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-200">{message.message}</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  className="bg-gray-700 border-gray-600"
                />
                <Button onClick={sendMessage} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Virtual{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Classes</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join live interactive sessions with expert instructors and fellow learners
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={`${getStatusColor(classItem.status)} text-white`}>
                      {classItem.status.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-white border-white/30">
                      {classItem.subject}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{classItem.title}</CardTitle>
                  <CardDescription className="text-gray-300">{classItem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={classItem.instructorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{classItem.instructor.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{classItem.instructor}</p>
                        <p className="text-gray-400 text-sm">Instructor</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{classItem.date}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Users className="h-4 w-4" />
                        <span>
                          {classItem.participants}/{classItem.maxParticipants}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Video className="h-4 w-4" />
                        <span>{classItem.duration} min</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      {classItem.status === "live" && (
                        <Button
                          onClick={() => joinClass(classItem)}
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Join Live
                        </Button>
                      )}
                      {classItem.status === "upcoming" && (
                        <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule
                        </Button>
                      )}
                      {classItem.status === "ended" && (
                        <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                          <Play className="h-4 w-4 mr-2" />
                          Watch Recording
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
