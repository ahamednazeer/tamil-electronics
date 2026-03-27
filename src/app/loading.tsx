export default function Loading() {
  return (
    <div className='min-h-screen bg-white dark:bg-[#000510]'>
      {/* Hero Skeleton (Banner height) */}
      <div className='w-full h-[60vh] sm:h-[80vh] bg-gray-200 dark:bg-gray-800 animate-pulse relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 mx-[-100%] animate-[shimmer_2s_infinite]' />
        
        {/* Hero Content Skeletons */}
        <div className='absolute inset-0 flex flex-col justify-center items-center px-4'>
          <div className='w-48 h-8 sm:w-64 sm:h-10 bg-gray-300 dark:bg-gray-700 rounded-full mb-6' />
          <div className='w-full max-w-3xl h-16 sm:h-24 bg-gray-300 dark:bg-gray-700 rounded-2xl mb-6' />
          <div className='w-full max-w-xl h-6 sm:h-8 bg-gray-300 dark:bg-gray-700 rounded-full mb-10' />
          <div className='flex gap-4'>
            <div className='w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-full' />
            <div className='w-40 h-12 bg-gray-300 dark:bg-gray-700 rounded-full' />
          </div>
        </div>
      </div>

      {/* Services/Categories Skeleton Grid */}
      <div className='container mx-auto px-4 py-16 lg:py-24'>
        {/* Section Title Skeleton */}
        <div className='flex flex-col items-center mb-12'>
          <div className='w-32 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 animate-pulse' />
          <div className='w-64 sm:w-96 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
        </div>

        {/* 3-Column Grid Skeleton */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className='bg-gray-100 dark:bg-gray-900/50 rounded-2xl p-6 sm:p-8 h-80 animate-pulse border border-gray-200 dark:border-gray-800'>
              <div className='w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-6' />
              <div className='w-3/4 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4' />
              <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-3' />
              <div className='w-full h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-3' />
              <div className='w-2/3 h-4 bg-gray-200 dark:bg-gray-800 rounded-full' />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

