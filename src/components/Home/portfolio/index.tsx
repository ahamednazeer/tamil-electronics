'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

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
    <section className='lg:pt-48 md:pt-32 sm:pt-24 pt-16 min-h-0 sm:min-h-[400px] lg:min-h-[600px]' id='brands'>
      <div className='container px-4 sm:px-6'>
        <motion.div
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className='text-center mb-8 sm:mb-12 lg:mb-16'>
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
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
          {productsData.map((item, index) => (
            <div key={index} className='bg-light_grey/10 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-light_grey/20 transition-all duration-300 group'>
              <div className='relative h-40 sm:h-44 lg:h-48 overflow-hidden'>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='p-4 sm:p-5 lg:p-6'>
                <h4 className='text-white text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2 font-medium'>
                  {item.title}
                </h4>
                <p className='text-muted/60 text-sm sm:text-base'>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Portfolio
