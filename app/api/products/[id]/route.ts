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

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const updatedData: Product = await request.json()
    const products = await getProducts()

    const index = products.findIndex((p: Product) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    products[index] = { ...products[index], ...updatedData, id }
    await saveProducts(products)

    return NextResponse.json(products[index])
  } catch {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const products = await getProducts()

    const index = products.findIndex((p: Product) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    const deleted = products.splice(index, 1)
    await saveProducts(products)

    return NextResponse.json({ success: true, deleted: deleted[0] })
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}

