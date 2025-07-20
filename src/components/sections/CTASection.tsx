import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
// Removed dynamic and a imports
import React from "react"

const CTASection = React.memo(function CTASection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])
  const [open, setOpen] = useState(false)
  return (
    <section id="cta" className="w-full py-20 md:py-32 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="px-4 md:px-6 relative max-w-7xl mx-auto">
        {Motion ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Experience Effortless Contract Management?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Join businesses and professionals using PactIQ to review, organize, and secure their contracts with AI-powered analysis and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              {/* Removed a component */}
                <Button asChild size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                  <span>
                    Start Free Trial
                    <ArrowRight className="ml-2 size-4" />
                  </span>
                </Button>
              {/* Removed a component */}
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => setOpen(true)}
              >
                Watch Demo
              </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-2xl w-full p-0 bg-background overflow-hidden flex flex-col items-center">
                <div className="w-full aspect-video bg-black flex items-center justify-center">
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    controls
                    className="w-full h-full object-contain rounded-t-lg"
                    style={{ background: "#000" }}
                    tabIndex={0}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm text-primary-foreground/80 mt-4">
              No credit card required. 14-day free trial. Cancel anytime.
            </p>
          </Motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Ready to Experience Effortless Contract Management?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              Join businesses and professionals using PactIQ to review, organize, and secure their contracts with AI-powered analysis and peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a href="/signup">
                <Button asChild size="lg" variant="secondary" className="rounded-full h-12 px-8 text-base">
                  <span>
                    Start Free Trial
                    <ArrowRight className="ml-2 size-4" />
                  </span>
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-8 text-base bg-transparent border-white text-white hover:bg-white/10"
                onClick={() => setOpen(true)}
              >
                Watch Demo
              </Button>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-2xl w-full p-0 bg-background overflow-hidden flex flex-col items-center">
                <div className="w-full aspect-video bg-black flex items-center justify-center">
                  <video
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    controls
                    className="w-full h-full object-contain rounded-t-lg"
                    style={{ background: "#000" }}
                    tabIndex={0}
                  />
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm text-primary-foreground/80 mt-4">
              No credit card required. 14-day free trial. Cancel anytime.
            </p>
          </div>
        )}
      </div>
    </section>
  )
})

export default CTASection 