'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

const faqs = [
  {
    question: "What are your store timings in Virudhachalam?",
    answer: "Our retail shop and wholesale counter in Virudhachalam is open every day from 8:30 AM to 8:30 PM (Sundays from 9:00 AM to 8:30 PM). We are available for emergency electrical supplies during these hours."
  },
  {
    question: "Do you sell original RR Kabel and Havells products?",
    answer: "Yes! Tamil Electricals is an authorized dealer for premium brands including RR Kabel, Havells, Finolex, GM, and Legrand. All our products are 100% genuine and come with official manufacturer warranties."
  },
  {
    question: "Do you supply materials for commercial building projects?",
    answer: "Absolutely. We supply wholesale electrical panels, switchgear, heavy-duty wiring, and plumbing pipes to building contractors, electricians, and civil engineers across Virudhachalam, Kallakurichi, and Ulundurpet."
  },
  {
    question: "Do you offer delivery for large electrical and plumbing orders?",
    answer: "Yes, we arrange transportation and delivery for bulk orders directly to your construction site or home within our service areas."
  },
  {
    question: "What kind of plumbing materials do you have?",
    answer: "We carry a complete range of Ashirvad CPVC/UPVC pipes, Supreme fittings, Parryware bathroom sanitaryware, and powerful agricultural water pumps from Crompton and Suguna."
  }
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <section className="py-16 sm:py-24 bg-[var(--theme-bg)] relative overflow-hidden" id="faq">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-primary/5 blur-[80px]" aria-hidden="true" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <div className="container px-4 sm:px-6 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 fade-mask-soft">
          <p className="text-primary font-bold tracking-wider uppercase text-sm sm:text-base mb-3" data-aos="fade-up">
            Got Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-theme mb-4" data-aos="fade-up" data-aos-delay="100">
            Frequently Asked Questions
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            Everything you need to know about our products, services, and wholesale options at Tamil Electricals.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={300 + (index * 50)}
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'border-primary/30 bg-[var(--theme-bg-card)] shadow-[0_8px_30px_rgb(0,0,0,0.06)]' 
                    : 'border-[var(--theme-border)] bg-[var(--theme-bg-card)]/40 hover:border-primary/20 hover:bg-[var(--theme-bg-card)] hover:shadow-sm'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-5 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 focus:outline-none rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span className={`font-bold text-[1.1rem] sm:text-xl transition-colors pr-4 ${isOpen ? 'text-primary' : 'text-theme group-hover:text-primary/80'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                    <Icon 
                      icon="mdi:chevron-down" 
                      className={`text-xl sm:text-2xl transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-0 text-muted/90 text-base sm:text-[1.1rem] leading-relaxed max-w-3xl">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
