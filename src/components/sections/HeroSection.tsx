import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Link } from "react-router-dom"

export default function HeroSection() {
  const [open, setOpen] = useState(false)
  return (
    <section className="w-full py-20 md:py-32 lg:py-20 overflow-hidden">
      <div className="container px-4 md:px-6 relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge className="mt-8 mb-4 rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            ✨ AI-Powered Contract Intelligence
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Your AI Legal Co-Pilot for Smarter Contracts
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The all-in-one platform that helps teams collaborate, automate, and deliver exceptional results.
            Streamline your processes and focus on what matters most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button asChild size="lg" className="rounded-full h-12 px-8 text-base">
                <span>
                  Get Started
                  <ArrowRight className="ml-2 size-4" />
                </span>
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base" onClick={() => setOpen(true)}>
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
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>Bank-level security</span>
            </div>
            <div className="flex items-center gap-1">
              <Check className="size-4 text-primary" />
              <span>Setup in minutes</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-gradient-to-b from-background to-muted/20">
            <img
              src="https://cdn.dribbble.com/userupload/12302729/file/original-fa372845e394ee85bebe0389b9d86871.png?resize=1504x1128&vertical=center"
              width={1280}
              height={720}
              alt="SaaSify dashboard"
              className="w-full h-auto"
              loading="eager"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-border/20"></div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-3xl opacity-70"></div>
          <div className="absolute -top-6 -left-6 -z-10 h-[300px] w-[300px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-3xl opacity-70"></div>
        </motion.div>
      </div>
    </section>
  )
} 