import { Badge } from "../ui/badge"
import React from "react"

const faqs = [
  {
    question: "Does PactIQ replace the need for a lawyer?",
    answer:
      "PactIQ helps you understand and manage contracts effectively, but doesn't replace legal advice for complex situations. For standard agreements, our AI provides excellent guidance. For high-stakes contracts, consult a qualified attorney.",
  },
  {
    question: "How accurate is the AI contract analysis?",
    answer:
      "Our AI is powered by GPT-4 and trained on thousands of legal documents. While highly accurate for standard contract terms, we recommend professional review for critical agreements.",
  },
  {
    question: "Is my contract data secure?",
    answer:
      "Yes. We use AES-256 encryption for all data, are GDPR compliant, and never share your contract data. Your contracts remain completely private and secure.",
  },
  {
    question: "What types of contracts does PactIQ support?",
    answer:
      "PactIQ works with most business contracts including freelance agreements, NDAs, consulting contracts, service agreements, rental agreements, and more.",
  },
]

const FAQSection = React.memo(function FAQSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)
  return (
    <section id="faqs" className="w-full py-20 md:py-32" style={{ position: 'relative', zIndex: 0 }}>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <Badge className="rounded-full px-4 py-1.5 text-sm font-medium" variant="secondary">
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about our platform.
          </p>
        </div>
        <div className="mx-auto max-w-3xl divide-y divide-border/40" style={{ position: 'relative' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className="py-4 cursor-pointer select-none relative" style={{ zIndex: isOpen ? 10 : 1, marginBottom: 12 }} onClick={() => setOpenIndex(isOpen ? null : i)}>
                <div className="text-left font-semibold text-lg flex items-center justify-between group">
                  {faq.question}
                  <span className={`ml-2 transition-transform duration-200 ease-in-out text-primary group-hover:text-primary/80 ${isOpen ? 'rotate-90' : ''}`}>▼</span>
                </div>
                {isOpen && (
                  <div
                    className="absolute left-0 right-0 mt-1 rounded-2xl border border-border bg-card shadow-2xl p-8 text-muted-foreground animate-fade-in-up"
                    style={{ top: '100%', zIndex: 20, boxShadow: '0 12px 48px 0 rgba(0,0,0,0.12)' }}
                  >
                    <div className="text-base md:text-lg leading-relaxed">{faq.answer}</div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
})

export default FAQSection 