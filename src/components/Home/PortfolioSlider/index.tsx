'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const portfolioImages = [
    { src: '/images/portfolio/image1.webp', alt: 'Electrical wiring and PVC pipes installation project in Virudhachalam' },
    { src: '/images/portfolio/image2.webp', alt: 'Premium LED lighting and chandelier setup for home' },
    { src: '/images/portfolio/image3.webp', alt: 'Commercial switchgear and MCB distribution board' },
    { src: '/images/portfolio/image4.webp', alt: 'Finolex and RR Kabel wire bundles display at Tamil Electricals' },
    { src: '/images/portfolio/image5.webp', alt: 'High quality ceiling fans and exhaust fans collection' },
    { src: '/images/portfolio/image6.webp', alt: 'Bathroom plumbing fittings and Ashirvad CPVC pipes' },
    { src: '/images/portfolio/image7.webp', alt: 'V-Guard stabilizers and water heaters installation' },
    { src: '/images/portfolio/image8.webp', alt: 'Agricultural water pumps and motors by Suguna and Crompton' },
    { src: '/images/portfolio/image9.webp', alt: 'Modular switches and sockets from GM and Legrand' },
    { src: '/images/portfolio/image10.webp', alt: 'Complete electrical and plumbing materials supplied by Tamil Electricals' },
];

const PortfolioSlider = () => {
    const { t } = useLanguage();
    return (
        <section id='gallery' className='pb-6 sm:pb-8 lg:pb-10 relative'>
            <div className='container px-4 sm:px-6 relative z-2'>
                <div className='text-center mb-4 sm:mb-6'>
                    <p className="text-muted text-lg sm:text-xl lg:text-28 mb-3 sm:mb-4 pb-4 sm:pb-6 relative after:content-[''] after:w-8 after:h-0.5 after:bg-primary after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2">
                        {t('portfolio_slider.subheading_start')} <span className='text-primary'>{t('portfolio_slider.subheading_highlight')}</span>
                    </p>
                    <h2 className='text-theme text-2xl sm:text-3xl lg:text-4xl font-medium'>
                        {t('portfolio_slider.title_start')} <span className='text-primary'>{t('portfolio_slider.title_highlight')}</span> {t('portfolio_slider.title_end')}
                    </h2>
                </div>

                <div className='flex items-center gap-6 overflow-hidden fade-mask-soft'>
                    {/* Inner container for the scrolling animation - using inline styles for reliability */}
                    <div
                        className='flex items-center gap-6 w-max animate-scroll'
                    >
                        {[...portfolioImages, ...portfolioImages].map((item, index) => (
                            <div
                                key={index}
                                className='relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] group hover:scale-[1.02] transition-transform duration-300'
                            >
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    loading='lazy'
                                    className='object-cover'
                                    sizes="(max-width: 640px) 280px, 350px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PortfolioSlider;
