export default function Loading() {
  return (
    <div className='min-h-screen bg-white dark:bg-[#000510] pt-24 lg:pt-32 pb-16'>
      <div className='container mx-auto px-4'>
        {/* Page Header Skeleton */}
        <div className='flex flex-col items-center text-center mb-16 sm:mb-24'>
          <div className='w-32 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 animate-pulse' />
          <div className='w-full max-w-2xl h-12 lg:h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 animate-pulse' />
          <div className='w-full max-w-3xl h-6 lg:h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
        </div>

        {/* Content Section Skeleton */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24'>
          {/* Left Text Skeleton */}
          <div className='space-y-6'>
            <div className='w-3/4 h-10 lg:h-12 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
            <div className='w-5/6 h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
            <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mt-8' />
            <div className='w-4/5 h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
            
            {/* Stats/Features Skeleton */}
            <div className='grid grid-cols-2 gap-6 mt-10'>
              {[...Array(4)].map((_, i) => (
                <div key={i} className='bg-gray-100 dark:bg-gray-900/40 p-6 rounded-2xl animate-pulse'>
                  <div className='w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full mb-4' />
                  <div className='w-3/4 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-2' />
                  <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full' />
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Skeleton */}
          <div className='relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800 animate-pulse'>
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 mx-[-100%] animate-[shimmer_2s_infinite]' />
          </div>
        </div>
      </div>
    </div>
  )
}

