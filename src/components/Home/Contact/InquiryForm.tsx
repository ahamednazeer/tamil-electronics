'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { storeInfo } from '@/data/storeInfo'

const InquiryForm = () => {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    product: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = `${t('contact.form_labels.name')}: ${form.name}\n${
      t('contact.form_labels.phone')
    }: ${form.phone}\n${t('contact.form_labels.product')}: ${form.product}`
    const url = `https://wa.me/${storeInfo.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`
    window.open(url, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  useEffect(() => {
    if (!submitted) return
    const timer = window.setTimeout(() => setSubmitted(false), 4000)
    return () => window.clearTimeout(timer)
  }, [submitted])

  return (
    <form
      onSubmit={handleSubmit}
      className='surface-card rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 h-full'>
      <h3 className='text-theme text-xl sm:text-2xl font-semibold mb-2'>
        {t('contact.form_title')}
      </h3>
      <p className='text-muted/70 text-sm sm:text-base mb-5'>
        {t('contact.form_description')}
      </p>
      <div className='grid grid-cols-1 gap-4'>
        <label className='flex flex-col gap-2 text-sm text-muted/70'>
          {t('contact.form_labels.name')}
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            required
            autoComplete='name'
            placeholder={t('contact.form_placeholders.name')}
            className='form-input'
          />
        </label>
        <label className='flex flex-col gap-2 text-sm text-muted/70'>
          {t('contact.form_labels.phone')}
          <input
            type='tel'
            name='phone'
            value={form.phone}
            onChange={handleChange}
            required
            inputMode='tel'
            autoComplete='tel'
            pattern='[0-9+ ]{7,15}'
            placeholder={t('contact.form_placeholders.phone')}
            className='form-input'
          />
        </label>
        <label className='flex flex-col gap-2 text-sm text-muted/70'>
          {t('contact.form_labels.product')}
          <input
            type='text'
            name='product'
            value={form.product}
            onChange={handleChange}
            required
            autoComplete='off'
            placeholder={t('contact.form_placeholders.product')}
            className='form-input'
          />
        </label>
      </div>
      <div className='mt-6 flex flex-col sm:flex-row gap-3'>
        <button
          type='submit'
          className='btn btn-primary flex-1 py-3 px-5'>
          {t('contact.form_submit')}
        </button>
        <a
          href={`tel:${storeInfo.phoneE164}`}
          className='btn btn-outline flex-1 py-3 px-5 text-center'>
          {t('contact.form_call')}
        </a>
      </div>
      <p className='text-xs text-muted/60 mt-4'>
        {t('contact.form_note')}
      </p>
      {submitted && (
        <p className='text-xs text-emerald-500 mt-2' aria-live='polite'>
          {t('contact.form_success')}
        </p>
      )}
    </form>
  )
}

export default InquiryForm
