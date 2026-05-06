import type { Product } from '@/app/data/products'

export type StoredProduct = Product & { id: string }

const STORAGE_KEY = 'appurva-products-v1'
const hiddenProductNames = new Set(['ap-fit energy drink'])

function isVisibleProduct(product: Product) {
  return !hiddenProductNames.has(product.name.trim().toLowerCase())
}

export function productIdFromName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || `product-${Date.now()}`
}

export function withProductIds(products: Product[]): StoredProduct[] {
  return products
    .filter(isVisibleProduct)
    .map((product, index) => ({
      ...product,
      id: (product as StoredProduct).id || productIdFromName(product.name) || `product-${index + 1}`,
    }))
}

export function loadStoredProducts(defaultProducts: Product[]): StoredProduct[] {
  if (typeof window === 'undefined') {
    return withProductIds(defaultProducts)
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return withProductIds(defaultProducts)
    }

    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return withProductIds(defaultProducts)
    }

    return withProductIds(parsed as Product[])
  } catch {
    return withProductIds(defaultProducts)
  }
}

export function saveStoredProducts(products: StoredProduct[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withProductIds(products)))
}
