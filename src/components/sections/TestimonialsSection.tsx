import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
// ...existing code...
import { Star } from "lucide-react"
import React from "react"

const TestimonialsSection = React.memo(function TestimonialsSection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])

  const testimonials = [
    {
      quote:
        "PactIQ's AI contract review saved us hours of back-and-forth with lawyers. We now close deals faster and with more confidence.",
      author: "Ava Patel",
      role: "COO, GrowthWave",
      rating: 5,
    },
    {
      quote:
        "The AI highlights and plain-English explanations make even complex legal terms easy to understand. It's like having a legal expert on our team.",
      author: "Liam Chen",
      role: "Freelance Designer",
      rating: 5,
    },
    {
      quote:
        "We use PactIQ to manage all our NDAs and service agreements. The reminders and smart search are game-changers for our operations.",
      author: "Sophia Martinez",
      role: "Operations Manager, CloudSync",
      rating: 5,
    },
    {
      quote:
        "As a startup, we can't afford a full-time legal team. PactIQ gives us peace of mind for standard contracts and lets us focus on growth.",
      author: "Noah Kim",
      role: "Founder, Finlytics",
      rating: 5,
    },
    {
      quote:
        "The AI's risk detection flagged a termination clause that could have cost us thousands. PactIQ is now a must-have for every contract.",
      author: "Emily Johnson",
      role: "Head of Partnerships, TalentBridge",
      rating: 5,
    },
    {
      quote:
        "PactIQ's secure platform and GDPR compliance were key for us. We trust it with all our sensitive agreements.",
      author: "Oliver Smith",
      role: "Legal Counsel, MedTech Solutions",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="w-full py-20 md:py-32">
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
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Teams Worldwide</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Don't just take our word for it. See what our customers have to say about their experience.
            </p>
          </Motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Loved by Teams Worldwide</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Don't just take our word for it. See what our customers have to say about their experience.
            </p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => Motion ? (
            <Motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, j) => (
                        <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                      ))}
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Motion.div>
          ) : (
            <div key={i}>
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, j) => (
                        <Star key={j} className="size-4 text-yellow-500 fill-yellow-500" />
                      ))}
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                    <div className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
})

export default TestimonialsSection 