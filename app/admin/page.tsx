'use client'

import { Box, Button, Container, Heading, useToast, VStack, HStack, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, useDisclosure, Input, Textarea, Select, Badge, Table, Thead, Tbody, Tr, Th, Td, IconButton, Spinner, Center } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2, Trash2, Plus, LogOut } from 'lucide-react'

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

const CATEGORIES = ['Nutrition', 'Liver Care', 'Digestive Care', 'Respiratory Care', 'Urinary Care', 'Pain Relief', 'Women\'s Health', 'Skin Care', 'Oral Care']

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const toast = useToast()
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({})

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    const email = localStorage.getItem('adminEmail')
    
    if (!token || !email) {
      router.push('/admin/login')
      return
    }

    setIsAuthorized(true)
    fetchProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch products', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminEmail')
    router.push('/admin/login')
  }

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData(product)
    onOpen()
  }

  const handleOpenNew = () => {
    setEditingProduct(null)
    setFormData({
      name: '',
      category: '',
      price: 'MRP on request',
      form: '',
      pack: '',
      benefits: [],
      short: '',
      image: '',
      audience: '',
      accent: 'green',
    })
    onOpen()
  }

  const handleSave = async () => {
    if (!formData.name || !formData.category) {
      toast({ title: 'Please fill required fields', status: 'warning' })
      return
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        fetchProducts()
        onClose()
        toast({ title: editingProduct ? 'Product updated' : 'Product created', status: 'success' })
      } else {
        toast({ title: 'Error', status: 'error' })
      }
    } catch {
      toast({ title: 'Error saving product', status: 'error' })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return

    try {
      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' })
      if (response.ok) {
        fetchProducts()
        toast({ title: 'Product deleted', status: 'success' })
      }
    } catch {
      toast({ title: 'Error deleting product', status: 'error' })
    }
  }

  if (!isAuthorized) {
    return (
      <Center minH="100vh">
        <Spinner />
      </Center>
    )
  }

  return (
    <Container maxW="7xl" py={6}>
      <HStack justify="space-between" mb={8}>
        <Heading>Product Management</Heading>
        <HStack>
          <Button bg="#103d2b" color="white" leftIcon={<Plus size={18} />} onClick={handleOpenNew} _hover={{ bg: '#0b2c20' }}>
            New Product
          </Button>
          <IconButton aria-label="Logout" icon={<LogOut size={18} />} onClick={handleLogout} variant="outline" />
        </HStack>
      </HStack>

      {loading ? (
        <Center minH="400px">
          <Spinner />
        </Center>
      ) : (
        <Box overflowX="auto" boxShadow="sm" borderRadius="12px" borderWidth="1px" borderColor="blackAlpha.100">
          <Table>
            <Thead bg="gray.50">
              <Tr>
                <Th>Product Name</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Form</Th>
                <Th>Audience</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id} _hover={{ bg: 'gray.50' }}>
                  <Td fontWeight="600">{product.name}</Td>
                  <Td>
                    <Badge colorScheme="green">{product.category}</Badge>
                  </Td>
                  <Td>{product.price}</Td>
                  <Td>{product.form}</Td>
                  <Td fontSize="sm" color="gray.600">{product.audience}</Td>
                  <Td textAlign="center">
                    <HStack justify="center">
                      <IconButton
                        aria-label="Edit"
                        icon={<Edit2 size={16} />}
                        size="sm"
                        variant="outline"
                        onClick={() => handleOpenEdit(product)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<Trash2 size={16} />}
                        size="sm"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Edit/Add Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingProduct ? 'Edit Product' : 'Add New Product'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Product Name *</Text>
                <Input
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., AP FIT"
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Category *</Text>
                <Select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </Select>
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Form</Text>
                <Input
                  value={formData.form || ''}
                  onChange={(e) => setFormData({ ...formData, form: e.target.value })}
                  placeholder="e.g., Powder, Capsule"
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Pack</Text>
                <Input
                  value={formData.pack || ''}
                  onChange={(e) => setFormData({ ...formData, pack: e.target.value })}
                  placeholder="e.g., 250g"
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Price</Text>
                <Input
                  value={formData.price || ''}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="MRP on request"
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Audience</Text>
                <Input
                  value={formData.audience || ''}
                  onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                  placeholder="e.g., Doctors & Clinics"
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Short Description</Text>
                <Textarea
                  value={formData.short || ''}
                  onChange={(e) => setFormData({ ...formData, short: e.target.value })}
                  placeholder="Brief description"
                  rows={3}
                />
              </Box>

              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Image Path</Text>
                <Input
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/products/AP-FIT.png"
                />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button bg="#103d2b" color="white" onClick={handleSave} _hover={{ bg: '#0b2c20' }}>
                {editingProduct ? 'Update' : 'Create'}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  )
}
