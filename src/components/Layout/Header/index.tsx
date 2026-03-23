'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { headerData } from '../Header/Navigation/menuData'
import Logo from './Logo'
import HeaderLink from '../Header/Navigation/HeaderLink'
import MobileHeaderLink from '../Header/Navigation/MobileHeaderLink'
import LanguageToggle from '../LanguageToggle'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'



const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const { t } = useLanguage()

  const showHeaderBg = true
  const showHeaderShadow = sticky || navbarOpen

  const handleScroll = () => {
    setSticky(window.scrollY >= 80)
  }

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNavbarOpen(false)
      }
    }
    if (navbarOpen) {
      window.addEventListener('keydown', onKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [navbarOpen])

  useEffect(() => {
    if (navbarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [navbarOpen])


  return (
    <>
      <div className={`fixed top-0 w-full z-40 flex justify-center transition-all duration-300 pointer-events-none ${sticky ? 'p-3 sm:p-5' : 'p-0'}`}>
        <header
          className={`relative w-full pointer-events-auto transition-all duration-300 ${sticky
            ? 'max-w-6xl'
            : 'border-b border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] backdrop-blur-md'
            }`}
          style={{ backgroundColor: (!sticky && showHeaderBg) ? 'var(--theme-header-bg)' : 'transparent' }}>

          <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none overflow-hidden ${sticky ? 'opacity-100 rounded-[2rem] z-0 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/10' : 'opacity-0 -z-10'}`}>
            <div className="w-full h-full absolute inset-0 rounded-[2rem] backdrop-blur-md bg-white/80 dark:bg-neutral-950/80" />
          </div>

          <div className='relative z-10 w-full lg:py-0 py-2'>
            <div className={`container mx-auto flex items-center justify-between py-3 gap-3 ${sticky ? 'px-6 sm:px-8' : 'px-4'}`}>
              <div className="flex-1">
                <Logo />
              </div>
              <nav className='hidden lg:flex items-center gap-8 justify-center min-w-max'>
                {headerData.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </nav>
              <div className='flex-1 flex items-center justify-end gap-2 sm:gap-3'>
                <Link
                  href={`tel:${storeInfo.phoneE164}`}
                  aria-label={t('header.call_short')}
                  className='btn btn-outline btn-pill flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm whitespace-nowrap'>
                  <Icon icon='mdi:phone' className='text-sm sm:text-base' />
                  <span className='sm:hidden'>{t('header.call_short')}</span>
                  <span className='hidden sm:inline'>{storeInfo.phoneDisplay}</span>
                </Link>
                {/* Language only (no theme toggle) */}
                <div className='hidden md:flex items-center'>
                  <LanguageToggle />
                </div>
                <Link
                  href={`https://wa.me/${storeInfo.whatsappNumber}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='btn btn-outline btn-pill flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm whitespace-nowrap'>
                  <Icon icon='mdi:whatsapp' className='text-base' />
                  <span className='hidden sm:inline'>{t('header.whatsapp_short')}</span>
                </Link>
                <button
                  onClick={() => setNavbarOpen(!navbarOpen)}
                  className='block lg:hidden p-2 rounded-lg'
                  aria-label='Toggle mobile menu'
                  aria-expanded={navbarOpen}
                  aria-controls='mobile-navigation'>
                  <span className='block w-6 h-0.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
                  <span className='block w-6 h-0.5 mt-1.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
                  <span className='block w-6 h-0.5 mt-1.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="pointer-events-auto">
        {navbarOpen && (
          <button
            type='button'
            onClick={() => setNavbarOpen(false)}
            aria-label='Close menu overlay'
            className='fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden'
          />
        )}
        <aside
          id='mobile-navigation'
          className={`mobile-menu lg:hidden fixed top-0 right-0 z-50 h-[100dvh] w-[86vw] max-w-[360px] transform transition-transform duration-300 ${navbarOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
            }`}
          role='dialog'
          aria-modal='true'
          aria-label='Mobile navigation'
          style={{
            backgroundColor: 'var(--theme-bg)',
            borderLeft: '1px solid var(--theme-border)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.32)',
          }}>
          <div className='flex h-full flex-col'>
            <div
              className='flex items-center justify-between border-b px-5 pt-5 pb-4'
              style={{ borderColor: 'var(--theme-border)' }}>
              <Logo />
              <button
                type='button'
                onClick={() => setNavbarOpen(false)}
                className='inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-white/10'
                aria-label='Close mobile menu'>
                <Icon icon='mdi:close' className='text-2xl text-midnight_text dark:text-white' />
              </button>
            </div>
            <nav className='flex-1 overflow-y-auto px-4 py-4'>
              <div className='space-y-1'>
                {headerData.map((item, index) => (
                  <MobileHeaderLink
                    key={index}
                    item={item}
                    onNavigate={() => setNavbarOpen(false)}
                  />
                ))}
              </div>
              {/* Mobile language toggle, soft rounded card */}
              <div
                className='mt-5 rounded-2xl border p-3'
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: 'var(--theme-bg-secondary)',
                }}>
                <p className='text-[11px] font-semibold uppercase tracking-[0.1em] text-muted/70 mb-2'>
                  {t('menu.language')}
                </p>
                <div className='flex items-center gap-2'>
                  <LanguageToggle />
                </div>
              </div>
            </nav>
            <div
              className='border-t px-5 pt-4 pb-[calc(1rem+env(safe-area-inset-bottom))]'
              style={{ borderColor: 'var(--theme-border)' }}>
              <div className='flex flex-col gap-3'>
                <Link
                  href={`tel:${storeInfo.phoneE164}`}
                  className='mobile-menu-action inline-flex items-center justify-center gap-2 rounded-xl border border-primary/70 px-4 py-3 text-base font-semibold !text-primary hover:bg-primary/10 transition-colors'
                  onClick={() => {
                    setNavbarOpen(false)
                  }}>
                  <Icon icon='mdi:phone' className='text-lg' />
                  {t('header.call_short')}
                </Link>
                <Link
                  href={`https://wa.me/${storeInfo.whatsappNumber}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mobile-menu-action inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-base font-semibold !text-white shadow-[0_12px_30px_rgba(227,30,36,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(227,30,36,0.38)]'
                  onClick={() => {
                    setNavbarOpen(false)
                  }}>
                  <Icon icon='mdi:whatsapp' className='text-lg' />
                  {t('header.whatsapp_short')}
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Header
