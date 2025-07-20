import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
// ...existing code...
import { MessageSquare, Search, Bell } from "lucide-react"
import React from "react"


const features = [
  {
    title: "Describe What You Need",
    description: "Tell our AI what kind of contract you need in plain English",
    icon: <MessageSquare className="size-5" />, cardContext: "I need a freelance contract for a US client with $5,000 project and 30-day payment terms"
  },
  {
    title: "Review & Understand",
    description: "AI highlights and explains every important clause, risks and possibilities",
    icon: <Search className="size-5" />, cardContext: "Payment terms & penalties, Confidentiality clauses, Termination rights, etc."
  },
  {
    title: "Organize & Manage",
    description: "Store, search, and track all contracts securely and fast",
    icon: <Bell className="size-5" />, cardContext: "Automated renewal reminders, Smart search by terms, Secure client sharing"
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const WorkingSection = React.memo(function WorkingSection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])
  return (
    <section id="working" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        {Motion ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Succeed</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our AI-powered platform helps you create, review, and manage contracts with ease.
            </p>
          </Motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need to Succeed</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Our AI-powered platform helps you create, review, and manage contracts with ease.
            </p>
          </div>
        )}
        {Motion ? (
          <Motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, i) => (
              <Motion.div key={i} variants={item}>
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                  <CardContent className="p-6 flex flex-col h-full gap-4">
                    <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <Badge className="rounded-full px-4 py-1.5 text-sm w-fit font-medium" variant="secondary">
                      Step {i + 1}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="mt-2 px-3 py-2 rounded-md bg-muted/50 text-sm text-foreground/80 border border-border/30 italic">
                      {feature.cardContext}
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            ))}
          </Motion.div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i}>
                <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                  <CardContent className="p-6 flex flex-col h-full gap-4">
                    <div className="size-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <Badge className="rounded-full px-4 py-1.5 text-sm w-fit font-medium" variant="secondary">
                      Step {i + 1}
                    </Badge>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                    <div className="mt-2 px-3 py-2 rounded-md bg-muted/50 text-sm text-foreground/80 border border-border/30 italic">
                      {feature.cardContext}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
})

export default WorkingSection 