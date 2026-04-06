'use client'

import { useEffect, useState } from 'react'
import { storeInfo } from '@/data/storeInfo'
import { useLanguage } from '@/context/LanguageContext'

const dayMap = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const getMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const isOpenForHours = (opens: string, closes: string, minutes: number) => {
  const opensAt = getMinutes(opens)
  const closesAt = getMinutes(closes)
  if (closesAt <= opensAt) {
    return minutes >= opensAt || minutes < closesAt
  }
  return minutes >= opensAt && minutes < closesAt
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
      if (todayHours && isOpenForHours(todayHours.opens, todayHours.closes, minutes)) {
        setIsOpen(true)
        return
      }

      const prevDayIndex = (dayIndex + 6) % 7
      if (storeInfo.closedDays.includes(prevDayIndex)) {
        setIsOpen(false)
        return
      }

      const prevHours = storeInfo.hours.find((hour) => hour.day === prevDayIndex)
      if (prevHours) {
        const opensAt = getMinutes(prevHours.opens)
        const closesAt = getMinutes(prevHours.closes)
        if (closesAt <= opensAt && minutes < closesAt) {
          setIsOpen(true)
          return
        }
      }

      setIsOpen(false)
    }

    updateStatus()
    const interval = window.setInterval(updateStatus, 60000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <span
      className={`store-status ${isOpen ? 'store-status--open' : 'store-status--closed'}`}
      aria-live='polite'>
      <span className='store-status__dot' />
      {isOpen ? t('store.open_now') : t('store.closed_now')}
    </span>
  )
}

export default StoreStatus
