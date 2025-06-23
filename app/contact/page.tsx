"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { VideoBackground } from "@/components/video-background"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    })

    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us an email anytime",
      value: "support@eduverse.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 8am to 5pm",
      value: "+1 (555) 123-4567",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      value: "123 Learning St, San Francisco, CA 94105",
    },
    {
      icon: Clock,
      title: "Support Hours",
      description: "We're here to help",
      value: "24/7 Online Support",
    },
  ]

  return (
    <VideoBackground
      videoSrc={[
        "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
        "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
      ]}
      fallbackImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-24"
        >
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
            <MessageCircle className="w-5 h-5 mr-2 text-green-400" />
            <span className="text-sm font-semibold text-white">get in touch</span>
          </div>

          <h1 className="font-display text-large text-white mb-6">
            we'd love to
            <br />
            <span className="gradient-text">hear from you</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            have questions about our courses? need help with your learning journey? our friendly support team is here to
            assist you every step of the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">send us a message</CardTitle>
                <p className="text-white/70">fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                        full name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="your full name"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                        email address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-2">
                      subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="what's this about?"
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                      message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="tell us more about your inquiry..."
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-green-400"
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full btn-primary">
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        send message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                        <info.icon className="w-6 h-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                        <p className="text-sm text-white/60 mb-2">{info.description}</p>
                        <p className="font-medium text-green-400">{info.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </VideoBackground>
  )
}
