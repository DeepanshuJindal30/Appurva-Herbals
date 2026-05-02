'use client'

import { type MouseEvent, useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  IconButton,
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
} from '@chakra-ui/react'
import type { BoxProps } from '@chakra-ui/react'
import { Mail, MessageCircle, PackageCheck, Phone, Search, ShieldCheck } from 'lucide-react'
import { BrandLogo } from '@/app/components/BrandLogo'
import { ProductGuideBot } from '@/app/components/ProductGuideBot'
import { ProductIcon } from '@/app/components/ProductIcons'
import { categories, contact, featuredProducts, filterProducts, type Product } from '@/app/data/products'
import { callHref, emailHref, whatsappHref } from '@/app/utils/contact'

export default function Page() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const filteredProducts = useMemo(() => filterProducts(query, category), [category, query])

  function viewProduct(product: Product) {
    setSelectedProduct(product)
    onOpen()
  }

  return (
    <Box minH="100vh" bg="#f6f2e8" color="#14231b">
      <Box as="header" position="sticky" top={0} zIndex={20} bg="rgba(255, 252, 246, .9)" borderBottomWidth="1px" borderColor="blackAlpha.100" backdropFilter="blur(18px)">
        <Container maxW="7xl" py={3}>
          <Flex align="center" gap={4}>
            <BrandLogo />
            <Flex ml="auto" gap={2} display={{ base: 'none', md: 'flex' }} align="center">
              <Text fontSize="sm" color="gray.600">{contact.location} | {contact.phone}</Text>
              <Button as={Link} href="#catalogue" size="sm" variant="ghost" _hover={{ textDecoration: 'none', bg: 'blackAlpha.50' }}>Products</Button>
              <Button as={Link} href={whatsappHref()} size="sm" leftIcon={<MessageCircle size={16} />} bg="#103d2b" color="white" _hover={{ bg: '#0b2c20', textDecoration: 'none' }}>WhatsApp</Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      <Box as="main">
        <Box bg="radial-gradient(circle at 18% 16%, rgba(211, 167, 53, .30), transparent 28%), radial-gradient(circle at 92% 10%, rgba(47, 123, 89, .24), transparent 30%), linear-gradient(135deg, #fffaf0 0%, #edf5eb 100%)" borderBottomWidth="1px" borderColor="blackAlpha.100">
          <Container maxW="7xl" pt={{ base: 9, md: 14 }} pb={{ base: 10, md: 16 }}>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: 8, lg: 12 }} alignItems="center">
              <Box>
                <Badge bg="white" color="#103d2b" borderWidth="1px" borderColor="green.100" borderRadius="full" px={4} py={2} boxShadow="sm">
                  Doctor-ready herbal product catalogue
                </Badge>
                <Heading as="h1" mt={5} fontSize={{ base: '42px', md: '68px' }} lineHeight=".98" maxW="840px" letterSpacing="0">
                  Appurva Herbals products, ready for clinical conversations.
                </Heading>
                <Text mt={5} fontSize={{ base: 'md', md: 'xl' }} color="gray.700" maxW="740px">
                  Browse product photos, care categories, pack sizes, positioning and enquiry actions in a polished offline catalogue built for doctors, clinics and distributors.
                </Text>

                <Flex mt={7} gap={3} wrap="wrap">
                  <Button as={Link} href="#catalogue" size="lg" bg="#103d2b" color="white" px={8} leftIcon={<Search size={18} />} _hover={{ bg: '#0b2c20', textDecoration: 'none' }}>
                    Explore catalogue
                  </Button>
                  <Button as={Link} href={emailHref('Appurva Herbals Price List Request')} size="lg" variant="outline" borderColor="green.700" color="#103d2b" leftIcon={<Mail size={18} />} _hover={{ bg: 'green.50', textDecoration: 'none' }}>
                    Request price list
                  </Button>
                  <Button as={Link} href={callHref()} size="lg" variant="outline" borderColor="green.700" color="#103d2b" leftIcon={<Phone size={18} />} _hover={{ bg: 'green.50', textDecoration: 'none' }}>
                    Call
                  </Button>
                </Flex>
                <Text mt={4} color="gray.700" fontWeight="700">
                  {contact.location} | {contact.phone} | {contact.email}
                </Text>

                <SimpleGrid columns={{ base: 2, md: 4 }} gap={3} mt={9} maxW="780px">
                  <Metric label="Products" value="16" />
                  <Metric label="Care areas" value={`${categories.length - 1}`} />
                  <Metric label="Images" value="Local" />
                  <Metric label="Guide bot" value="Ready" />
                </SimpleGrid>
              </Box>

              <Box minH={{ base: '430px', md: '620px' }} position="relative">
                <HeroPhoto product={featuredProducts[1]} left={{ base: '0', md: '6%' }} top={{ base: '4%', md: '0' }} w={{ base: '58%', md: '52%' }} h={{ base: '330px', md: '470px' }} rotate="-5deg" />
                <HeroPhoto product={featuredProducts[0]} right={{ base: '0', md: '5%' }} top={{ base: '18%', md: '12%' }} w={{ base: '52%', md: '45%' }} h={{ base: '310px', md: '440px' }} rotate="4deg" />
                <HeroPhoto product={featuredProducts[2]} left={{ base: '23%', md: '27%' }} bottom={{ base: '0', md: '4%' }} w={{ base: '54%', md: '44%' }} h={{ base: '255px', md: '330px' }} />
                <Box position="absolute" right={{ base: '3%', md: '0' }} bottom={{ base: '16px', md: '46px' }} bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="18px" boxShadow="xl" p={4} maxW="310px">
                  <Text fontSize="xs" color="green.700" textTransform="uppercase" fontWeight="900">Search-first workflow</Text>
                  <Text mt={1} fontWeight="800">Find products by care area, inspect details, then call, WhatsApp or email instantly.</Text>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>

        <TrustStrip />

        <Box id="catalogue" bg="#fbfaf6" py={{ base: 8, md: 12 }}>
          <Container maxW="7xl">
            <Flex justify="space-between" align={{ base: 'start', md: 'end' }} gap={4} flexDir={{ base: 'column', md: 'row' }} mb={6}>
              <Box>
                <Text color="green.700" fontSize="sm" fontWeight="900" textTransform="uppercase">Product catalogue</Text>
                <Heading size="xl" mt={1}>Find the right product faster</Heading>
                <Text mt={2} color="gray.600">Search product names, care areas, benefits or pack types.</Text>
              </Box>
              <Badge bg="white" color="#103d2b" borderWidth="1px" borderColor="green.100" borderRadius="full" px={4} py={2}>
                {filteredProducts.length} visible
              </Badge>
            </Flex>

            <Box position="sticky" top="74px" zIndex={12} bg="rgba(251, 250, 246, .94)" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="18px" boxShadow="lg" p={3} mb={6} backdropFilter="blur(14px)">
              <Grid templateColumns={{ base: '1fr', lg: '1fr 270px auto' }} gap={3} alignItems="end">
                <Box>
                  <Text fontSize="xs" fontWeight="900" color="gray.600" mb={2}>SEARCH</Text>
                  <Flex bg="white" borderWidth="1px" borderColor="blackAlpha.200" borderRadius="10px" align="center" px={3}>
                    <Search size={18} color="#5f6f66" />
                    <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try cough, liver, skin, protein, AP-Zyme..." size="lg" border="0" _focusVisible={{ boxShadow: 'none' }} />
                  </Flex>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="900" color="gray.600" mb={2}>CATEGORY</Text>
                  <Select value={category} onChange={(event) => setCategory(event.target.value)} size="lg" bg="white" borderColor="blackAlpha.200">
                    {categories.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </Select>
                </Box>
                <Button size="lg" variant="outline" onClick={() => { setQuery(''); setCategory('All') }}>
                  Reset
                </Button>
              </Grid>

              <Flex gap={2} mt={3} overflowX="auto" pb={1}>
                {categories.map((item) => {
                  const categoryProduct = item === 'All' ? null : featuredProducts.find((product) => product.category === item) ?? filterProducts('', item)[0]
                  return (
                    <Button key={item} size="sm" flexShrink={0} borderRadius="full" variant={category === item ? 'solid' : 'outline'} bg={category === item ? '#103d2b' : 'white'} color={category === item ? 'white' : '#103d2b'} borderColor="green.200" leftIcon={categoryProduct ? <ProductIcon iconKey={categoryProduct.iconKey} size={15} /> : <ShieldCheck size={15} />} _hover={{ bg: category === item ? '#0b2c20' : 'green.50' }} onClick={() => setCategory(item)}>
                      {item}
                    </Button>
                  )
                })}
              </Flex>
            </Box>

            <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={5}>
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
      <ProductGuideBot />
    </Box>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <Box bg="rgba(255,255,255,.84)" borderWidth="1px" borderColor="white" borderRadius="14px" p={4} boxShadow="sm">
      <Text fontSize="2xl" fontWeight="900" lineHeight="1">{value}</Text>
      <Text mt={1} color="gray.600" fontSize="sm">{label}</Text>
    </Box>
  )
}

type HeroPhotoProps = BoxProps & {
  product: Product
  rotate?: string
}

function HeroPhoto({ product, rotate = '0deg', ...position }: HeroPhotoProps) {
  return (
    <Box position="absolute" borderRadius="28px" overflow="hidden" boxShadow="2xl" transform={`rotate(${rotate})`} bg="white" {...position}>
      <ProductVisual product={product} />
    </Box>
  )
}

function TrustStrip() {
  const items = [
    { icon: ShieldCheck, title: 'Catalogue-only info', text: 'No invented medical claims' },
    { icon: PackageCheck, title: 'Local product photos', text: 'Works without database dependency' },
    { icon: MessageCircle, title: 'Fast enquiry', text: 'WhatsApp, call and email actions' },
  ]

  return (
    <Box bg="#10251d" color="white" py={5}>
      <Container maxW="7xl">
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
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
    <Box style={{ perspective: '1200px' }} onMouseMove={handleMove} onMouseLeave={() => setTilt({ rotateX: 0, rotateY: 0 })}>
      <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="18px" overflow="hidden" boxShadow="sm" transition="transform .16s ease, box-shadow .18s ease, border-color .18s ease" transform={`rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateY(${tilt.rotateX || tilt.rotateY ? '-5px' : '0'})`} style={{ transformStyle: 'preserve-3d' }} _hover={{ boxShadow: '2xl', borderColor: 'green.200' }}>
        <Box position="relative" bg={`linear-gradient(145deg, var(--chakra-colors-${product.accent}-50), white)`} aspectRatio="4 / 5" overflow="hidden">
          <Box position="absolute" inset="18px" borderRadius="18px" bg="rgba(255,255,255,.48)" boxShadow="inset 0 0 38px rgba(22,63,46,.10)" />
          <ProductVisual product={product} />
          <Badge position="absolute" top={3} left={3} bg="rgba(255,255,255,.94)" color="#103d2b" borderRadius="full" px={3} py={1} boxShadow="sm">
            {product.pack}
          </Badge>
          <Badge position="absolute" bottom={3} right={3} bg="rgba(16,61,43,.92)" color="white" borderRadius="full" px={3} py={1} boxShadow="sm">
            Inspect
          </Badge>
        </Box>

        <Box p={4} transform="translateZ(22px)">
          <Flex align="start" gap={3}>
            <Center w="42px" h="42px" borderRadius="14px" bg={`${product.accent}.50`} color="#103d2b" flexShrink={0}>
              <ProductIcon iconKey={product.iconKey} />
            </Center>
            <Box flex="1">
              <Heading size="md">{product.name}</Heading>
              <Text mt={1} fontSize="sm" color="gray.500">{product.audience}</Text>
            </Box>
            <Tag colorScheme={product.accent} borderRadius="full">{product.form}</Tag>
          </Flex>

          <Text mt={3} color="gray.700" minH="72px">{product.short}</Text>
          <Flex mt={3} gap={2} wrap="wrap">
            <Tag size="sm" bg="gray.50">{product.category}</Tag>
            <Tag size="sm" bg="green.50" color="green.800">{product.benefits[0]}</Tag>
          </Flex>

          <Divider my={4} />
          <Flex align="center" gap={2}>
            <Box>
              <Text fontSize="xs" color="gray.500" fontWeight="700">PRICE</Text>
              <Text fontWeight="900">{product.price}</Text>
            </Box>
            <IconButton as={Link} href={whatsappHref(`Hello Appurva Herbals, I want details for ${product.name}.`)} aria-label={`WhatsApp for ${product.name}`} icon={<MessageCircle size={17} />} ml="auto" bg="#e7f8ee" color="#0a6b36" _hover={{ bg: '#d3f1df', textDecoration: 'none' }} />
            <IconButton as={Link} href={callHref()} aria-label="Call Appurva Herbals" icon={<Phone size={17} />} variant="outline" _hover={{ textDecoration: 'none' }} />
            <Button bg="#103d2b" color="white" _hover={{ bg: '#0b2c20' }} onClick={onView}>
              Details
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

function ProductVisual({ product }: { product: Product }) {
  return (
    <Box position="relative" w="100%" h="100%" overflow="hidden">
      <Image src={product.image} alt={product.name} position="absolute" inset={0} w="100%" h="100%" objectFit="cover" objectPosition={product.imagePosition ?? '50% 45%'} transform={`scale(${product.imageScale ?? 1.08})`} transformOrigin={product.imagePosition ?? '50% 45%'} filter="saturate(1.06) contrast(1.03)" />
      <Box position="absolute" inset={0} bg="linear-gradient(180deg, transparent 62%, rgba(0,0,0,.18))" pointerEvents="none" />
    </Box>
  )
}

function ProductModal({ product, isOpen, onClose }: { product: Product | null; isOpen: boolean; onClose: () => void }) {
  if (!product) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
      <ModalContent borderRadius="18px" overflow="hidden" bg="#fffdf8">
        <ModalCloseButton />
        <ModalHeader borderBottomWidth="1px" borderColor="blackAlpha.100">
          <Flex align="center" gap={3} wrap="wrap">
            <Center w="44px" h="44px" borderRadius="14px" bg={`${product.accent}.50`} color="#103d2b">
              <ProductIcon iconKey={product.iconKey} />
            </Center>
            <Heading size="lg">{product.name}</Heading>
            <Badge colorScheme={product.accent} borderRadius="full" px={3}>{product.category}</Badge>
          </Flex>
        </ModalHeader>
        <ModalBody p={{ base: 4, md: 6 }}>
          <Grid templateColumns={{ base: '1fr', md: '.9fr 1.1fr' }} gap={6}>
            <Box borderRadius="16px" overflow="hidden" bg={`${product.accent}.50`} boxShadow="lg" minH={{ base: '420px', md: '650px' }} position="relative">
              <ProductVisual product={product} />
            </Box>
            <Box>
              <Flex gap={2} wrap="wrap" mb={4}>
                <Tag>{product.form}</Tag>
                <Tag>{product.pack}</Tag>
                <Tag>{product.audience}</Tag>
              </Flex>
              <Heading size="xl">{product.name}</Heading>
              <Text mt={4} fontSize="lg" color="gray.700">{product.details}</Text>

              <Box mt={6}>
                <Text fontWeight="900" mb={3}>Key benefits / positioning</Text>
                <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)' }} gap={3}>
                  {product.benefits.map((benefit) => (
                    <Box key={benefit} borderWidth="1px" borderColor="blackAlpha.100" borderRadius="12px" p={4} bg="white">
                      <Text fontWeight="800">{benefit}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>

              <Grid mt={6} templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }} gap={3}>
                <InfoTile label="Pack" value={product.pack} />
                <InfoTile label="Form" value={product.form} />
                <InfoTile label="Price" value={product.price} />
              </Grid>
            </Box>
          </Grid>
        </ModalBody>
        <ModalFooter gap={3} borderTopWidth="1px" borderColor="blackAlpha.100" flexWrap="wrap">
          <Button as={Link} href={emailHref(`Enquiry for ${product.name}`)} leftIcon={<Mail size={17} />} bg="#103d2b" color="white" _hover={{ bg: '#0b2c20', textDecoration: 'none' }}>
            Email
          </Button>
          <Button as={Link} href={whatsappHref(`Hello Appurva Herbals, I want details for ${product.name}.`)} leftIcon={<MessageCircle size={17} />} bg="#25d366" color="#062b17" _hover={{ bg: '#21bf5b', textDecoration: 'none' }}>
            WhatsApp
          </Button>
          <Button as={Link} href={callHref()} leftIcon={<Phone size={17} />} variant="outline" _hover={{ textDecoration: 'none' }}>
            Call
          </Button>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <Box bg="white" borderWidth="1px" borderColor="blackAlpha.100" borderRadius="12px" p={4}>
      <Text fontSize="xs" color="gray.500" fontWeight="900">{label}</Text>
      <Text mt={1} fontWeight="900">{value}</Text>
    </Box>
  )
}

function ContactSection() {
  return (
    <Box bg="#173d31" color="white" py={{ base: 10, md: 14 }}>
      <Container maxW="7xl">
        <Grid templateColumns={{ base: '1fr', md: '1.2fr .8fr' }} gap={8} alignItems="center">
          <Box>
            <Badge bg="whiteAlpha.200" color="white" borderRadius="full" px={3} py={1} mb={4}>Enquiry ready</Badge>
            <Heading size="xl">Built for doctors, clinics and distributor meetings.</Heading>
            <Text mt={3} color="whiteAlpha.800" maxW="760px">
              Review the catalogue, shortlist products by care area, and contact Appurva Herbals directly for pricing, samples or availability.
            </Text>
          </Box>
          <Flex gap={3} justify={{ base: 'flex-start', md: 'flex-end' }} wrap="wrap">
            <Button as={Link} href={emailHref()} size="lg" leftIcon={<Mail size={18} />} bg="#d3a735" color="#17211c" _hover={{ bg: '#c99b26', textDecoration: 'none' }}>
              Email enquiry
            </Button>
            <Button as={Link} href={whatsappHref()} size="lg" leftIcon={<MessageCircle size={18} />} variant="outline" color="white" borderColor="whiteAlpha.500" _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>
              WhatsApp
            </Button>
            <Button as={Link} href={callHref()} size="lg" leftIcon={<Phone size={18} />} variant="outline" color="white" borderColor="whiteAlpha.500" _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>
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
