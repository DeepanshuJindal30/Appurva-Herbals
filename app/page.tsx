'use client'

import { type MouseEvent, useEffect, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Tag,
  Text,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { MessageCircle, Menu, PackageCheck, Phone, Search, ShieldCheck, X, Mail } from 'lucide-react'
import { BrandLogo } from '@/app/components/BrandLogo'
import { ProductGuideBot } from '@/app/components/ProductGuideBot'
import { ProductIcon } from '@/app/components/ProductIcons'
import { contact, filterProductList, getCategories, products, type Product } from '@/app/data/products'
import { callHref, emailHref, whatsappHref } from '@/app/utils/contact'
import {
  listenForStoredProductUpdates,
  loadStoredProducts,
} from '@/app/utils/productStore'

export default function Page() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [catalogueProducts, setCatalogueProducts] = useState<Product[]>(products)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const catalogueCategories = useMemo(() => getCategories(catalogueProducts), [catalogueProducts])
  const filteredProducts = useMemo(() => filterProductList(catalogueProducts, query, category), [catalogueProducts, category, query])

  useEffect(() => {
    function refreshCatalogue() {
      setCatalogueProducts(loadStoredProducts(products))
    }

    refreshCatalogue()
    return listenForStoredProductUpdates(refreshCatalogue)
  }, [])

  useEffect(() => {
    if (!catalogueCategories.includes(category)) {
      setCategory('All')
    }
  }, [catalogueCategories, category])

  function viewProduct(product: Product) {
    setSelectedProduct(product)
    onOpen()
  }

  function goToCatalogue(nextCategory = 'All') {
    setCategory(nextCategory)
    document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Box minH="100vh" bg="#f6f2e8" color="#14231b" pb={{ base: 24, md: 0 }}>
      <Box as="header" position="sticky" top={0} zIndex={20} bg="rgba(255, 252, 246, .94)" borderBottomWidth="1px" borderColor="blackAlpha.100" backdropFilter="blur(18px)">
        <Container maxW="7xl" py={2} px={{ base: 3, md: 4 }}>
          <Flex align="center" gap={2}>
            <BrandLogo compact={false} />
            <Flex ml="auto" gap={1} align="center">
              <Button onClick={() => goToCatalogue()} size="sm" display={{ base: 'none', sm: 'inline-flex' }} variant="ghost" _hover={{ bg: 'blackAlpha.50' }}>
                Catalogue
              </Button>
              <Button as={Link} href={callHref()} size="sm" variant="ghost" display={{ base: 'none', md: 'inline-flex' }} _hover={{ textDecoration: 'none', bg: 'blackAlpha.50' }}>
                Call
              </Button>
              <IconButton
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                icon={menuOpen ? <X size={18} /> : <Menu size={18} />}
                variant="outline"
                size="sm"
                display={{ base: 'inline-flex', md: 'none' }}
                onClick={() => setMenuOpen((open) => !open)}
              />
            </Flex>
          </Flex>
          {menuOpen && (
            <Flex mt={2} gap={1} flexWrap="wrap" pb={2}>
              <Button size="xs" variant="ghost" onClick={() => { goToCatalogue(); setMenuOpen(false) }}>Catalogue</Button>
              <Button as={Link} href="#about" size="xs" variant="ghost" onClick={() => setMenuOpen(false)} _hover={{ textDecoration: 'none' }}>About</Button>
              <Button as={Link} href="#contact" size="xs" variant="ghost" onClick={() => setMenuOpen(false)} _hover={{ textDecoration: 'none' }}>Contact</Button>
              <Button as={Link} href={callHref()} size="xs" variant="outline" _hover={{ textDecoration: 'none' }}>Call</Button>
            </Flex>
          )}
          <Flex
            mt={2}
            gap={2}
            overflowX="auto"
            pb={1}
            display={{ base: 'none', md: 'flex' }}
            css={{ '&::-webkit-scrollbar': { display: 'none' } }}
          >
            {catalogueCategories.map((item) => (
              <Button
                key={item}
                size="xs"
                flexShrink={0}
                borderRadius="full"
                variant={category === item ? 'solid' : 'outline'}
                bg={category === item ? '#103d2b' : 'white'}
                color={category === item ? 'white' : '#103d2b'}
                borderColor="green.200"
                onClick={() => goToCatalogue(item)}
                _hover={{ bg: category === item ? '#0b2c20' : 'green.50' }}
              >
                {item === 'All' ? 'All products' : item}
              </Button>
            ))}
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        <Box id="about" scrollMarginTop="72px" bg="radial-gradient(circle at 18% 16%, rgba(211, 167, 53, .30), transparent 28%), radial-gradient(circle at 92% 10%, rgba(47, 123, 89, .24), transparent 30%), linear-gradient(135deg, #fffaf0 0%, #edf5eb 100%)" borderBottomWidth="1px" borderColor="blackAlpha.100">
          <Container maxW="7xl" pt={{ base: 4, md: 14 }} pb={{ base: 6, md: 16 }} px={{ base: 3, md: 4 }}>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 5, lg: 12 }} alignItems="center">
              <Box order={{ base: 2, lg: 1 }}>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Badge bg="white" color="#103d2b" borderWidth="1px" borderColor="green.100" borderRadius="full" px={3} py={1} fontSize="xs">
                  Doctor-ready catalogue
                </Badge>
                <Heading as="h1" mt={3} fontSize={{ base: '28px', sm: '40px', md: '56px' }} lineHeight={{ base: '1.12', md: '1.05' }} letterSpacing="0">
                  Appurva Herbals — clinical catalogue
                </Heading>
                <Text mt={3} fontSize={{ base: 'sm', md: 'lg' }} color="gray.700" maxW="540px" lineHeight="1.5">
                  15 products · photos · pack sizes · instant enquiry
                </Text>

                <Flex mt={5} gap={2} flexDir={{ base: 'column', sm: 'row' }} wrap="wrap">
                  <Button as={Link} href="#catalogue" size={{ base: 'md', md: 'lg' }} bg="#103d2b" color="white" px={6} leftIcon={<Search size={18} />} w={{ base: '100%', sm: 'auto' }} _hover={{ bg: '#0b2c20', textDecoration: 'none' }}>
                    Explore catalogue
                  </Button>
                  <Button as={Link} href={whatsappHref()} size={{ base: 'md', md: 'lg' }} variant="outline" borderColor="green.700" color="#103d2b" leftIcon={<MessageCircle size={18} />} w={{ base: '100%', sm: 'auto' }} _hover={{ bg: 'green.50', textDecoration: 'none' }}>
                    WhatsApp
                  </Button>
                </Flex>

                <SimpleGrid columns={3} gap={2} mt={6} maxW="420px">
                  <Metric label="Products" value={`${catalogueProducts.length}`} />
                  <Metric label="Care areas" value={`${catalogueCategories.length - 1}`} />
                  <Metric label="Guide" value="Live" />
                </SimpleGrid>
                </motion.div>
              </Box>

              <Box order={{ base: 1, lg: 2 }} display="flex" alignItems="center" justifyContent="center">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.55, delay: 0.08 }} style={{ width: '100%', maxWidth: 720 }}>
                <Box w="100%" borderRadius={{ base: '16px', md: '28px' }} overflow="hidden" boxShadow="2xl" bg="white">
                  <Image src="/landing.png" alt="Appurva Herbals product range" w="100%" h="auto" objectFit="contain" />
                </Box>
                </motion.div>
              </Box>
            </Grid>
          </Container>
        </Box>

        <TrustStrip />

        <Box id="catalogue" scrollMarginTop="72px" bg="#fbfaf6" py={{ base: 5, md: 12 }}>
          <Container maxW="7xl" px={{ base: 3, md: 4 }}>
            <Flex justify="space-between" align="center" gap={3} mb={5} flexWrap="wrap">
              <Box>
                <Text color="green.700" fontSize="xs" fontWeight="900" textTransform="uppercase">Catalogue</Text>
                <Heading size={{ base: 'md', md: 'lg' }} mt={1}>Find products fast</Heading>
              </Box>
              <Badge bg="white" color="#103d2b" borderWidth="1px" borderColor="green.100" borderRadius="full" px={3} py={1}>
                {filteredProducts.length} shown
              </Badge>
            </Flex>

            <Box position={{ base: 'static', md: 'sticky' }} top={{ base: 'auto', md: '74px' }} zIndex={12} bg="rgba(251, 250, 246, .94)" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="18px" boxShadow="lg" p={{ base: 3, md: 4 }} mb={6} backdropFilter="blur(14px)">
              <Grid templateColumns={{ base: '1fr', md: '1fr auto' }} gap={{ base: 2, md: 4 }} alignItems="end">
                <Box>
                  <Text fontSize={{ base: '10px', md: 'xs' }} fontWeight="900" color="gray.600" mb={1.5}>SEARCH</Text>
                  <Flex bg="white" borderWidth="1px" borderColor="blackAlpha.200" borderRadius="12px" align="center" px={2.5} py={1.5} h={{ base: '38px', md: '42px' }}>
                    <Search size={16} color="#5f6f66" />
                    <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="cough, liver, skin, protein..." size="sm" border="0" _focusVisible={{ boxShadow: 'none' }} fontSize={{ base: 'sm', md: 'md' }} />
                  </Flex>
                </Box>
                <Button size={{ base: 'sm', md: 'lg' }} variant="outline" onClick={() => { setQuery(''); setCategory('All') }} w={{ base: '100%', md: 'auto' }}>
                  Reset
                </Button>
              </Grid>

              <Flex mt={3} gap={1} flexWrap="wrap">
                <Box flex="1" minW="200px" display={{ base: 'block', md: 'none' }}>
                  <Text fontSize="xs" fontWeight="900" color="gray.600" mb={1.5}>CATEGORY</Text>
                  <Select value={category} onChange={(event) => setCategory(event.target.value)} size="sm" bg="white" borderColor="blackAlpha.200" borderRadius="12px">
                    {catalogueCategories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </Box>
                <Flex gap={1.5} overflowX="auto" pb={1.5} css={{ scrollBehavior: 'smooth', '&::-webkit-scrollbar': { height: '3px' }, '&::-webkit-scrollbar-track': { bg: 'transparent' }, '&::-webkit-scrollbar-thumb': { bg: 'rgba(16, 61, 43, .24)', borderRadius: '999px' } }}>
                  {catalogueCategories.map((item) => {
                    const categoryProduct = item === 'All' ? null : catalogueProducts.find((product) => product.category === item) ?? filterProductList(catalogueProducts, '', item)[0]
                    return (
                      <Button key={item} size={{ base: 'xs', md: 'sm' }} flexShrink={0} borderRadius="full" variant={category === item ? 'solid' : 'outline'} bg={category === item ? '#103d2b' : 'white'} color={category === item ? 'white' : '#103d2b'} borderColor="green.200" leftIcon={categoryProduct ? <ProductIcon iconKey={categoryProduct.iconKey} size={13} /> : <ShieldCheck size={13} />} _hover={{ bg: category === item ? '#0b2c20' : 'green.50' }} onClick={() => setCategory(item)}>
                        {item}
                      </Button>
                    )
                  })}
                </Flex>
              </Flex>
            </Box>

            <Grid templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={{ base: 3, md: 5 }} gridAutoRows="1fr">
              {filteredProducts.map((product) => (
                <ProductCard key={product.name} product={product} onView={() => viewProduct(product)} />
              ))}
            </Grid>

            {filteredProducts.length === 0 && (
              <Center py={20}>
                <Box textAlign="center" bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="16px" p={8}>
                  <Heading size="md">No product found</Heading>
                  <Text mt={2} color="gray.600">Try another product name, benefit or care category.</Text>
                </Box>
              </Center>
            )}
          </Container>
        </Box>

        <ContactSection />
      </Box>

      <Footer />
      <ProductModal product={selectedProduct} isOpen={isOpen} onClose={onClose} />
      <ProductGuideBot products={catalogueProducts} />
    </Box>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Box bg="rgba(255,255,255,.84)" borderWidth="1px" borderColor="white" borderRadius="12px" p={{ base: 2.5, md: 4 }} boxShadow="sm">
      <Text fontSize={{ base: 'lg', md: '2xl' }} fontWeight="900" lineHeight="1">{value}</Text>
      <Text mt={0.5} color="gray.600" fontSize="xs">{label}</Text>
    </Box>
  )
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: 'Catalogue-only', text: 'No false claims' },
    { icon: PackageCheck, title: 'Real photos', text: 'Local images' },
    { icon: MessageCircle, title: 'Fast enquiry', text: 'WhatsApp & call' },
  ]

  return (
    <Box id="doctors" scrollMarginTop="72px" bg="#10251d" color="white" py={4}>
      <Container maxW="7xl" px={{ base: 3, md: 4 }}>
        <Grid templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={3}>
          {items.map((item) => {
            const Icon = item.icon

            return (
              <Flex key={item.title} align="center" gap={3} bg="whiteAlpha.100" borderWidth="1px" borderColor="whiteAlpha.200" borderRadius="14px" p={4}>
                <Center w="48px" h="48px" borderRadius="14px" bg="whiteAlpha.200">
                  <Icon size={22} />
                </Center>
                <Box>
                  <Text fontWeight="900">{item.title}</Text>
                  <Text fontSize="sm" color="whiteAlpha.700">{item.text}</Text>
                </Box>
              </Flex>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}

function ProductCard({ product, onView }: { product: Product; onView: () => void }) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 })

  function handleMove(event: MouseEvent<HTMLDivElement>) {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    setTilt({
      rotateY: ((x / rect.width) - 0.5) * 7,
      rotateX: (0.5 - y / rect.height) * 7,
    })
  }

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} style={{ height: '100%', perspective: '1200px' }}>
    <Box h="100%" onMouseMove={handleMove} onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}>
      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius={{ base: '14px', md: '18px' }} overflow="hidden" boxShadow="sm" transition="box-shadow .18s ease" transform={`rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`} _hover={{ boxShadow: 'lg', borderColor: 'green.200' }} h="100%" display="flex" flexDir="column">
        <Box position="relative" bg={`linear-gradient(145deg, var(--chakra-colors-${product.accent}-50), white)`} aspectRatio="1 / 1" overflow="hidden">
          <ProductVisual product={product} />
          <Badge position="absolute" top={2} left={2} bg="rgba(255,255,255,.94)" color="#103d2b" borderRadius="full" px={2} py={0.5} fontSize="10px" maxW="calc(100% - 1rem)" isTruncated>
            {product.pack}
          </Badge>
        </Box>

        <Box p={{ base: 2.5, md: 4 }} flex="1" display="flex" flexDir="column">
          <Flex align="start" gap={2} minW={0}>
            <Center w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} borderRadius="10px" bg={`${product.accent}.50`} color="#103d2b" flexShrink={0}>
              <ProductIcon iconKey={product.iconKey} size={14} />
            </Center>
            <Box flex="1" minW={0}>
              <Heading size={{ base: 'sm', md: 'md' }} noOfLines={1}>{product.name}</Heading>
              <Text mt={0.5} fontSize="xs" color="gray.500" noOfLines={1}>{product.category}</Text>
            </Box>
          </Flex>

          <Text mt={2} color="gray.700" fontSize="xs" noOfLines={2} flex="1">{product.short}</Text>

          <Button mt={3} bg="#103d2b" color="white" size="sm" w="100%" _hover={{ bg: '#0b2c20' }} onClick={onView}>
            View details
          </Button>
        </Box>
      </Box>
    </Box>
    </motion.div>
  )
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <Box position="relative" w="100%" h="100%" overflow="hidden" bg="white" display="flex" alignItems="center" justifyContent="center" p={{ base: 2, md: 4 }}>
      <Image
        src={product.image}
        alt={product.name}
        maxW="100%"
        maxH="100%"
        objectFit="contain"
        filter="saturate(1.05) contrast(1.05)"
      />
    </Box>
  )
}

function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: '6xl' }} isCentered scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent borderRadius={{ base: 0, md: '18px' }} overflow="hidden" bg="#fffdf8" mx={{ base: 0, md: 4 }} my={{ base: 0, md: 4 }} maxH={{ base: '100dvh', md: '92vh' }}>
        <ModalCloseButton />
        <ModalHeader borderBottomWidth="1px" borderColor="blackAlpha.100" py={3}>
          <Flex align="center" gap={2} wrap="wrap">
            <Center w="36px" h="36px" borderRadius="12px" bg={`${product.accent}.50`} color="#103d2b">
              <ProductIcon iconKey={product.iconKey} size={16} />
            </Center>
            <Heading size="md" noOfLines={1}>{product.name}</Heading>
            <Badge colorScheme={product.accent} borderRadius="full">{product.category}</Badge>
          </Flex>
        </ModalHeader>
        <ModalBody p={{ base: 3, md: 6 }}>
          <Grid templateColumns={{ base: '1fr', md: '0.9fr 1.1fr' }} gap={{ base: 4, md: 6 }}>
            <Box borderRadius="16px" overflow="hidden" bg="white" boxShadow="xl" minH={{ base: '240px', md: '480px' }}>
              <ProductVisual product={product} />
            </Box>
            <Box>
              <Flex gap={2} wrap="wrap" mb={3}>
                <Tag size="sm">{product.form}</Tag>
                <Tag size="sm">{product.pack}</Tag>
                <Tag size="sm">{product.audience}</Tag>
                {product.flavor && product.flavor !== '-' && <Tag size="sm">{product.flavor}</Tag>}
              </Flex>
              <Heading size={{ base: 'lg', md: 'xl' }}>{product.name}</Heading>
              {product.hindi && (
                <Text mt={1} fontSize="sm" color="gray.500">{product.hindi}</Text>
              )}
              {(product.tagline || product.localName) && (
                <Text mt={2} fontSize={{ base: 'sm', md: 'md' }} color="gray.700" fontWeight="600">
                  {product.tagline || product.localName}
                </Text>
              )}
              <Text mt={3} fontSize={{ base: 'sm', md: 'md' }} color="gray.600">
                {product.short}
              </Text>
              <Text mt={3} fontSize={{ base: 'sm', md: 'md' }} color="gray.700" lineHeight="1.6">
                {product.details}
              </Text>

              <Box mt={5}>
                <Text fontWeight="900" mb={3} fontSize="sm" textTransform="uppercase" letterSpacing="0.06em" color="gray.600">
                  Key benefits
                </Text>
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={2}>
                  {product.benefits.map((benefit) => (
                    <Box key={benefit} borderWidth="1px" borderColor="blackAlpha.100" borderRadius="12px" p={3} bg="white">
                      <Text fontWeight="700" fontSize="sm">{benefit}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>

              {product.useCases && product.useCases.length > 0 && (
                <Box mt={5}>
                  <Text fontWeight="900" mb={3} fontSize="sm" textTransform="uppercase" letterSpacing="0.06em" color="gray.600">
                    Use cases
                  </Text>
                  <Flex gap={2} wrap="wrap">
                    {product.useCases.map((useCase) => (
                      <Tag key={useCase} size="sm" borderRadius="full" bg="green.50" color="green.900">
                        {useCase}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              )}

              {product.dosage && (
                <Box mt={5}>
                  <Text fontWeight="900" mb={2} fontSize="sm" textTransform="uppercase" letterSpacing="0.06em" color="gray.600">
                    Dosage
                  </Text>
                  <Text fontSize="sm" color="gray.700">{product.dosage}</Text>
                </Box>
              )}

              {product.ingredients && product.ingredients.length > 0 && (
                <Box mt={5}>
                  <Text fontWeight="900" mb={2} fontSize="sm" textTransform="uppercase" letterSpacing="0.06em" color="gray.600">
                    Key ingredients
                  </Text>
                  <Text fontSize="sm" color="gray.600" lineHeight="1.6">
                    {product.ingredients.join(' · ')}
                  </Text>
                </Box>
              )}

              <Grid mt={5} templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={2}>
                <InfoTile label="Pack" value={product.pack} />
                <InfoTile label="Form" value={product.form} />
                <InfoTile label="Price" value={product.price} />
              </Grid>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter gap={2} borderTopWidth="1px" borderColor="blackAlpha.100" flexWrap="wrap" py={3}>
          <Button as={Link} href={emailHref(`Enquiry for ${product.name}`)} leftIcon={<Mail size={16} />} bg="#103d2b" color="white" flex={{ base: '1 1 100%', sm: '0 0 auto' }} _hover={{ bg: '#0b2c20', textDecoration: 'none' }}>
            Email
          </Button>
          <Button as={Link} href={whatsappHref(`Hello Appurva Herbals, I want details for ${product.name}.`)} leftIcon={<MessageCircle size={16} />} bg="#25d366" color="#062b17" flex={{ base: '1 1 100%', sm: '0 0 auto' }} _hover={{ bg: '#21bf5b', textDecoration: 'none' }}>
            WhatsApp
          </Button>
          <Button as={Link} href={callHref()} leftIcon={<Phone size={16} />} variant="outline" flex={{ base: '1 1 45%', sm: '0 0 auto' }} _hover={{ textDecoration: 'none' }}>
            Call
          </Button>
          <Button variant="outline" onClick={onClose} flex={{ base: '1 1 45%', sm: '0 0 auto' }}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="12px" p={3}>
      <Text fontSize="xs" color="gray.500" fontWeight="900">{label}</Text>
      <Text mt={1} fontWeight="800" fontSize="sm">{value}</Text>
    </Box>
  )
}


function ContactSection() {
  return (
    <Box id="contact" scrollMarginTop="72px" bg="#173d31" color="white" py={{ base: 8, md: 14 }}>
      <Container maxW="7xl" px={{ base: 3, md: 4 }}>
        <Grid templateColumns={{ base: '1fr', md: '1.2fr .8fr' }} gap={6} alignItems="center">
          <Box>
            <Badge bg="whiteAlpha.200" color="white" borderRadius="full" px={3} py={1} mb={3} fontSize="xs">Enquiry</Badge>
            <Heading size={{ base: 'md', md: 'lg' }}>Doctors, clinics & distributors</Heading>
            <Text mt={2} color="whiteAlpha.800" fontSize="sm" maxW="520px">
              WhatsApp or call for pricing, samples & availability.
            </Text>
          </Box>
          <Flex gap={2} flexDir={{ base: 'column', sm: 'row' }} wrap="wrap">
            <Button as={Link} href={whatsappHref()} size="md" leftIcon={<MessageCircle size={18} />} bg="#25d366" color="#062b17" w={{ base: '100%', sm: 'auto' }} _hover={{ bg: '#21bf5b', textDecoration: 'none' }}>
              WhatsApp
            </Button>
            <Button as={Link} href={callHref()} size="md" leftIcon={<Phone size={18} />} variant="outline" color="white" borderColor="whiteAlpha.500" w={{ base: '100%', sm: 'auto' }} _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>
              Call
            </Button>
          </Flex>
        </Grid>
      </Container>
    </Box>
  )
}

function Footer() {
  return (
    <Box as="footer" bg="#0b1d16" color="whiteAlpha.800" py={6} pb={{ base: 24, md: 6 }}>
      <Container maxW="7xl">
        <Flex align={{ base: 'start', md: 'center' }} gap={4} flexDir={{ base: 'column', md: 'row' }}>
          <BrandLogo compact />
          <Box>
            <Text fontWeight="900" color="white">Appurva Herbals</Text>
            <Text fontSize="sm">
              {contact.location} | {contact.email} | {contact.phone}
            </Text>
            <Text mt={1} fontSize="xs" color="whiteAlpha.600">
              Product information is catalogue-only and based on packaging text. Prescribing decisions, dosage and suitability should be handled by qualified medical professionals.
            </Text>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
