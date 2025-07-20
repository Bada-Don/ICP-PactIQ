// ...existing code...
import React from "react"

const FooterSection = React.memo(function FooterSection() {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
      <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <a href="/" className="flex items-center gap-2 font-bold focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group transition">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground group-hover:brightness-110 transition">
                P
              </div>
              <span className="group-hover:underline">PactIQ</span>
            </a>
            <p className="text-sm text-muted-foreground">
              AI-powered contract analysis, smart templates, and secure management for modern businesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Facebook</span>
                {/* Social icons can be added here */}
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">aedIn</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Templates
                </a>
              </li>
              <li>
                <a href="#security" className="text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#support" className="text-muted-foreground hover:text-foreground transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} PactIQ. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
})

export default FooterSection 