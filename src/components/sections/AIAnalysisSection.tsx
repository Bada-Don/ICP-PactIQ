import { Badge } from "../ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
// ...existing code...
import { FileText } from "lucide-react"
import type { PropsWithChildren } from "react"
import React from "react"

const AnimatedSection = ({ children, className = "" }: PropsWithChildren<{ className?: string }>) => {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])
  if (!Motion) {
    return <section className={className}>{children}</section>
  }
  return (
    <Motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={className}
    >
      {children}
    </Motion.section>
  )
}

const AIAnalysisSection = React.memo(function AIAnalysisSection() {
  const [Motion, setMotion] = React.useState<any>(null)
  React.useEffect(() => {
    let mounted = true
    import("framer-motion").then(mod => {
      if (mounted) setMotion(() => mod.motion)
    })
    return () => { mounted = false }
  }, [])
  return (
    <AnimatedSection className="py-12 sm:py-16 px-4 sm:px-6 bg-muted/50">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {Motion ? (
            <Motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
                Understand Every Contract Like a Legal Expert
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                Our AI automatically detects critical clauses, highlights potential risks, and suggests improvements in plain English.
              </p>
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-blue-950/40 h-auto p-1 border border-blue-200 dark:border-blue-800 rounded-xl shadow-sm">
                  <TabsTrigger value="analysis" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="risks" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Risk Detection
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Suggestions
                  </TabsTrigger>
                </TabsList>
                <div className="mt-6 min-h-[220px]">
                  <TabsContent value="analysis" className="mt-0">
                    <Motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 bg-white dark:bg-red-950/30 rounded-xl shadow p-5 sm:p-6 border border-blue-100 dark:border-blue-900"
                    >
                      {[
                        {
                          color: "blue",
                          title: "Payment Obligations",
                          desc: "Identifies payment terms, due dates, and penalties",
                        },
                        {
                          color: "blue",
                          title: "Confidentiality Terms",
                          desc: "Highlights NDA and data protection clauses",
                        },
                        {
                          color: "blue",
                          title: "Termination Rights",
                          desc: "Explains how either party can end the agreement",
                        },
                      ].map((item, index) => (
                        <Motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-3 border-l-4 border-blue-200 dark:border-blue-700 pl-4 hover:bg-blue-50/60 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200"
                        >
                          <Motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.3 }}
                            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-1 sm:mt-2 flex-shrink-0 shadow"
                          />
                          <div>
                            <span className="font-semibold text-sm text-blue-900 dark:text-blue-100">{item.title}:</span>
                            <span className="text-blue-700 dark:text-blue-200 ml-2 text-sm">{item.desc}</span>
                          </div>
                        </Motion.li>
                      ))}
                    </Motion.ul>
                  </TabsContent>
                  <TabsContent value="risks" className="mt-0">
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3 bg-white dark:bg-blue-950/30 rounded-xl shadow p-5 sm:p-6 border border-blue-100 dark:border-blue-900"
                    >
                      {[
                        {
                          level: "High Risk",
                          desc: "Unlimited liability exposure detected",
                          color: "text-red-600 dark:text-red-400",
                        },
                        {
                          level: "Medium Risk",
                          desc: "Vague termination clause needs clarification",
                          color: "text-amber-600 dark:text-amber-400",
                        },
                        {
                          level: "Low Risk",
                          desc: "Standard payment terms look good",
                          color: "text-green-600 dark:text-green-400",
                        },
                      ].map((item, index) => (
                        <Motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-blue-50/60 dark:bg-blue-950/40 border-l-4 border-blue-400 dark:border-blue-500 rounded-lg hover:bg-blue-100/80 dark:hover:bg-blue-900/40 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-1 flex-shrink-0 shadow" />
                          <div>
                            <span className={`font-semibold text-sm ${item.color}`}>{item.level}:</span>
                            <span className="text-blue-700 dark:text-blue-200 ml-2 text-sm">{item.desc}</span>
                          </div>
                        </Motion.div>
                      ))}
                    </Motion.div>
                  </TabsContent>
                  <TabsContent value="suggestions" className="mt-0">
                    <Motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3 }}
                      className="p-5 sm:p-6 bg-white dark:bg-blue-950/30 rounded-xl shadow border border-blue-100 dark:border-blue-900"
                    >
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-sm">
                        Recommended Changes:
                      </h4>
                      <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-200">
                        {[
                          "Add liability cap to limit financial exposure",
                          "Include force majeure clause for unexpected events",
                          "Specify governing law and dispute resolution",
                        ].map((suggestion, index) => (
                          <Motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            • {suggestion}
                          </Motion.li>
                        ))}
                      </ul>
                    </Motion.div>
                  </TabsContent>
                </div>
              </Tabs>
            </Motion.div>
          ) : (
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">
                Understand Every Contract Like a Legal Expert
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                Our AI automatically detects critical clauses, highlights potential risks, and suggests improvements in plain English.
              </p>
              <Tabs defaultValue="analysis" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-blue-50 dark:bg-blue-950/40 h-auto p-1 border border-blue-300 dark:border-blue-800">
                  <TabsTrigger value="analysis" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Analysis
                  </TabsTrigger>
                  <TabsTrigger value="risks" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Risk Detection
                  </TabsTrigger>
                  <TabsTrigger value="suggestions" className="text-xs sm:text-sm py-2 transition-all duration-200 text-blue-900 dark:text-blue-100">
                    Suggestions
                  </TabsTrigger>
                </TabsList>
                <div className="mt-4 sm:mt-6 min-h-[200px]">
                  <TabsContent value="analysis" className="mt-0">
                    <ul
                      className="space-y-3 sm:space-y-4"
                    >
                      {[
                        {
                          color: "blue",
                          title: "Payment Obligations",
                          desc: "Identifies payment terms, due dates, and penalties",
                        },
                        {
                          color: "blue",
                          title: "Confidentiality Terms",
                          desc: "Highlights NDA and data protection clauses",
                        },
                        {
                          color: "blue",
                          title: "Termination Rights",
                          desc: "Explains how either party can end the agreement",
                        },
                      ].map((item, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2 sm:gap-3"
                        >
                          <div
                            className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-1 sm:mt-2 flex-shrink-0"
                          />
                          <div>
                            <span className="font-medium text-xs sm:text-sm text-blue-900 dark:text-blue-100">{item.title}:</span>
                            <span className="text-blue-700 dark:text-blue-200 ml-1 sm:ml-2 text-xs sm:text-sm">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="risks" className="mt-0">
                    <div
                      className="space-y-2 sm:space-y-3"
                    >
                      {[
                        {
                          level: "High Risk",
                          desc: "Unlimited liability exposure detected",
                          color: "text-red-600 dark:text-red-400",
                        },
                        {
                          level: "Medium Risk",
                          desc: "Vague termination clause needs clarification",
                          color: "text-amber-600 dark:text-amber-400",
                        },
                        {
                          level: "Low Risk",
                          desc: "Standard payment terms look good",
                          color: "text-green-600 dark:text-green-400",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg"
                        >
                          <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-1 flex-shrink-0" />
                          <div>
                            <span className={`font-medium text-xs sm:text-sm ${item.color}`}>{item.level}:</span>
                            <span className="text-xs sm:text-sm ml-1 text-blue-700 dark:text-blue-200">{item.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="suggestions" className="mt-0">
                    <div
                      className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800"
                    >
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2 sm:mb-3 text-xs sm:text-sm">
                        Recommended Changes:
                      </h4>
                      <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-700 dark:text-blue-200">
                        {[
                          "Add liability cap to limit financial exposure",
                          "Include force majeure clause for unexpected events",
                          "Specify governing law and dispute resolution",
                        ].map((suggestion, index) => (
                          <li
                            key={index}
                            className="text-xs sm:text-sm text-blue-700 dark:text-blue-200"
                          >
                            • {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}
          {Motion ? (
            <Motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2 lg:sticky lg:top-24"
            >
              <Motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                <Card className="shadow-lg border-0 overflow-hidden bg-blue-50 dark:bg-blue-950/40">
                  <CardHeader className="bg-blue-700/90 text-blue-50 p-3 sm:p-4">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-100" />
                      Contract Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          status: "Clear",
                          title: "Payment Terms",
                          desc: "Payment due within 30 days of invoice receipt",
                        },
                        {
                          status: "Review",
                          title: "Liability Clause",
                          desc: "Unlimited damages clause detected. Consider adding liability cap.",
                        },
                        {
                          status: "High Risk",
                          title: "Termination Rights",
                          desc: "Client can terminate without notice. Risk of unpaid work.",
                        },
                      ].map((item, index) => (
                        <Motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                          className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-700 dark:border-blue-400 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-100">{item.title}</span>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-100 dark:border-blue-700 text-xs"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-blue-700 dark:text-blue-200">{item.desc}</p>
                        </Motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Motion.div>
            </Motion.div>
          ) : (
            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <div>
                <Card className="shadow-lg border-0 overflow-hidden bg-blue-50 dark:bg-blue-950/40">
                  <CardHeader className="bg-blue-700/90 text-blue-50 p-3 sm:p-4">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-100" />
                      Contract Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-4">
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        {
                          status: "Clear",
                          title: "Payment Terms",
                          desc: "Payment due within 30 days of invoice receipt",
                        },
                        {
                          status: "Review",
                          title: "Liability Clause",
                          desc: "Unlimited damages clause detected. Consider adding liability cap.",
                        },
                        {
                          status: "High Risk",
                          title: "Termination Rights",
                          desc: "Client can terminate without notice. Risk of unpaid work.",
                        },
                      ].map((item, index) => (
                        <div
                          key={index}
                          className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/40 border-l-4 border-blue-700 dark:border-blue-400 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-1 sm:mb-2">
                            <span className="text-xs sm:text-sm font-medium text-blue-900 dark:text-blue-100">{item.title}</span>
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/60 dark:text-blue-100 dark:border-blue-700 text-xs"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-blue-700 dark:text-blue-200">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </AnimatedSection>
  )
})

export default AIAnalysisSection 