import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'
import { products as defaultProducts } from '@/app/data/products'

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json')

async function ensureDataDir() {
  const dir = path.dirname(PRODUCTS_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    console.log('Data dir already exists')
  }
}

interface Product {
  id: string
  name: string
  category: string
  price: string
  form: string
  pack: string
  benefits: string[]
  short: string
  image: string
  audience: string
  accent: string
}

function getDefaultProducts(): Product[] {
  return defaultProducts.map((product, index) => ({
    id: (index + 1).toString(),
    name: product.name,
    category: product.category,
    price: product.price,
    form: product.form,
    pack: product.pack,
    benefits: product.benefits,
    short: product.short,
    image: product.image,
    audience: product.audience,
    accent: product.accent,
  }))
}

function mergeWithDefaults(products: Product[]): Product[] {
  const defaults = getDefaultProducts()
  const byName = new Map<string, Product>()

  for (const product of defaults) {
    byName.set(product.name.toLowerCase(), product)
  }

  for (const product of products) {
    byName.set(product.name.toLowerCase(), product)
  }

  return Array.from(byName.values())
}

async function getProducts() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    const products = JSON.parse(data) as Product[]
    if (!products.length) {
      return getDefaultProducts()
    }
    return mergeWithDefaults(products)
  } catch {
    return getDefaultProducts()
  }
}

async function saveProducts(products: Product[]) {
  await ensureDataDir()
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
}

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const newProduct: Product = await request.json()
    const products = await getProducts()

    const productWithId: Product = {
      ...newProduct,
      id: Date.now().toString(),
    }

    products.push(productWithId)
    await saveProducts(products)

    return NextResponse.json(productWithId, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
