'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const productsData = [
  {
    image: '/images/products/led-lights.png',
    title: 'LED Lights',
    description: 'Energy-efficient lighting solutions for homes and businesses.',
  },
  {
    image: '/images/products/wires-cables.png',
    title: 'Wires & Cables',
    description: 'High-quality wiring materials for safe electrical connections.',
  },
  {
    image: '/images/products/switch-boards.png',
    title: 'Switch Boards',
    description: 'Modern and durable switch solutions.',
  },
  {
    image: '/images/products/fans.png',
    title: 'Fans & Appliances',
    description: 'Ceiling fans and essential electrical appliances.',
  },
  {
    image: '/images/products/mcb.png',
    title: 'MCB & Accessories',
    description: 'Circuit protection and safety devices.',
  },
  {
    image: '/images/products/pipes.png',
    title: 'Electrical Pipes & Fittings',
    description: 'Complete wiring support materials.',
  },
]

const Portfolio = () => {
  return (
    <section className='lg:pt-10 md:pt-8 sm:pt-6 pt-6 min-h-0 overflow-hidden' id='brands'>
      <div className='container px-4 sm:px-6'>
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-4 sm:mb-6 lg:mb-8'>
          <p className='text-lg sm:text-xl lg:text-28 text-muted mb-2 sm:mb-4'>
            Our <span className='text-primary'>Products</span>
          </p>
          <h2 className='text-white text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 font-medium px-2'>
            Quality Electrical Materials for{' '}
            <span className='text-primary'>Every Need</span>
          </h2>
          <p className='text-muted/60 text-sm sm:text-base lg:text-lg px-4'>
            We provide a wide range of electrical products from trusted brands.
          </p>
        </motion.div>

        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Navigation, Autoplay]}
            className="mySwiper !pb-12 !px-4 fade-mask"
          >
            {productsData.map((item, index) => (
              <SwiperSlide key={index} className="!w-[280px] sm:!w-[350px] lg:!w-[400px] !h-auto">
                <div className='bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full flex flex-col group'>
                  <div className='relative h-60 sm:h-72 w-full overflow-hidden'>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent flex items-end p-4">
                      <span className="text-white/90 text-sm font-medium">@tamilelectricals</span>
                    </div>
                  </div>
                  <div className='p-6 flex-1 flex flex-col justify-center bg-white'>
                    <h4 className='text-charcoalGray text-xl font-bold mb-3'>
                      {item.title}
                    </h4>
                    <p className='text-charcoalGray/70 text-base leading-relaxed'>
                      {item.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #fff !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--color-primary) !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
        }
        .swiper-slide {
            transition: transform 0.3s;
        }
        .swiper-slide-active {
            transform: scale(1.05);
        }
        .swiper-slide:not(.swiper-slide-active) {
            transform: scale(0.95);
            opacity: 0.8;
        }
        /* Fade Mask Effect */
        .fade-mask {
            mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 3%, black 97%, transparent);
        }
      `}</style>
    </section>
  )
}

export default Portfolio
