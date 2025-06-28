"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  ChevronDown,
  Star,
  Shield,
  Zap,
  Users,
  Check,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Play,
  Award,
  Target,
  Heart,
} from "lucide-react"

// Main App Component - orchestrates the entire landing page experience
export default function App() {
  // State management for mobile menu visibility and active navigation section
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  // Refs for each section to enable smooth scrolling functionality
  const heroRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLElement>(null)
  const testimonialsRef = useRef<HTMLElement>(null)
  const pricingRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Navigation configuration - defines all sections and their properties
  const navigationItems = [
    { id: "hero", label: "Page 1: Hero", ref: heroRef },
    { id: "features", label: "Page 2: Features", ref: featuresRef },
    { id: "testimonials", label: "Page 3: Testimonials", ref: testimonialsRef },
    { id: "pricing", label: "Page 4: Pricing", ref: pricingRef },
    { id: "about", label: "Page 5: About", ref: aboutRef },
    { id: "contact", label: "Page 6: Contact", ref: contactRef },
  ]

  // Smooth scroll function - handles navigation between sections
  const scrollToSection = (elementRef: React.RefObject<HTMLElement>) => {
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    setIsMobileMenuOpen(false) // Close mobile menu after navigation
  }

  // Intersection Observer effect - tracks which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in center of viewport
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all section elements
    navigationItems.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-['Inter']">
      {/* Fixed Navigation Bar - remains visible during scroll */}
      <Navbar
        navigationItems={navigationItems}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Main Content Container */}
      <main className="relative">
        {/* Hero Section - Full-height landing area with compelling CTA */}
        <HeroSection ref={heroRef} scrollToSection={() => scrollToSection(featuresRef)} />

        {/* Features Section - Showcase key product capabilities */}
        <FeaturesSection ref={featuresRef} />

        {/* Testimonials Section - Social proof and customer validation */}
        <TestimonialsSection ref={testimonialsRef} />

        {/* Pricing Section - Clear pricing tiers and value proposition */}
        <PricingSection ref={pricingRef} />

        {/* About Section - Company story and mission */}
        <AboutSection ref={aboutRef} />

        {/* Contact Section - Lead generation and communication */}
        <ContactSection ref={contactRef} />
      </main>

      {/* Footer - Copyright and additional links */}
      <Footer />
    </div>
  )
}

// Navigation Bar Component - Fixed header with responsive design
const Navbar = ({
  navigationItems,
  activeSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  scrollToSection,
}: {
  navigationItems: any[]
  activeSection: string
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (open: boolean) => void
  scrollToSection: (ref: React.RefObject<HTMLElement>) => void
}) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DemoByKishan
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigationItems.map(({ id, label, ref }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(ref)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeSection === id
                      ? "bg-blue-100 text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map(({ id, label, ref }) => (
              <button
                key={id}
                onClick={() => scrollToSection(ref)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                  activeSection === id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section Component - Main landing area with compelling headline and CTA
const HeroSection = React.forwardRef<HTMLElement, { scrollToSection: () => void }>(({ scrollToSection }, ref) => {
  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in-up">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Build the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Future
            </span>
            <br />
            of Digital Excellence
          </h1>

          {/* Sub-headline */}
          <p className="max-w-3xl mx-auto text-xl sm:text-2xl text-gray-600 leading-relaxed">
            Transform your ideas into stunning digital experiences with our cutting-edge platform. Join thousands of
            creators who trust us to bring their visions to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={scrollToSection}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <button className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-500 hover:text-blue-600 transition-all duration-300 flex items-center gap-2">
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12">
            <p className="text-sm text-gray-500 mb-6">Trusted by industry leaders</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-24 h-12 bg-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500 font-semibold">LOGO</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  )
})

// Features Section Component - Showcase key product capabilities
const FeaturesSection = React.forwardRef<HTMLElement>((props, ref) => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast Performance",
      description:
        "Experience blazing-fast load times and seamless interactions with our optimized infrastructure built for speed and reliability.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description:
        "Your data is protected with bank-level encryption, advanced threat detection, and compliance with industry standards.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Workspace",
      description:
        "Work together seamlessly with real-time collaboration tools, shared workspaces, and integrated communication features.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Precision Analytics",
      description:
        "Make data-driven decisions with comprehensive analytics, detailed reporting, and actionable insights at your fingertips.",
    },
  ]

  return (
    <section id="features" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Teams
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Everything you need to build, deploy, and scale your projects with confidence. Our comprehensive suite of
            tools empowers teams to achieve more.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Feature Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore All Features
          </button>
        </div>
      </div>
    </section>
  )
})

// Testimonials Section Component - Social proof and customer validation
const TestimonialsSection = React.forwardRef<HTMLElement>((props, ref) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart Inc.",
      content:
        "This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have increased our productivity by 300%. It's simply game-changing.",
      avatar: "SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Lead Developer, Innovation Labs",
      content:
        "As a developer, I appreciate the attention to detail and the robust API. The platform scales beautifully and the support team is incredibly responsive. Highly recommended!",
      avatar: "MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, Growth Co.",
      content:
        "The analytics and insights provided have been invaluable for our product decisions. The user experience is exceptional, and our customers love the new features we've built.",
      avatar: "ER",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Customers
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Don't just take our word for it. Here's what industry leaders and innovators have to say about their
            experience with our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Rating Stars */}
              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.content}"</blockquote>

              {/* Customer Info */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md">
            <Award className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-gray-700 font-semibold">Rated 4.9/5 by 10,000+ customers</span>
          </div>
        </div>
      </div>
    </section>
  )
})

// Pricing Section Component - Clear pricing tiers and value proposition
const PricingSection = React.forwardRef<HTMLElement>((props, ref) => {
  const pricingTiers = [
    {
      name: "Basic",
      price: "$29",
      period: "per month",
      description: "Perfect for individuals and small teams getting started",
      features: ["Up to 5 team members", "10GB storage", "Basic analytics", "Email support", "Standard templates"],
      popular: false,
      buttonText: "Get Started",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600",
    },
    {
      name: "Pro",
      price: "$79",
      period: "per month",
      description: "Ideal for growing teams and businesses",
      features: [
        "Up to 25 team members",
        "100GB storage",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "API access",
        "Advanced integrations",
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonStyle: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl",
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "per month",
      description: "For large organizations with advanced needs",
      features: [
        "Unlimited team members",
        "Unlimited storage",
        "Custom analytics",
        "24/7 dedicated support",
        "White-label solution",
        "Advanced security",
        "Custom integrations",
        "SLA guarantee",
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonStyle: "border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600",
    },
  ]

  return (
    <section id="pricing" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Choose the perfect plan for your needs. All plans include our core features with no hidden fees or surprise
            charges.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all duration-300 transform hover:-translate-y-2 ${
                tier.popular
                  ? "border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50"
                  : "border-gray-200 shadow-lg hover:shadow-xl bg-white"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{tier.price}</span>
                  <span className="text-gray-600 ml-2">{tier.period}</span>
                </div>
                <p className="text-gray-600">{tier.description}</p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${tier.buttonStyle}`}
              >
                {tier.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <button className="text-blue-600 hover:text-blue-700 font-semibold underline">Compare all features →</button>
        </div>
      </div>
    </section>
  )
})

// About Section Component - Company story and mission
const AboutSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="about" ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Story &
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                Founded in 2020 by a team of passionate developers and designers, we set out to solve the complex
                challenges facing modern digital teams. Our mission is simple: empower creators and innovators with the
                tools they need to build extraordinary experiences.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to serve over 50,000 teams worldwide, from startups to Fortune 500 companies. Our
                platform has powered the creation of millions of digital experiences, and we're just getting started.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Active Teams</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-md">
                <div className="text-3xl font-bold text-purple-600 mb-2">1M+</div>
                <div className="text-gray-600">Projects Created</div>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Our Values</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <span className="font-semibold text-gray-700">User-Centric</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span className="font-semibold text-gray-700">Innovation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <span className="font-semibold text-gray-700">Reliability</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Built by Creators</h3>
                  <p className="text-lg opacity-90">For Creators</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-pink-400 rounded-full opacity-60 animate-pulse animation-delay-2000"></div>
          </div>
        </div>
      </div>
    </section>
  )
})

// Contact Section Component - Lead generation and communication
const ContactSection = React.forwardRef<HTMLElement>((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get In
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ml-3">
              Touch
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Ready to transform your digital experience? We'd love to hear from you. Send us a message and we'll respond
            within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  placeholder="What's this about?"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                  placeholder="Tell us more about your project or question..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <div className="p-4 bg-green-100 border border-green-300 rounded-xl text-green-700">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Start a Conversation</h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Whether you're looking to transform your business, need technical support, or just want to say hello,
                we're here to help. Our team of experts is ready to discuss your unique needs and challenges.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email Us</div>
                  <div className="text-gray-600">hello@demoland.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Call Us</div>
                  <div className="text-gray-600">+1 (555) 123-4567</div>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Visit Us</div>
                  <div className="text-gray-600">
                    123 Innovation Drive
                    <br />
                    San Francisco, CA 94105
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-2">Quick Response Guarantee</h4>
              <p className="text-gray-600">
                We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, please
                call us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

// Footer Component - Copyright and additional information
const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              DemoByKishan
            </h3>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Empowering creators and innovators with cutting-edge tools to build extraordinary digital experiences.
              Join thousands who trust us to bring their visions to life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-200">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-center md:text-left">
            © {currentYear} Copyright by Kishan. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
