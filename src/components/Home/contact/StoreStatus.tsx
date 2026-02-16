'use client'

import { useEffect, useState } from 'react'
import { storeInfo } from '@/data/storeInfo'
import { useLanguage } from '@/context/LanguageContext'

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const getNowInTimeZone = () => {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: storeInfo.timezone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
  const parts = formatter.formatToParts(new Date())
  const weekday = parts.find((part) => part.type === 'weekday')?.value ?? 'Sun'
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? '0')
  const minute = Number(parts.find((part) => part.type === 'minute')?.value ?? '0')
  const dayIndex = dayMap.indexOf(weekday)
  return { dayIndex, minutes: hour * 60 + minute }
}

const StoreStatus = () => {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateStatus = () => {
      const { dayIndex, minutes } = getNowInTimeZone()
      if (storeInfo.closedDays.includes(dayIndex)) {
        setIsOpen(false)
        return
      }
      const todayHours = storeInfo.hours.find((hour) => hour.day === dayIndex)
      if (!todayHours) {
        setIsOpen(false)
        return
      }
      const opensAt = getMinutes(todayHours.opens)
      const closesAt = getMinutes(todayHours.closes)
      setIsOpen(minutes >= opensAt && minutes < closesAt)
    }

    updateStatus()
    const interval = window.setInterval(updateStatus, 60000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold ${
        isOpen
          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-200'
          : 'bg-rose-500/15 text-rose-700 dark:text-rose-200'
      }`}
      aria-live='polite'>
      <span
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      />
      {isOpen ? t('store.open_now') : t('store.closed_now')}
    </span>
  )
}

export default StoreStatus
