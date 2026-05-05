'use client'

import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminLogin() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user?.email) {
      router.push('/admin')
    }
  }, [session, router])

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

        <Button
          w="100%"
          bg="#103d2b"
          color="white"
          size="lg"
          onClick={() => signIn('google', { callbackUrl: '/admin' })}
          _hover={{ bg: '#0b2c20' }}
        >
          Sign in with Google
        </Button>

        <Box fontSize="sm" color="gray.600" textAlign="center" bg="blue.50" p={4} borderRadius="12px">
          <Text fontWeight="600">Authorized Email Addresses:</Text>
          <Text mt={2}>deepanshujindal907@gmail.com</Text>
          <Text>appurvaherbals@gmail.com</Text>
        </Box>
      </VStack>
    </Container>
  )
}
