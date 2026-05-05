'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut, Pencil, Plus, Trash2 } from 'lucide-react'

type AdminProduct = {
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

type ProductForm = {
  name: string
  category: string
  price: string
  form: string
  pack: string
  benefits: string
  short: string
  image: string
  audience: string
  accent: string
}

const emptyForm: ProductForm = {
  name: '',
  category: '',
  price: 'MRP on request',
  form: '',
  pack: '',
  benefits: '',
  short: '',
  image: '',
  audience: '',
  accent: 'green',
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const toast = useToast()
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [isLoadingProducts, setIsLoadingProducts] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [error, setError] = useState('')
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      void loadProducts()
    }
  }, [status])

  async function loadProducts() {
    setIsLoadingProducts(true)
    setError('')
    try {
      const response = await fetch('/api/products', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data: AdminProduct[] = await response.json()
      setProducts(data)
    } catch {
      setError('Unable to load products.')
    } finally {
      setIsLoadingProducts(false)
    }
  }

  const isEditing = useMemo(() => Boolean(editingProductId), [editingProductId])

  function resetForm() {
    setEditingProductId(null)
    setForm(emptyForm)
  }

  function fillForm(product: AdminProduct) {
    setEditingProductId(product.id)
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      form: product.form,
      pack: product.pack,
      benefits: product.benefits.join(', '),
      short: product.short,
      image: product.image,
      audience: product.audience,
      accent: product.accent,
    })
  }

  async function handleSave() {
    if (!form.name.trim() || !form.category.trim()) {
      setError('Name and category are required.')
      return
    }

    setIsSaving(true)
    setError('')

    const payload = {
      name: form.name.trim(),
      category: form.category.trim(),
      price: form.price.trim(),
      form: form.form.trim(),
      pack: form.pack.trim(),
      benefits: form.benefits.split(',').map((item) => item.trim()).filter(Boolean),
      short: form.short.trim(),
      image: form.image.trim(),
      audience: form.audience.trim(),
      accent: form.accent.trim() || 'green',
    }

    try {
      const url = isEditing ? `/api/products/${editingProductId}` : '/api/products'
      const method = isEditing ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        throw new Error('Save failed')
      }
      toast({
        title: isEditing ? 'Product updated' : 'Product created',
        status: 'success',
        duration: 2500,
      })
      resetForm()
      await loadProducts()
    } catch {
      setError('Failed to save product.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(productId: string) {
    const ok = window.confirm('Delete this product?')
    if (!ok) return
    try {
      const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
      if (!response.ok) {
        throw new Error('Delete failed')
      }
      toast({
        title: 'Product deleted',
        status: 'success',
        duration: 2500,
      })
      if (editingProductId === productId) {
        resetForm()
      }
      await loadProducts()
    } catch {
      setError('Failed to delete product.')
    }
  }

  async function handleImageFileChange(file: File | null) {
    if (!file) return
    setIsUploadingImage(true)
    setError('')
    try {
      const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = () => reject(new Error('Failed to read image'))
        reader.readAsDataURL(file)
      })
      setForm((prev) => ({ ...prev, image: dataUrl }))
      toast({
        title: 'Image loaded',
        description: 'Image is attached to this product.',
        status: 'success',
        duration: 2000,
      })
    } catch {
      setError('Failed to load image file.')
    } finally {
      setIsUploadingImage(false)
    }
  }

  if (status === 'loading') {
    return (
      <Container maxW="lg" py={20}>
        <VStack spacing={4} align="center">
          <Text>Loading...</Text>
        </VStack>
      </Container>
    )
  }

  if (!session?.user?.email) {
    return null
  }

  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between" align="center">
          <Box>
            <Heading>Admin Dashboard</Heading>
            <Text mt={2} color="gray.600">Welcome, {session.user.email}</Text>
          </Box>
          <Button
            leftIcon={<LogOut size={18} />}
            variant="outline"
            onClick={() =>
              signOut({ callbackUrl: '/admin/login' })
            }
          >
            Sign Out
          </Button>
        </HStack>

        <Box bg="blue.50" p={6} borderRadius="12px">
          <HStack justify="space-between" align="center" mb={4}>
            <Heading size="md">{isEditing ? 'Edit Product' : 'Add Product'}</Heading>
            {isEditing ? (
              <Button size="sm" variant="outline" onClick={resetForm}>
                Cancel Edit
              </Button>
            ) : null}
          </HStack>

          <VStack spacing={3} align="stretch">
            <HStack>
              <Input placeholder="Product name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} />
            </HStack>
            <HStack>
              <Input placeholder="Form (e.g. Syrup)" value={form.form} onChange={(e) => setForm((prev) => ({ ...prev, form: e.target.value }))} />
              <Input placeholder="Pack (e.g. 200 ml)" value={form.pack} onChange={(e) => setForm((prev) => ({ ...prev, pack: e.target.value }))} />
            </HStack>
            <HStack>
              <Input placeholder="Price" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} />
              <Input placeholder="Audience" value={form.audience} onChange={(e) => setForm((prev) => ({ ...prev, audience: e.target.value }))} />
            </HStack>
            <HStack>
              <Input placeholder="Image path (/products/xyz.png)" value={form.image} onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))} />
              <Input placeholder="Accent (green/blue/orange)" value={form.accent} onChange={(e) => setForm((prev) => ({ ...prev, accent: e.target.value }))} />
            </HStack>
            <HStack>
              <Button
                as="label"
                htmlFor="product-image-file"
                variant="outline"
                isLoading={isUploadingImage}
                loadingText="Uploading..."
              >
                Upload Product Image
              </Button>
              <Input
                id="product-image-file"
                type="file"
                accept="image/*"
                display="none"
                onChange={(e) => void handleImageFileChange(e.target.files?.[0] || null)}
              />
              {form.image ? <Text fontSize="sm" color="gray.600">Image attached</Text> : null}
            </HStack>
            <Textarea placeholder="Short description" value={form.short} onChange={(e) => setForm((prev) => ({ ...prev, short: e.target.value }))} />
            <Textarea placeholder="Benefits (comma separated)" value={form.benefits} onChange={(e) => setForm((prev) => ({ ...prev, benefits: e.target.value }))} />
            {error ? <Text color="red.500" fontSize="sm">{error}</Text> : null}
            <Button
              leftIcon={isEditing ? <Pencil size={16} /> : <Plus size={16} />}
              bg="#103d2b"
              color="white"
              onClick={handleSave}
              isLoading={isSaving}
              _hover={{ bg: '#0b2c20' }}
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </Button>
          </VStack>
        </Box>

        <Box bg="green.50" p={6} borderRadius="12px">
          <Heading size="md" mb={4}>Product List</Heading>
          {isLoadingProducts ? (
            <Text color="gray.700">Loading products...</Text>
          ) : (
            <Box overflowX="auto">
              <Table size="sm" variant="simple" bg="white" borderRadius="8px">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Category</Th>
                    <Th>Form</Th>
                    <Th>Pack</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product.id}>
                      <Td>{product.name}</Td>
                      <Td>{product.category}</Td>
                      <Td>{product.form}</Td>
                      <Td>{product.pack}</Td>
                      <Td>{product.price}</Td>
                      <Td>
                        <HStack spacing={2}>
                          <Button size="xs" leftIcon={<Pencil size={14} />} onClick={() => fillForm(product)}>
                            Edit
                          </Button>
                          <Button size="xs" colorScheme="red" leftIcon={<Trash2 size={14} />} onClick={() => handleDelete(product.id)}>
                            Delete
                          </Button>
                        </HStack>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          )}
          <Text mt={3} color="gray.700">{products.length} products available in catalogue</Text>
        </Box>
      </VStack>
    </Container>
  )
}
