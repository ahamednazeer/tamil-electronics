'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { trackEvent } from '@/lib/analytics'

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

      <div className="w-full px-4 sm:px-6 relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-14 fade-mask-soft flex flex-col items-center">
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

        <div className="space-y-1">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="border-b border-[var(--theme-border)] transition-colors duration-300"
              >
                <button
                  onClick={() => {
                    const willOpen = !isOpen
                    setOpenIndex(isOpen ? null : index)
                    trackEvent('faq_question_toggled', { question_index: index, question_text: faq.question, is_open: willOpen })
                  }}
                  className="w-full text-left py-6 sm:py-8 flex items-center justify-between gap-4 focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className={`font-semibold text-[1.1rem] sm:text-xl leading-snug pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-theme group-hover:text-primary/80'}`}>
                    {faq.question}
                  </span>
                  <div className={`relative shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-colors ${isOpen ? 'text-primary' : 'text-theme-muted group-hover:text-primary/80'}`}>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="minus"
                          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Icon icon="ph:minus-light" className="text-2xl sm:text-[1.75rem]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="plus"
                          initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <Icon icon="ph:plus-light" className="text-2xl sm:text-[1.75rem]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 sm:pt-4 text-theme-muted text-base sm:text-[1.1rem] leading-relaxed max-w-3xl">
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
