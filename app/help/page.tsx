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
        return "text-blue-600 bg-blue-100"
      case "in-progress":
        return "text-yellow-600 bg-yellow-100"
      case "resolved":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-gray-600 bg-gray-100"
      case "medium":
        return "text-yellow-600 bg-yellow-100"
      case "high":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800/50 dark:to-purple-900/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
          alt="Help background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/98 via-background/95 to-background/98" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-12 pt-32">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Help & Support
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300">
                Get the help you need to make the most of your learning experience
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Get instant help</p>
                  <Badge className="mt-2 bg-green-500 text-white">Online</Badge>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">support@eduverse.com</p>
                  <Badge variant="outline" className="mt-2">
                    24h response
                  </Badge>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">+91 1800-123-4567</p>
                  <Badge variant="outline" className="mt-2">
                    Mon-Fri 9-6
                  </Badge>
                </CardContent>
              </Card>
              <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Step-by-step guides</p>
                  <Badge variant="outline" className="mt-2">
                    Coming Soon
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                <TabsTrigger
                  value="faq"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  FAQ
                </TabsTrigger>
                <TabsTrigger
                  value="contact"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Contact Us
                </TabsTrigger>
                <TabsTrigger
                  value="tickets"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  My Tickets
                </TabsTrigger>
                <TabsTrigger
                  value="guides"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  Guides
                </TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="w-5 h-5 mr-2 text-blue-500" />
                      Frequently Asked Questions
                    </CardTitle>
                    <CardDescription>Find quick answers to common questions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Search */}
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    {/* FAQ Accordion */}
                    <Accordion type="single" collapsible className="space-y-2">
                      {filteredFAQs.map((faq) => (
                        <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                          <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="capitalize">
                                {faq.category}
                              </Badge>
                              <span>{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-600 dark:text-slate-300 pb-4">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    {filteredFAQs.length === 0 && (
                      <div className="text-center py-8">
                        <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No FAQs match your search</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="w-5 h-5 mr-2 text-green-500" />
                      Contact Support
                    </CardTitle>
                    <CardDescription>Send us a message and we'll get back to you soon</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <select
                          id="category"
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                          className="w-full p-2 border border-slate-300 rounded-md bg-white/95 dark:bg-slate-800/95 dark:border-slate-600"
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
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Brief description of your issue"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Please provide as much detail as possible..."
                          rows={6}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full md:w-auto">
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-6">
                <Card className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-purple-500" />
                      Support Tickets
                    </CardTitle>
                    <CardDescription>Track your support requests</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {supportTickets.length > 0 ? (
                      <div className="space-y-4">
                        {supportTickets.map((ticket) => (
                          <div key={ticket.id} className="p-4 border rounded-lg bg-slate-50 dark:bg-slate-800/50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <span className="font-mono text-sm text-slate-500">{ticket.id}</span>
                                <h3 className="font-semibold">{ticket.subject}</h3>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                              <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                              <span>Last update: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No support tickets found</p>
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
                      icon: <BookOpen className="w-6 h-6 text-blue-500" />,
                      readTime: "5 min read",
                    },
                    {
                      title: "Payment & Billing",
                      description: "Understanding our payment methods and billing process",
                      icon: <FileText className="w-6 h-6 text-green-500" />,
                      readTime: "3 min read",
                    },
                    {
                      title: "Troubleshooting",
                      description: "Common issues and how to resolve them",
                      icon: <Bug className="w-6 h-6 text-red-500" />,
                      readTime: "7 min read",
                    },
                    {
                      title: "Course Features",
                      description: "Make the most of our learning features and tools",
                      icon: <Video className="w-6 h-6 text-purple-500" />,
                      readTime: "4 min read",
                    },
                    {
                      title: "Certificates & Achievements",
                      description: "How to earn and download your certificates",
                      icon: <CheckCircle className="w-6 h-6 text-yellow-500" />,
                      readTime: "2 min read",
                    },
                    {
                      title: "Tips for Success",
                      description: "Best practices for effective online learning",
                      icon: <Lightbulb className="w-6 h-6 text-orange-500" />,
                      readTime: "6 min read",
                    },
                  ].map((guide, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group cursor-pointer"
                    >
                      <Card className="h-full bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-3 mb-4">
                            {guide.icon}
                            <Badge variant="outline" className="text-xs">
                              {guide.readTime}
                            </Badge>
                          </div>
                          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                            {guide.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{guide.description}</p>
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
