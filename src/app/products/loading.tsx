export default function Loading() {
  return (
    <div className='min-h-screen bg-white dark:bg-[#000510] pt-24 lg:pt-32 pb-16'>
      <div className='container mx-auto px-4'>
        {/* Page Header Skeleton */}
        <div className='flex flex-col items-center text-center mb-16'>
          <div className='w-full max-w-2xl h-12 lg:h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 animate-pulse' />
          <div className='w-full max-w-3xl h-6 lg:h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
        </div>

        {/* Product Filters/Tabs Skeleton */}
        <div className='flex justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 flex-wrap'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='w-24 sm:w-32 h-10 sm:h-12 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
          ))}
        </div>

        {/* Products Grid Skeleton */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
          {[...Array(12)].map((_, i) => (
            <div key={i} className='bg-gray-100 dark:bg-gray-900/40 rounded-2xl overflow-hidden animate-pulse border border-gray-200 dark:border-gray-800'>
              {/* Product Image Skeleton */}
              <div className='w-full aspect-square bg-gray-200 dark:bg-gray-800 relative overflow-hidden'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 mx-[-100%] animate-[shimmer_2s_infinite]' />
              </div>
              
              {/* Product Info Skeleton */}
              <div className='p-5 sm:p-6'>
                <div className='w-1/3 h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-3' />
                <div className='w-3/4 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4' />
                <div className='w-full h-10 bg-gray-200 dark:bg-gray-800 rounded-xl mt-4' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

