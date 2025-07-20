import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Menu,
  X,
  MessageSquare,
  Search,
  Bell,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { ThemeToggle } from "../components/theme-toggle"
import type { PropsWithChildren } from "react"
import type { MouseEvent } from "react"
import HeroSection from "../components/sections/HeroSection"
import React, { Suspense } from "react"
const LogosSection = React.lazy(() => import("../components/sections/LogosSection"))
const WorkingSection = React.lazy(() => import("../components/sections/WorkingSection"))
const AIAnalysisSection = React.lazy(() => import("../components/sections/AIAnalysisSection"))
const FeaturesSection = React.lazy(() => import("../components/sections/FeaturesSection"))
const TestimonialsSection = React.lazy(() => import("../components/sections/TestimonialsSection"))
const PricingSection = React.lazy(() => import("../components/sections/PricingSection"))
const FAQSection = React.lazy(() => import("../components/sections/FAQSection"))
const CTASection = React.lazy(() => import("../components/sections/CTASection"))
const FooterSection = React.lazy(() => import("../components/sections/FooterSection"))

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col scroll-smooth">
      <header
        className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group transition">
            <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground group-hover:brightness-110 transition">
              P
            </div>
            <span className="group-hover:underline">PactIQ</span>
          </a>
          <nav className="hidden text-start md:flex gap-8">
            <a
              href="#working"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={e => handleNavClick(e, 'working')}
            >
              Working
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={e => handleNavClick(e, 'features')}
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={e => handleNavClick(e, 'pricing')}
            >
              Pricing
            </a>
            <a
              href="#faqs"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={e => handleNavClick(e, 'faqs')}
            >
              FAQs
            </a>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <ThemeToggle />
            <a
              href="/auth"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="rounded-full inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ChevronRight className="ml-1 size-4" />
            </a>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden text-start absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
          >
            <div className="container py-4 flex flex-col gap-4">
              <a href="#working" className="py-2 text-sm font-medium" onClick={e => handleNavClick(e, 'working')}>
                Working
              </a>
              <a href="#features" className="py-2 text-sm font-medium" onClick={e => handleNavClick(e, 'features')}>
                Features
              </a>
              <a href="#pricing" className="py-2 text-sm font-medium" onClick={e => handleNavClick(e, 'pricing')}>
                Pricing
              </a>
              <a href="#faqs" className="py-2 text-sm font-medium" onClick={e => handleNavClick(e, 'faqs')}>
                FAQs
              </a>
              <div className="flex flex-col gap-2 pt-2 border-t">
                <div className="flex items-center justify-between py-2">
                  <ThemeToggle />
                </div>
                <a href="/auth" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Log in
                </a>
                <a
                  href="/signup"
                  className="rounded-full inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Get Started
                  <ChevronRight className="ml-1 size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </header>
      <main className="flex-1">
        <HeroSection />
        <Suspense fallback={<div>Loading...</div>}><LogosSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><WorkingSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><AIAnalysisSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><FeaturesSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><TestimonialsSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><PricingSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><FAQSection /></Suspense>
        <Suspense fallback={<div>Loading...</div>}><CTASection /></Suspense>
      </main>
      <Suspense fallback={<div>Loading...</div>}><FooterSection /></Suspense>
    </div>
  )
}
