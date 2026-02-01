import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

const brandsData = [
  { name: 'Finolex', logo: '/images/brands/Finolex_logo_header.svg' },
  { name: 'Havells', logo: '/images/brands/Havells_Logo.svg' },
  { name: 'Orient', logo: '/images/brands/Orient_Logo_2x_906fb550-c200-42e5-b9e7-f6375c0bcdab.avif' },
  { name: 'Crompton', logo: '/images/brands/crompton-greaves-logo.webp' },
  { name: 'Polycab', logo: '/images/brands/logo-gradient-trans.png' },
]

const CardSlider = () => {
  const settings = {
    autoplay: true,
    dots: false,
    arrows: false,
    infinite: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3, // Increased from 2 to 3 for better proportion
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 4, // Increased from 3 to 4
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className='mt-8 sm:mt-16 lg:mt-20 pt-6 sm:pt-8 lg:pt-10'>
      <p className='text-muted text-center mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-base lg:text-lg'>
        Trusted Brands We Carry
      </p>
      <Slider {...settings}>
        {brandsData.map((item, index) => (
          <div key={index} className='px-1 sm:px-3'>
            <div className='px-2 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-5 bg-white rounded-lg sm:rounded-xl flex items-center justify-center h-12 sm:h-20 lg:h-24'>
              <Image
                src={item.logo}
                alt={item.name}
                width={120}
                height={50}
                className='object-contain max-h-6 sm:max-h-10 lg:max-h-14 w-auto'
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default CardSlider
