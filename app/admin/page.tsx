'use client'

import { Box, Button, Container, Heading, VStack, HStack, Text } from '@chakra-ui/react'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

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
    <Container maxW="2xl" py={8}>
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
          <Heading size="md">Product Management</Heading>
          <Text mt={4} color="gray.700">
            Admin panel under development. Product management features coming soon.
          </Text>
        </Box>

        <Box bg="green.50" p={6} borderRadius="12px">
          <Heading size="md">Quick Stats</Heading>
          <Text mt={4} color="gray.700">15 products available in catalogue</Text>
        </Box>
      </VStack>
    </Container>
  )
}
