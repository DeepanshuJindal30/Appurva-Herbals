'use client'

import { Box, Button, Container, Heading, Input, Text, VStack, useToast, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const AUTHORIZED_EMAILS = ['deepanshujindal907@gmail.com', 'appurvaherbals@gmail.com']

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<'email' | 'verify'>('email')
  const [otp, setOtp] = useState('')
  const toast = useToast()
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({ title: 'Please enter your email', status: 'error' })
      return
    }

    if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
      toast({ title: 'Unauthorized email', description: 'This email is not authorized for admin access.', status: 'error' })
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setStep('verify')
        toast({ title: 'OTP sent', description: 'Check your email for verification code.', status: 'success' })
      } else {
        toast({ title: 'Error', description: 'Failed to send OTP', status: 'error' })
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Something went wrong', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (otp.length !== 6) {
      toast({ title: 'Invalid OTP', description: 'OTP must be 6 digits', status: 'error' })
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('adminToken', data.token)
        localStorage.setItem('adminEmail', email)
        toast({ title: 'Login successful', status: 'success' })
        router.push('/admin')
      } else {
        toast({ title: 'Invalid OTP', status: 'error' })
      }
    } catch {
      toast({ title: 'Error', description: 'Verification failed', status: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxW="md" py={20}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading mb={2}>Admin Portal</Heading>
          <Text color="gray.600">Appurva Herbals Product Management</Text>
        </Box>

        {step === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Email Address</Text>
                <Input
                  placeholder="deepanshujindal907@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  isDisabled={loading}
                  size="lg"
                  borderRadius="12px"
                />
              </Box>
              <Button
                type="submit"
                w="100%"
                bg="#103d2b"
                color="white"
                size="lg"
                isLoading={loading}
                _hover={{ bg: '#0b2c20' }}
              >
                Send OTP
              </Button>
            </VStack>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <VStack spacing={4}>
              <Box w="100%">
                <Text mb={2} fontWeight="600" fontSize="sm">Verification Code</Text>
                <Input
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  type="text"
                  maxLength={6}
                  isDisabled={loading}
                  size="lg"
                  borderRadius="12px"
                  textAlign="center"
                  letterSpacing="2px"
                  fontSize="lg"
                  fontWeight="700"
                />
              </Box>
              <VStack spacing={2} w="100%">
                <Button
                  type="submit"
                  w="100%"
                  bg="#103d2b"
                  color="white"
                  size="lg"
                  isLoading={loading}
                  _hover={{ bg: '#0b2c20' }}
                >
                  Verify & Login
                </Button>
                <Button
                  variant="outline"
                  w="100%"
                  onClick={() => {
                    setStep('email')
                    setOtp('')
                  }}
                >
                  Back
                </Button>
              </VStack>
            </VStack>
          </form>
        )}

        <Box fontSize="sm" color="gray.500" textAlign="center">
          <Text>Authorized emails only</Text>
        </Box>
      </VStack>
    </Container>
  )
}
