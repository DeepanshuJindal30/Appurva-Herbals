import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const PRODUCTS_FILE = path.join(process.cwd(), 'data', 'products.json')

async function ensureDataDir() {
  const dir = path.dirname(PRODUCTS_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {
    console.log('Data dir already exists')
  }
}

async function getProducts() {
  try {
    await ensureDataDir()
    const data = await fs.readFile(PRODUCTS_FILE, 'utf-8')
    return JSON.parse(data) as Product[]
  } catch {
    // Return default products if file doesn't exist
    return [
      {
        id: '1',
        name: 'AP FIT',
        category: 'Nutrition',
        price: 'MRP on request',
        form: 'Powder',
        pack: '250g',
        benefits: ['Fitness', 'Energy'],
        short: 'Premium fitness supplement for optimal performance',
        image: '/products/AP-FIT.png',
        audience: 'Athletes & Fitness Enthusiasts',
        accent: 'green',
      },
    ]
  }
}

async function saveProducts(products: Product[]) {
  await ensureDataDir()
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2))
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
