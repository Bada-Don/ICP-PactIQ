import { Badge } from "../ui/badge"
import { Shield, Search, Bell, Users, FileText, Lock, Briefcase, Home } from "lucide-react"
import React from "react"

const FeaturesSection = React.memo(function FeaturesSection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary-foreground" />,
      iconBg: "bg-gradient-to-br from-primary to-primary/80",
      title: "Secure Storage",
      description: "Bank-level encryption for all your contracts",
    },
    {
      icon: <Search className="w-8 h-8 text-primary-foreground" />,
      iconBg: "bg-gradient-to-br from-primary to-primary/80",
      title: "Smart Search",
      description: "Find contracts by party, date, or clause type",
    },
    {
      icon: <Bell className="w-8 h-8 text-primary-foreground" />,
      iconBg: "bg-gradient-to-br from-primary to-primary/80",
      title: "Auto Reminders",
      description: "Never miss renewals or payment deadlines",
    },
    {
      icon: <Users className="w-8 h-8 text-primary-foreground" />,
      iconBg: "bg-gradient-to-br from-primary to-primary/80",
      title: "Secure Sharing",
      description: "Share with clients and collaborators safely",
    },
  ]

  const templateIcons = [
    <FileText className="w-7 h-7 text-primary-foreground" />,
    <Lock className="w-7 h-7 text-primary-foreground" />,
    <Briefcase className="w-7 h-7 text-primary-foreground" />,
    <Home className="w-7 h-7 text-primary-foreground" />,
  ]
  const templateIconBg = "bg-gradient-to-br from-primary to-primary/80"

  return (
    <section id="features" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
      <div className="container px-4 md:px-6 relative">
        {Motion ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Powerful Features for Modern Contracts</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Everything you need to manage, search, and share contracts securely and efficiently.
            </p>
          </Motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Powerful Features for Modern Contracts</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Everything you need to manage, search, and share contracts securely and efficiently.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 relative">
          {features.map((feature, i) => Motion ? (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center bg-card rounded-2xl shadow-lg border border-border p-8 group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`flex items-center justify-center mb-4 rounded-full ${feature.iconBg} w-14 h-14 shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
            </Motion.div>
          ) : (
            <div key={i} className="relative z-10 flex flex-col items-center text-center bg-card rounded-2xl shadow-lg border border-border p-8 group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl">
              <div className={`flex items-center justify-center mb-4 rounded-full ${feature.iconBg} w-14 h-14 shadow-md`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        {/* Pre-Vetted Template Library Section */}
        <div className="mt-20">
          <div className="flex flex-col items-center text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Pre-Vetted Template Library</h3>
            <p className="text-muted-foreground max-w-xl">
              Professional templates customized with plain-English instructions
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Freelance Agreement",
                desc: "For independent contractors",
                recommended: true,
              },
              {
                title: "NDA Template",
                desc: "Protect confidential information",
              },
              {
                title: "Consulting Contract",
                desc: "Professional services agreements",
              },
              {
                title: "Rental Agreement",
                desc: "Residential and commercial leases",
              },
            ].map((template, i) => Motion ? (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center justify-center bg-card rounded-2xl shadow-lg border border-border p-8 group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl text-center"
              >
                <div className={`flex items-center justify-center mb-4 rounded-full ${templateIconBg} w-12 h-12 shadow-md`}>
                  {templateIcons[i]}
                </div>
                <h4 className="text-lg font-semibold mb-1">{template.title}</h4>
                <p className="text-muted-foreground mb-4 text-base leading-relaxed">{template.desc}</p>
                {template.recommended && (
                  <span className="mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Recommended</span>
                )}
                <button className="w-full mt-auto px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow hover:bg-primary/90 transition-colors cursor-pointer">Use Template</button>
              </Motion.div>
            ) : (
              <div key={i} className="flex flex-col items-center justify-center bg-card rounded-2xl shadow-lg border border-border p-8 group transition-all duration-200 hover:-translate-y-2 hover:shadow-2xl text-center">
                <div className={`flex items-center justify-center mb-4 rounded-full ${templateIconBg} w-12 h-12 shadow-md`}>
                  {templateIcons[i]}
                </div>
                <h4 className="text-lg font-semibold mb-1">{template.title}</h4>
                <p className="text-muted-foreground mb-4 text-base leading-relaxed">{template.desc}</p>
                {template.recommended && (
                  <span className="mb-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">Recommended</span>
                )}
                <button className="w-full mt-auto px-4 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base shadow hover:bg-primary/90 transition-colors cursor-pointer">Use Template</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

export default FeaturesSection 