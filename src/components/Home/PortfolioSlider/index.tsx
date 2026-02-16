'use client';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const portfolioImages = [
    '/images/portfolio/image1.jpeg',
    '/images/portfolio/image2.jpeg',
    '/images/portfolio/image3.jpeg',
    '/images/portfolio/image4.jpeg',
    '/images/portfolio/image5.jpeg',
    '/images/portfolio/image6.jpeg',
    '/images/portfolio/image7.jpeg',
    '/images/portfolio/image8.jpeg',
    '/images/portfolio/image9.jpeg',
    '/images/portfolio/image10.jpeg',
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
                    <h2 className='text-white dark:text-white text-2xl sm:text-3xl lg:text-4xl font-medium perks-title'>
                        {t('portfolio_slider.title_start')} <span className='text-primary'>{t('portfolio_slider.title_highlight')}</span> {t('portfolio_slider.title_end')}
                    </h2>
                </div>

                <div className='flex items-center gap-6 overflow-hidden fade-mask-soft'>
                    {/* Inner container for the scrolling animation - using inline styles for reliability */}
                    <div
                        className='flex items-center gap-6 w-max animate-scroll'
                        style={{
                            animation: 'scroll 40s linear infinite'
                        }}
                    >
                        {[...portfolioImages, ...portfolioImages].map((src, index) => (
                            <div
                                key={index}
                                className='relative w-[280px] h-[200px] sm:w-[350px] sm:h-[250px] flex-shrink-0 rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.06)] group hover:scale-[1.02] transition-transform duration-300'
                            >
                                <Image
                                    src={src}
                                    alt={`Portfolio Image ${index % portfolioImages.length + 1}`}
                                    fill
                                    className='object-cover'
                                    sizes="(max-width: 640px) 280px, 350px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Inline styles related to this component only */}
            <style jsx global>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .fade-mask-soft {
                    mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
                    -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
                }
            `}</style>


        </section>
    );
};

export default PortfolioSlider;
