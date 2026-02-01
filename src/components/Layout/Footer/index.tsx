import React, { FC } from 'react'
import Link from 'next/link'
import { headerData } from '../Header/Navigation/menuData'
import { footerlabels } from '@/app/api/data'
import { Icon } from '@iconify/react'
import Logo from '../Header/Logo'

const Footer: FC = () => {
  return (
    <footer className='pt-10 sm:pt-12 lg:pt-16 bg-darkmode' id='contact'>
      <div className='container px-4 sm:px-6'>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-20 pb-10 sm:pb-12 lg:pb-16'>
          {/* Logo and About */}
          <div className='col-span-2 sm:col-span-2 md:col-span-6 lg:col-span-4'>
            <Logo />
            <div className='mt-4 sm:mt-6'>
              <p className='text-muted/80 text-sm sm:text-base lg:text-lg mb-1 sm:mb-2'>Your Trusted Electrical Partner</p>
              <p className='text-muted/60 text-xs sm:text-sm lg:text-base'>Serving quality electrical materials since 2015</p>
            </div>
            <div className='flex gap-4 sm:gap-6 items-center mt-5 sm:mt-8 relative z-1'>
              <Link href='#' className='group'>
                <Icon
                  icon='fa6-brands:facebook-f'
                  width='20'
                  height='20'
                  className='text-white group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
              <Link href='#' className='group'>
                <Icon
                  icon='fa6-brands:instagram'
                  width='20'
                  height='20'
                  className='text-white group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
              <Link href='https://wa.me/91XXXXXXXXXX' className='group'>
                <Icon
                  icon='fa6-brands:whatsapp'
                  width='20'
                  height='20'
                  className='text-white group-hover:text-primary sm:w-6 sm:h-6'
                />
              </Link>
            </div>
            <h3 className='text-white text-sm sm:text-lg lg:text-xl font-medium mt-6 sm:mt-10 lg:mt-20'>
              © 2025 Tamil Electricals
            </h3>
          </div>

          {/* Quick Links */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='text-white mb-3 sm:mb-4 font-medium text-base sm:text-lg lg:text-xl'>Quick Links</h4>
            <ul>
              {headerData.map((item, index) => (
                <li key={index} className='pb-2 sm:pb-3 lg:pb-4'>
                  <Link
                    href={item.href}
                    className='text-white hover:text-primary text-sm sm:text-base'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div className='col-span-1 md:col-span-3 lg:col-span-2'>
            <h4 className='text-white mb-3 sm:mb-4 font-medium text-base sm:text-lg lg:text-xl'>Information</h4>
            <ul>
              {footerlabels.map((item, index) => (
                <li key={index} className='pb-2 sm:pb-3 lg:pb-4'>
                  <span className='text-muted/80 text-sm sm:text-base'>
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className='col-span-2 sm:col-span-2 md:col-span-12 lg:col-span-4'>
            <h3 className='text-white text-base sm:text-lg lg:text-xl font-medium'>Contact Us</h3>
            <div className='mt-4 sm:mt-5 space-y-3 sm:space-y-4'>
              <div className='flex items-start gap-2 sm:gap-3'>
                <Icon icon='mdi:map-marker' width='20' height='20' className='text-primary mt-1 flex-shrink-0 sm:w-6 sm:h-6' />
                <div>
                  <p className='text-muted/80 text-sm sm:text-base'>Shop Address</p>
                  <p className='text-muted/60 text-xs sm:text-sm'>[Your Street Name]<br />[Town Name], [State]</p>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Icon icon='mdi:phone' width='20' height='20' className='text-primary flex-shrink-0 sm:w-6 sm:h-6' />
                <div>
                  <p className='text-muted/80 text-sm sm:text-base'>Phone</p>
                  <Link href='tel:+91XXXXXXXXXX' className='text-primary text-xs sm:text-sm hover:underline'>+91 XXXXX XXXXX</Link>
                </div>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <Icon icon='mdi:clock-outline' width='20' height='20' className='text-primary flex-shrink-0 sm:w-6 sm:h-6' />
                <div>
                  <p className='text-muted/80 text-sm sm:text-base'>Working Hours</p>
                  <p className='text-muted/60 text-xs sm:text-sm'>9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
