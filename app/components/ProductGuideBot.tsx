'use client'

import { useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Link,
  Text,
} from '@chakra-ui/react'
import { Bot, Mail, MessageCircle, Phone, Send, X } from 'lucide-react'
import { contact, createSearchText, products } from '@/app/data/products'
import { callHref, emailHref, whatsappHref } from '@/app/utils/contact'

type Message = {
  role: 'bot' | 'user'
  text: string
}

const quickPrompts = [
  'Which product is for cough?',
  'Show liver care',
  'Products for digestion',
  'Contact details',
]

export function ProductGuideBot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Namaste. Ask me about Appurva Herbals products, categories, pack sizes, or contact details. I only use this catalogue.',
    },
  ])

  const productNames = useMemo(() => products.map((product) => product.name).join(', '), [])

  function ask(question: string) {
    const clean = question.trim()
    if (!clean) return

    setMessages((current) => [
      ...current,
      { role: 'user', text: clean },
      { role: 'bot', text: buildBotAnswer(clean) },
    ])
    setInput('')
  }

  return (
    <Box position="fixed" right={{ base: 4, md: 6 }} bottom={{ base: 4, md: 6 }} zIndex={30}>
      {open && (
        <Box w={{ base: 'calc(100vw - 32px)', sm: '390px' }} maxH="min(680px, calc(100vh - 112px))" bg="white" borderWidth="1px" borderColor="blackAlpha.200" borderRadius="20px" boxShadow="2xl" overflow="hidden" mb={3}>
          <Flex align="center" gap={3} bg="#103d2b" color="white" p={4}>
            <Flex w="42px" h="42px" align="center" justify="center" borderRadius="14px" bg="whiteAlpha.200">
              <Bot size={22} />
            </Flex>
            <Box flex="1">
              <Heading size="sm">Product Guide</Heading>
              <Text fontSize="xs" color="whiteAlpha.800">Catalogue-only answers</Text>
            </Box>
            <IconButton aria-label="Close guide" icon={<X size={18} />} size="sm" variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200' }} onClick={() => setOpen(false)} />
          </Flex>

          <Box p={4} overflowY="auto" maxH="390px" bg="#faf8f1">
            {messages.map((message, index) => (
              <Flex key={`${message.role}-${index}`} justify={message.role === 'user' ? 'flex-end' : 'flex-start'} mb={3}>
                <Box maxW="86%" bg={message.role === 'user' ? '#103d2b' : 'white'} color={message.role === 'user' ? 'white' : '#17231d'} borderWidth={message.role === 'bot' ? '1px' : '0'} borderColor="blackAlpha.100" borderRadius="16px" px={4} py={3} boxShadow="sm">
                  <Text fontSize="sm" whiteSpace="pre-line">{message.text}</Text>
                </Box>
              </Flex>
            ))}
          </Box>

          <Box p={4} borderTopWidth="1px" borderColor="blackAlpha.100">
            <Text fontSize="xs" fontWeight="700" color="#103d2b" mb={2}>
              Ask again:
            </Text>
            <Flex gap={2} wrap="wrap" mb={3}>
              {quickPrompts.map((prompt) => (
                <Button key={prompt} size="xs" borderRadius="full" variant="outline" onClick={() => ask(prompt)}>
                  {prompt}
                </Button>
              ))}
            </Flex>

            <Flex gap={2}>
              <Input value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') ask(input) }} placeholder="Ask about cough, liver, skin..." />
              <IconButton aria-label="Send question" icon={<Send size={18} />} bg="#103d2b" color="white" _hover={{ bg: '#0b2c20' }} onClick={() => ask(input)} />
            </Flex>

            <Flex gap={2} mt={3}>
              <Button as={Link} href={whatsappHref()} size="sm" leftIcon={<MessageCircle size={16} />} flex="1" bg="#25d366" color="#082b18" _hover={{ bg: '#21bf5b', textDecoration: 'none' }}>
                WhatsApp
              </Button>
              <Button as={Link} href={callHref()} size="sm" leftIcon={<Phone size={16} />} variant="outline" flex="1" _hover={{ textDecoration: 'none' }}>
                Call
              </Button>
              <Button as={Link} href={emailHref()} size="sm" leftIcon={<Mail size={16} />} variant="outline" flex="1" _hover={{ textDecoration: 'none' }}>
                Email
              </Button>
            </Flex>

            <Text mt={3} fontSize="xs" color="gray.500">
              Products in catalogue: {productNames}. This guide is not medical advice.
            </Text>
          </Box>
        </Box>
      )}

      <Button h="58px" px={5} borderRadius="999px" bg="#103d2b" color="white" boxShadow="2xl" leftIcon={<Bot size={20} />} _hover={{ bg: '#0b2c20', transform: 'translateY(-2px)' }} onClick={() => setOpen((value) => !value)}>
        <Flex align="center" gap={2}>
          Product guide
          <Badge bg="#d3a735" color="#10231d" borderRadius="full">Ask</Badge>
        </Flex>
      </Button>
    </Box>
  )
}

function buildBotAnswer(question: string) {
  const normalized = question.toLowerCase()

  if (/\b(contact|phone|call|email|whatsapp|address|location)\b/.test(normalized)) {
    return `Contact Appurva Herbals:\nPhone/WhatsApp: ${contact.phone}\nEmail: ${contact.email}\nLocation: ${contact.location}`
  }

  const directMatches = products.filter((product) => createSearchText(product).includes(normalized))
  const stopWords = new Set(['which', 'what', 'show', 'product', 'products', 'care', 'for', 'the', 'is', 'are', 'give', 'info', 'details'])
  const keywords = normalized
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length > 2 && !stopWords.has(word))

  const keywordMatches = products
    .map((product) => {
      const text = createSearchText(product)
      const category = product.category.toLowerCase()
      const score = keywords.reduce((total, word) => {
        if (!text.includes(word)) return total
        return total + 1 + (category.includes(word) ? 2 : 0)
      }, 0)

      return { product, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product)
  const matches = directMatches.length ? directMatches : keywordMatches

  if (matches.length > 0) {
    return matches
      .slice(0, 4)
      .map((product) => `${product.name} (${product.pack}, ${product.form})\n${product.short}\nBenefits: ${product.benefits.join(', ')}\nPrice: ${product.price}`)
      .join('\n\n')
      .concat('\n\nPlease confirm suitability, dose and prescribing decision with a qualified medical professional.')
  }

  return `I could not find a catalogue match for "${question}". You can ask about cough, liver, digestion, skin, pain, urinary care, nutrition, oral care, or contact Appurva Herbals at ${contact.phone}.`
}
