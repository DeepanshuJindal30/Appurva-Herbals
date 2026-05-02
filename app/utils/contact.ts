import { contact } from '@/app/data/products'

export function emailHref(subject = 'Appurva Herbals Product Enquiry') {
  return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`
}

export function whatsappHref(message = 'Hello Appurva Herbals, I want product details.') {
  return `${contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export function callHref() {
  return contact.phoneHref
}
