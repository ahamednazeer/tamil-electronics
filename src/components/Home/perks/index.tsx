import { perksData } from '@/app/api/data'
import Image from 'next/image'

const Perks = () => {
  return (
    <section className='pb-6 sm:pb-8 lg:pb-10 relative'>
      <div className='container px-4 sm:px-6 relative z-2'>
        <div className='text-center'>
          <p className="text-muted text-lg sm:text-xl lg:text-28 mb-3 sm:mb-4 pb-4 sm:pb-6 relative after:content-[''] after:w-8 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-1/2">
            Always By <span className='text-primary'>Your Side</span>
          </p>
          <h2 className='text-white dark:text-white text-2xl sm:text-3xl lg:text-4xl font-medium perks-title'>
            Visit <span className='text-primary'>Tamil Electricals</span> Today!
          </h2>
          <div className='perks-card relative overflow-hidden mt-6 sm:mt-8 lg:mt-10 border border-border/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 sm:py-8 lg:py-10 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-16 rounded-2xl sm:rounded-3xl bg-dark_grey/35'>
            {/* Background image - visible in both dark and light mode */}
            <Image
              src='/images/perks/perk-bg.png'
              alt='Background'
              width={1600}
              height={400}
              className='perks-bg-image absolute bottom-0 left-0 w-full h-auto z-0 hidden sm:block pointer-events-none'
            />
            {perksData.map((item, index) => (
              <div
                key={index}
                className='text-center flex items-center justify-end flex-col z-10 relative'>
                <div className='bg-primary/25 backdrop-blur-xs p-3 sm:p-4 rounded-full w-fit'>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={32}
                    height={32}
                    className='w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11'
                  />
                </div>
                <h4 className={`text-white perks-item-title text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-4 ${item.space}`}>
                  {item.title}
                </h4>
                <div
                  className='text-muted/60 perks-item-desc text-xs sm:text-sm lg:text-base'
                  dangerouslySetInnerHTML={{ __html: item.text }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='bg-linear-to-br from-tealGreen to-charcoalGray sm:w-50 w-96 z-0 sm:h-50 h-96 rounded-full sm:-bottom-80 bottom-0 blur-400 absolute sm:-left-48 opacity-60'></div>
    </section>
  )
}

export default Perks
