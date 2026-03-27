export default function Loading() {
  return (
    <div className='min-h-screen bg-white dark:bg-[#000510] pt-24 lg:pt-32 pb-16'>
      <div className='container mx-auto px-4'>
        {/* Page Header Skeleton */}
        <div className='flex flex-col items-center text-center mb-16'>
          <div className='w-32 h-6 bg-gray-200 dark:bg-gray-800 rounded-full mb-4 animate-pulse' />
          <div className='w-full max-w-2xl h-12 lg:h-16 bg-gray-200 dark:bg-gray-800 rounded-full mb-6 animate-pulse' />
          <div className='w-full max-w-3xl h-6 lg:h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse' />
        </div>

        <div className='max-w-6xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12'>
            {/* Contact Info Sidebar Skeleton (2 cols) */}
            <div className='lg:col-span-2 space-y-6'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='bg-gray-100 dark:bg-gray-900/40 p-8 rounded-2xl animate-pulse border border-gray-200 dark:border-gray-800'>
                  <div className='flex items-start gap-4'>
                    <div className='w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0' />
                    <div className='w-full pt-2'>
                      <div className='w-1/2 h-5 bg-gray-200 dark:bg-gray-800 rounded-full mb-3' />
                      <div className='w-3/4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full mb-2' />
                      <div className='w-2/3 h-4 bg-gray-200 dark:bg-gray-800 rounded-full' />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form & Map Skeleton (3 cols) */}
            <div className='lg:col-span-3 space-y-8'>
              {/* Form Skeleton */}
              <div className='bg-gray-100 dark:bg-gray-900/40 p-8 sm:p-10 rounded-3xl animate-pulse border border-gray-200 dark:border-gray-800'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
                  <div className='w-full h-14 bg-gray-200 dark:bg-gray-800 rounded-xl' />
                  <div className='w-full h-14 bg-gray-200 dark:bg-gray-800 rounded-xl' />
                </div>
                <div className='w-full h-14 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6' />
                <div className='w-full h-40 bg-gray-200 dark:bg-gray-800 rounded-xl mb-6' />
                <div className='w-full sm:w-48 h-14 bg-gray-200 dark:bg-gray-800 rounded-full' />
              </div>

              {/* Map Skeleton */}
              <div className='w-full h-64 sm:h-80 bg-gray-200 dark:bg-gray-800 rounded-3xl relative overflow-hidden animate-pulse'>
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 mx-[-100%] animate-[shimmer_2s_infinite]' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

