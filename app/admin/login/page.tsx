'use client'

import { Box, Button, Container, Heading, Input, Text, VStack } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLogin() {
  const { data: session } = useSession()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (session?.user?.email) {
      router.push('/admin')
    }
  }, [session, router])

  const handleLogin = async () => {
    setIsLoading(true)
    setError('')

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/admin',
    })

    setIsLoading(false)

    if (result?.ok) {
      router.push('/admin')
      return
    }

    setError('Invalid email or password.')
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading mb={2}>Admin Portal</Heading>
          <Text color="gray.600">Appurva Herbals Product Management</Text>
          <Text mt={4} fontSize="sm" color="gray.500">
            Authorized doctors and clinic staff only
          </Text>
        </Box>

        <VStack spacing={4} align="stretch">
          <Input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            w="100%"
            bg="#103d2b"
            color="white"
            size="lg"
            isLoading={isLoading}
            onClick={handleLogin}
            _hover={{ bg: '#0b2c20' }}
          >
            Sign in to Admin
          </Button>
          {error ? (
            <Text color="red.500" fontSize="sm" textAlign="center">
              {error}
            </Text>
          ) : null}
        </VStack>

        <Box fontSize="sm" color="gray.600" textAlign="center" bg="blue.50" p={4} borderRadius="12px">
          <Text fontWeight="600">Authorized Email Addresses:</Text>
          <Text mt={2}>deepanshujindal907@gmail.com</Text>
          <Text>appurvaherbals@gmail.com</Text>
          <Text mt={3} color="gray.700">
            Use password: Appurva@2026
          </Text>
        </Box>
      </VStack>
    </Container>
  )
}
