'use client'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/analytics'

const LanguageToggle: React.FC = () => {
    const { language, setLanguage } = useLanguage()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-10 h-10" /> // Placeholder to prevent layout shift
        )
    }

    return (
        <button
            onClick={() => {
                const newLang = language === 'en' ? 'ta' : 'en'
                setLanguage(newLang)
                trackEvent('language_switched', { from: language, to: newLang })
            }}
            className="language-toggle-btn"
            aria-label={`Switch to ${language === 'en' ? 'Tamil' : 'English'}`}
        >
            {language === 'en' ? 'TA' : 'EN'}
        </button>
    )
}

export default LanguageToggle
