'use client'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react'

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
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="px-3 py-1.5 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 border ml-2 shadow-sm"
            style={{
                backgroundColor: 'var(--theme-bg-card)',
                borderColor: 'color-mix(in srgb, var(--theme-border) 70%, transparent)',
                color: 'var(--theme-text)'
            }}
            aria-label={`Switch to ${language === 'en' ? 'Tamil' : 'English'}`}
        >
            {language === 'en' ? 'TA' : 'EN'}
        </button>
    )
}

export default LanguageToggle
