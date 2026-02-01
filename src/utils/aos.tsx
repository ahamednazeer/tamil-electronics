'use client'
import { useEffect } from "react";
import AOS from "aos"
import 'aos/dist/aos.css';

const Aoscompo = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Defer AOS initialization for better initial load performance
    const timer = setTimeout(() => {
      AOS.init({
        duration: 600, // Reduced from 800 for snappier animations
        once: true, // Only animate once - improves scroll performance
        easing: 'ease-out',
        disable: window.innerWidth < 768, // Disable on mobile for better performance
      })
    }, 100) // Small delay to not block initial render

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

export default Aoscompo

