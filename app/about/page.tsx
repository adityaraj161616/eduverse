"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Heart, Globe, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { VideoBackground } from "@/components/video-background"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Passion for Learning",
      description:
        "We're passionate about learning and believe that curiosity and continuous growth are fundamental to human nature.",
      color: "text-red-400",
      bgColor: "bg-red-500/20",
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description:
        "Education should be accessible to everyone, regardless of location, background, or economic status.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/20",
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We maintain the highest standards in course content, instructor expertise, and learning outcomes.",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20",
    },
    {
      icon: Zap,
      title: "Innovation First",
      description: "We leverage cutting-edge technology to create immersive and engaging learning experiences.",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
  ]

  const team = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Former educator with 15+ years of experience in online learning and educational technology.",
    },
    {
      name: "Jane Smith",
      role: "Head of Content",
      image: "https://images.unsplash.com/photo-1626639900752-3ea9001925ae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfHRvd0paRnNrcEdnfHxlbnwwfHx8fHw%3D",
      description: "Curriculum designer and instructional expert focused on creating engaging learning experiences.",
    },
    {
      name: "Mike Johnson",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Technology leader with expertise in scalable platforms and innovative learning solutions.",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <VideoBackground
        videoSrc={[
          "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
          "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
        ]}
        fallbackImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop"
        className="min-h-screen flex items-center justify-center"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Heart className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm font-semibold text-white">about eduverse</span>
            </div>

            <h1 className="font-display text-large text-white mb-6">
              empowering minds,
              <br />
              <span className="gradient-text">transforming lives</span>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              we're on a mission to democratize education and make quality learning accessible to everyone, everywhere.
            </p>
          </motion.div>
        </div>
      </VideoBackground>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-large text-gray-900 mb-6">our mission</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  at eduverse, we believe that education is the key to unlocking human potential. our platform connects
                  learners with world-class instructors, providing an immersive and interactive learning experience.
                </p>
                <p>
                  we're committed to breaking down barriers to education, making it affordable, accessible, and engaging
                  for learners from all walks of life.
                </p>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
                <Button size="lg" asChild className="btn-primary">
                  <Link href="/courses">start learning today</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Students learning online"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <VideoBackground
        videoSrc={[
          "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139",
        ]}
        fallbackImage="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop"
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-large text-white mb-6">our values</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              these core principles guide everything we do and shape the learning experience we create.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 ${value.bgColor} rounded-lg flex items-center justify-center mb-4`}
                    >
                      <value.icon className={`h-6 w-6 ${value.color}`} />
                    </motion.div>
                    <CardTitle className="group-hover:text-green-400 transition-colors duration-300 text-white">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </VideoBackground>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-large text-gray-900 mb-6">meet our team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              passionate educators and technologists working together to revolutionize online learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden card-hover">
                  <div className="relative">
                    <motion.div whileHover={{ scale: 1.05 }} className="overflow-hidden">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        width={300}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl group-hover:text-green-600 transition-colors duration-300">
                      {member.name}
                    </CardTitle>
                    <p className="text-green-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
