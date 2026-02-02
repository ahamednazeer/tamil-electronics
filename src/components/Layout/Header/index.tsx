'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { headerData } from '../Header/Navigation/menuData'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'


const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)

  const mobileMenuRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        navbarOpen
      ) {
        setNavbarOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [navbarOpen])

  return (
    <header
      className={`fixed top-0 z-40 w-full pb-5 transition-all duration-300 ${sticky ? 'shadow-lg bg-darkmode/80 backdrop-blur-md pt-5' : 'shadow-none md:pt-14 pt-5 bg-transparent'
        }`}>
      <div className='lg:py-0 py-2'>
        <div className='container px-4 flex items-center justify-between px-4'>
          <Logo />
          <nav className='hidden lg:flex grow items-center gap-8 justify-center'>
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
          </nav>
          <div className='flex items-center gap-4'>
            <Link
              href='tel:+91XXXXXXXXXX'
              className='hidden lg:block bg-transparent text-primary border hover:bg-primary border-primary hover:text-darkmode px-4 py-2 rounded-lg font-medium transition-colors'>
              Call Now
            </Link>
            <Link
              href='https://wa.me/91XXXXXXXXXX'
              target='_blank'
              rel='noopener noreferrer'
              className='hidden lg:block bg-primary text-darkmode hover:bg-transparent hover:text-primary border border-primary px-4 py-2 rounded-lg font-medium transition-colors'>
              WhatsApp
            </Link>
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className='block lg:hidden p-2 rounded-lg'
              aria-label='Toggle mobile menu'>
              <span className='block w-6 h-0.5 bg-white'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
              <span className='block w-6 h-0.5 bg-white mt-1.5'></span>
            </button>
          </div>
        </div>
        {navbarOpen && (
          <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-40' />
        )}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-darkmode shadow-lg transform transition-transform duration-300 max-w-xs ${navbarOpen ? 'translate-x-0' : 'translate-x-full'
            } z-50`}>
          <div className='flex items-center justify-between p-4'>
            <h2 className='text-lg font-bold text-midnight_text dark:text-midnight_text'>
              <Logo />
            </h2>

            <button
              onClick={() => setNavbarOpen(false)}
              className="bg-[url('/images/closed.svg')] bg-no-repeat bg-contain w-5 h-5 absolute top-0 right-0 mr-8 mt-8 dark:invert"
              aria-label='Close menu Modal'></button>
          </div>
          <nav className='flex flex-col items-start p-4'>
            {headerData.map((item, index) => (
              <MobileHeaderLink key={index} item={item} />
            ))}
            <div className='mt-4 flex flex-col gap-4 w-full'>
              <Link
                href='tel:+91XXXXXXXXXX'
                className='bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-darkmode font-medium text-center transition-colors'
                onClick={() => {
                  setNavbarOpen(false)
                }}>
                Call Now
              </Link>
              <Link
                href='https://wa.me/91XXXXXXXXXX'
                target='_blank'
                rel='noopener noreferrer'
                className='bg-primary text-darkmode px-4 py-2 rounded-lg hover:bg-transparent hover:text-primary border border-primary font-medium text-center transition-colors'
                onClick={() => {
                  setNavbarOpen(false)
                }}>
                WhatsApp
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
