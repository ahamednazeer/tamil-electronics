'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for demonstration. 
// In a larger app, you might want to lazy load these or use a library like i18next
import en from '@/locales/en.json';
import ta from '@/locales/ta.json';

type JsonValue =
    | string
    | number
    | boolean
    | null
    | JsonObject
    | JsonValue[];

interface JsonObject {
    [key: string]: JsonValue;
}

const dictionaries: Record<Language, JsonObject> = {
    en,
    ta,
};

const getTranslation = (dictionary: JsonObject, key: string): string | undefined => {
    const keys = key.split('.');
    let value: JsonValue | undefined = dictionary;

    for (const segment of keys) {
        if (value === null || typeof value !== 'object') {
            return undefined;
        }
        const nextValue: JsonValue | undefined = (value as Record<string, JsonValue>)[segment];
        if (nextValue === undefined) {
            return undefined;
        }
        value = nextValue;
    }

    return typeof value === 'string' ? value : undefined;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        // Load saved language
        const savedLanguage = localStorage.getItem('language') as Language;
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ta')) {
            setLanguageState(savedLanguage);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        // Optionally update the HTML lang attribute
        document.documentElement.lang = lang;
    };

    const t = (key: string) => {
        const localValue = getTranslation(dictionaries[language], key);
        if (localValue) return localValue;

        const fallbackValue = getTranslation(dictionaries.en, key);
        return fallbackValue ?? key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
