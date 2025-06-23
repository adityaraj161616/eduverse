"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  Search,
  BookOpen,
  Video,
  FileText,
  Bug,
  Lightbulb,
  Send,
  CheckCircle,
} from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface FAQ {
  id: string
  question: string
  answer: string
  category: "general" | "courses" | "payment" | "technical"
}

interface SupportTicket {
  id: string
  subject: string
  status: "open" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  lastUpdate: string
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })
  const [loading, setLoading] = useState(false)

  const faqs: FAQ[] = [
    {
      id: "1",
      question: "How do I enroll in a course?",
      answer:
        "To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. For free courses, you'll be enrolled immediately. For paid courses, you'll be redirected to the payment page.",
      category: "courses",
    },
    {
      id: "2",
      question: "Can I access courses offline?",
      answer:
        "Currently, our courses require an internet connection to access. However, you can download course materials like PDFs and resources for offline reading. We're working on offline video support for the future.",
      category: "technical",
    },
    {
      id: "3",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit/debit cards (Visa, Mastercard, RuPay), UPI payments (PhonePe, Google Pay, Paytm), and net banking from all major Indian banks.",
      category: "payment",
    },
    {
      id: "4",
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password.",
      category: "general",
    },
    {
      id: "5",
      question: "Do I get a certificate after completing a course?",
      answer:
        "Yes! You'll receive a digital certificate upon successfully completing a course with all lessons and assessments. Certificates can be downloaded from your achievements page.",
      category: "courses",
    },
    {
      id: "6",
      question: "Can I get a refund if I'm not satisfied?",
      answer:
        "We offer a 30-day money-back guarantee for all paid courses. If you're not satisfied, contact our support team within 30 days of purchase for a full refund.",
      category: "payment",
    },
    {
      id: "7",
      question: "How do I track my learning progress?",
      answer:
        "Your progress is automatically tracked as you complete lessons. You can view detailed progress statistics on your dashboard, including completion percentages, time spent, and achievements earned.",
      category: "courses",
    },
    {
      id: "8",
      question: "Is there a mobile app available?",
      answer:
        "We're currently working on mobile apps for iOS and Android. In the meantime, our website is fully responsive and works great on mobile browsers.",
      category: "technical",
    },
  ]

  const supportTickets: SupportTicket[] = [
    {
      id: "TICK-001",
      subject: "Video playback issues in Chrome",
      status: "in-progress",
      priority: "medium",
      createdAt: "2024-01-15",
      lastUpdate: "2024-01-16",
    },
    {
      id: "TICK-002",
      subject: "Certificate download not working",
      status: "resolved",
      priority: "high",
      createdAt: "2024-01-10",
      lastUpdate: "2024-01-12",
    },
  ]

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Support ticket created successfully! We'll get back to you soon.")
      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      })
    } catch (error) {
      toast.error("Failed to submit support ticket. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Help background"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 pt-32">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-xl text-gray-300">
                Get the help you need to make the most of your learning experience
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-white">Live Chat</h3>
                  <p className="text-sm text-gray-400">Get instant help</p>
                  <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-white">Email Support</h3>
                  <p className="text-sm text-gray-400">support@eduverse.com</p>
                  <Badge variant="outline" className="mt-2 border-gray-600 text-gray-300">
                    24h response
                  </Badge>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-white">Phone Support</h3>
                  <p className="text-sm text-gray-400">+91 1800-123-4567</p>
                  <Badge variant="outline" className="mt-2 border-gray-600 text-gray-300">
                    Mon-Fri 9-6
                  </Badge>
                </CardContent>
              </Card>
              <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-orange-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold mb-2 text-white">Video Tutorials</h3>
                  <p className="text-sm text-gray-400">Step-by-step guides</p>
                  <Badge variant="outline" className="mt-2 border-gray-600 text-gray-300">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-gray-900/80 backdrop-blur-sm border border-gray-700">
                <TabsTrigger
                  value="faq"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300"
                >
                  FAQ
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300"
                >
                  Contact Us
                </TabsTrigger>
                <TabsTrigger
                  value="tickets"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300"
                >
                  My Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300"
                >
                  Guides
                </TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <HelpCircle className="w-5 h-5 mr-2 text-blue-400" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription className="text-gray-400">Find quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Search */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                      />
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFAQs.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border border-gray-700 rounded-lg px-4 bg-gray-800/30"
                        >
                          <AccordionTrigger className="text-left hover:no-underline text-white">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="capitalize border-gray-600 text-gray-300">
                                {faq.category}
                              </Badge>
                              <span>{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-300 pb-4">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {filteredFAQs.length === 0 && (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No FAQs match your search</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <Mail className="w-5 h-5 mr-2 text-green-400" />
                      Contact Support
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Send us a message and we'll get back to you soon
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-gray-300">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Your full name"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-gray-300">
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="your.email@example.com"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category" className="text-gray-300">
                          Category
                        </Label>
                        <select
                          id="category"
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                          className="w-full p-2 border border-gray-600 rounded-md bg-gray-800/50 text-white focus:border-blue-500 focus:outline-none"
                        >
                          <option value="general">General Question</option>
                          <option value="technical">Technical Issue</option>
                          <option value="billing">Billing & Payment</option>
                          <option value="course">Course Content</option>
                          <option value="bug">Bug Report</option>
                          <option value="feature">Feature Request</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-300">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Brief description of your issue"
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-gray-300">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Please provide as much detail as possible..."
                          rows={6}
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-6">
                <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <FileText className="w-5 h-5 mr-2 text-purple-400" />
                      Support Tickets
                    </CardTitle>
                    <CardDescription className="text-gray-400">Track your support requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {supportTickets.length > 0 ? (
                      <div className="space-y-4">
                        {supportTickets.map((ticket) => (
                          <div key={ticket.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800/30">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <span className="font-mono text-sm text-gray-400">{ticket.id}</span>
                                <h3 className="font-semibold text-white">{ticket.subject}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>Last update: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No support tickets found</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Guides Tab */}
              <TabsContent value="guides" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Getting Started Guide",
                      description: "Learn how to navigate the platform and enroll in your first course",
                      icon: <BookOpen className="w-6 h-6 text-blue-400" />,
                      readTime: "5 min read",
                    },
                    {
                      title: "Payment & Billing",
                      description: "Understanding our payment methods and billing process",
                      icon: <FileText className="w-6 h-6 text-green-400" />,
                      readTime: "3 min read",
                    },
                    {
                      title: "Troubleshooting",
                      description: "Common issues and how to resolve them",
                      icon: <Bug className="w-6 h-6 text-red-400" />,
                      readTime: "7 min read",
                    },
                    {
                      title: "Course Features",
                      description: "Make the most of our learning features and tools",
                      icon: <Video className="w-6 h-6 text-purple-400" />,
                      readTime: "4 min read",
                    },
                    {
                      title: "Certificates & Achievements",
                      description: "How to earn and download your certificates",
                      icon: <CheckCircle className="w-6 h-6 text-yellow-400" />,
                      readTime: "2 min read",
                    },
                    {
                      title: "Tips for Success",
                      description: "Best practices for effective online learning",
                      icon: <Lightbulb className="w-6 h-6 text-orange-400" />,
                      readTime: "6 min read",
                    },
                  ].map((guide, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <Card className="h-full bg-gray-900/80 backdrop-blur-sm border-gray-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            {guide.icon}
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-300">
                              {guide.readTime}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-400 transition-colors text-white">
                            {guide.title}
                          </h3>
                          <p className="text-sm text-gray-400">{guide.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
