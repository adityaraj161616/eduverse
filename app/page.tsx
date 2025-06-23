"use client"

import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { FeaturedCourses } from "@/components/featured-courses"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Stats />
      <FeaturedCourses />
      <Testimonials />
      <Newsletter />
    </div>
  )
}
