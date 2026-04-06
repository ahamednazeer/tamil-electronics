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
import { trackEvent } from '@/lib/analytics'



const Header: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [sticky, setSticky] = useState(false)
  const { t, language } = useLanguage()

  const showHeaderBg = true

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
      <div className={`fixed top-0 w-full z-40 flex justify-center transition-all duration-300 pointer-events-none ${sticky ? 'p-2 sm:p-5' : 'p-0'}`}>
        <header
          className={`relative w-full pointer-events-auto transition-all duration-300 ${sticky
            ? (language === 'ta' ? 'max-w-[1380px]' : 'max-w-6xl')
            : 'border-b border-white/5 shadow-[0_4px_16px_rgba(0,0,0,0.05)] backdrop-blur-md'
            }`}
          style={{ backgroundColor: (!sticky && showHeaderBg) ? 'var(--theme-header-bg)' : 'transparent' }}>

          <div className={`absolute inset-0 w-full h-full transition-opacity duration-300 pointer-events-none overflow-hidden ${sticky ? 'opacity-100 rounded-2xl sm:rounded-[2rem] z-0 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 dark:border-white/10' : 'opacity-0 -z-10'}`}>
            <div className="w-full h-full absolute inset-0 rounded-2xl sm:rounded-[2rem] backdrop-blur-md bg-white/80 dark:bg-neutral-950/80" />
          </div>

          <div className='relative z-10 w-full lg:py-0 py-2'>
            <div className={`${sticky ? 'w-full' : 'container mx-auto'} flex items-center justify-between py-2 sm:py-3 gap-1 lg:gap-2 ${sticky ? 'px-3 sm:px-6 lg:px-6 xl:px-8' : 'px-3 sm:px-4'}`}>
              <div className="flex shrink-0 justify-start min-w-max">
                <Logo />
              </div>
              <nav className={`hidden lg:flex items-center justify-center flex-1 px-1 lg:px-0 ${language === 'ta' ? 'gap-1.5 xl:gap-3 2xl:gap-6' : 'gap-2 xl:gap-5 2xl:gap-8'}`}>
                {headerData.map((item, index) => (
                  <HeaderLink key={index} item={item} />
                ))}
              </nav>
              <div className='flex shrink-0 items-center justify-end gap-1.5 sm:gap-2 xl:gap-3'>
                <Link
                  href={`tel:${storeInfo.phoneE164}`}
                  aria-label={t('header.call_short')}
                  onClick={() => trackEvent('header_call_clicked', { source: 'desktop' })}
                  className='btn btn-outline btn-pill flex items-center justify-center shrink-0 w-[42px] sm:w-[54px] lg:w-[58px] h-[34px] sm:h-[38px]'>
                  <Icon icon='mdi:phone' className='text-[18px] sm:text-[20px] shrink-0' />
                </Link>
                {/* Language only (no theme toggle) */}
                <div className='hidden md:flex items-center'>
                  <LanguageToggle />
                </div>
                <Link
                  href={`https://wa.me/${storeInfo.whatsappNumber}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={t('header.whatsapp_short')}
                  onClick={() => trackEvent('header_whatsapp_clicked', { source: 'desktop' })}
                  className='btn btn-outline btn-pill flex items-center justify-center shrink-0 w-[42px] sm:w-[54px] lg:w-[58px] h-[34px] sm:h-[38px]'>
                  <Icon icon='mdi:whatsapp' className='text-[20px] sm:text-[22px] shrink-0' />
                </Link>
                <button
                  onClick={() => {
                    if (!navbarOpen) trackEvent('mobile_menu_opened')
                    setNavbarOpen(!navbarOpen)
                  }}
                  className='block lg:hidden p-1.5 sm:p-2 rounded-lg ml-0.5'
                  aria-label='Toggle mobile menu'
                  aria-expanded={navbarOpen}
                  aria-controls='mobile-navigation'>
                  <span className='block w-5 sm:w-6 h-0.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
                  <span className='block w-5 sm:w-6 h-0.5 mt-1 sm:mt-1.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
                  <span className='block w-5 sm:w-6 h-0.5 mt-1 sm:mt-1.5' style={{ backgroundColor: 'var(--theme-text)' }}></span>
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
              {/* Mobile language toggle */}
              <div
                className='mt-4 flex items-center justify-between rounded-xl px-3 py-2.5'
                style={{
                  borderColor: 'var(--theme-border)',
                  backgroundColor: 'var(--theme-bg-secondary)',
                }}>
                <span className='text-xs font-medium uppercase tracking-wider' style={{ color: 'var(--theme-text-muted)' }}>
                  {t('menu.language')}
                </span>
                <LanguageToggle />
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
                    trackEvent('header_call_clicked', { source: 'mobile_menu' })
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
                    trackEvent('header_whatsapp_clicked', { source: 'mobile_menu' })
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
