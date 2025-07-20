import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Check } from "lucide-react"
import React from "react"

const monthlyPlans = [
  {
    name: "Starter",
    price: "$19",
    description: "For freelancers and small teams who want fast, AI-powered contract review.",
    features: [
      "Up to 5 contracts/month",
      "AI clause analysis",
      "Standard NDA & service templates",
      "Basic reminders",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$29",
    description: "Best for growing businesses needing advanced contract management and AI insights.",
    features: [
      "Up to 20 contracts/month",
      "Advanced AI risk detection",
      "Custom contract templates",
      "Smart search & tagging",
      "Priority email support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    description: "For organizations with complex legal needs and high contract volume.",
    features: [
      "Unlimited contracts",
      "Custom AI model tuning",
      "Dedicated onboarding",
      "24/7 phone & email support",
      "Advanced API & integrations",
      "Security & compliance reports",
    ],
    cta: "Contact Sales",
  },
]

const annualPlans = [
  {
    name: "Starter",
    price: "$15",
    description: "For freelancers and small teams who want fast, AI-powered contract review.",
    features: [
      "Up to 5 contracts/month",
      "AI clause analysis",
      "Standard NDA & service templates",
      "Basic reminders",
      "Email support",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    price: "$25",
    description: "Best for growing businesses needing advanced contract management and AI insights.",
    features: [
      "Up to 20 contracts/month",
      "Advanced AI risk detection",
      "Custom contract templates",
      "Smart search & tagging",
      "Priority email support",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$159",
    description: "For organizations with complex legal needs and high contract volume.",
    features: [
      "Unlimited contracts",
      "Custom AI model tuning",
      "Dedicated onboarding",
      "24/7 phone & email support",
      "Advanced API & integrations",
      "Security & compliance reports",
    ],
    cta: "Contact Sales",
  },
]

const PricingSection = React.memo(function PricingSection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)]"></div>
      <div className="container px-4 md:px-6 relative">
        {Motion ? (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          >
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </Motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
              Pricing
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
            <p className="max-w-[800px] text-muted-foreground md:text-lg">
              Choose the plan that's right for your business. All plans include a 14-day free trial.
            </p>
          </div>
        )}
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="rounded-full p-1">
                <TabsTrigger value="monthly" className="rounded-full px-6">
                  Monthly
                </TabsTrigger>
                <TabsTrigger value="annually" className="rounded-full px-6">
                  Annually (Save 20%)
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="monthly">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {monthlyPlans.map((plan, i) => Motion ? (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden h-full ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} bg-card`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        {plan.cta === "Start Free Trial" ? (
                          <a href="/auth">
                            <Button asChild
                              className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                              variant={plan.popular ? "default" : "outline"}
                            >
                              <span>{plan.cta}</span>
                            </Button>
                          </a>
                        ) : (
                          <Button
                            className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                            variant={plan.popular ? "default" : "outline"}
                          >
                            {plan.cta}
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Motion.div>
                ) : (
                  <div key={i}>
                    <Card
                      className={`relative overflow-hidden h-full ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} bg-card`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="annually">
              <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                {annualPlans.map((plan, i) => Motion ? (
                  <Motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden h-full ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} bg-card`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </Motion.div>
                ) : (
                  <div key={i}>
                    <Card
                      className={`relative overflow-hidden h-full ${plan.popular ? "border-primary shadow-lg" : "border-border/40 shadow-md"} bg-card`}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg">
                          Most Popular
                        </div>
                      )}
                      <CardContent className="p-6 flex flex-col h-full">
                        <h3 className="text-2xl font-bold">{plan.name}</h3>
                        <div className="flex items-baseline mt-4">
                          <span className="text-4xl font-bold">{plan.price}</span>
                          <span className="text-muted-foreground ml-1">/month</span>
                        </div>
                        <p className="text-muted-foreground mt-2">{plan.description}</p>
                        <ul className="space-y-3 my-6 flex-grow">
                          {plan.features.map((feature, j) => (
                            <li key={j} className="flex items-center">
                              <Check className="mr-2 size-4 text-primary" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button
                          className={`w-full mt-auto rounded-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-muted hover:bg-muted/80"}`}
                          variant={plan.popular ? "default" : "outline"}
                        >
                          {plan.cta}
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
})

export default PricingSection 