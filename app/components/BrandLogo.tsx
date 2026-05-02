import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Flex align="center" gap={3}>
      <Box as="svg" width={compact ? '40px' : '52px'} height={compact ? '40px' : '52px'} viewBox="0 0 64 64" role="img" aria-label="Appurva Herbals logo">
        <defs>
          <linearGradient id="ahLeaf" x1="8" x2="56" y1="54" y2="8" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f3f2b" />
            <stop offset=".62" stopColor="#2f855a" />
            <stop offset="1" stopColor="#d3a735" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="18" fill="#103d2b" />
        <path d="M47.5 13.4c-13.8.7-25.7 9.9-28.7 22.7 9.3-5.6 17.7-7.6 27.1-7.1-5.9 2.1-12.7 6.2-19.3 13.6 12.1 1.3 24.5-8.5 24.9-23.7.1-2.2-1.6-5.6-4-5.5Z" fill="url(#ahLeaf)" />
        <path d="M18.3 45.7c7.9-10.9 16.3-17.7 28.2-22.2" fill="none" stroke="#fff7df" strokeLinecap="round" strokeWidth="3" />
        <text x="14" y="45" fill="#fff7df" fontFamily="Georgia, serif" fontSize="22" fontWeight="700">AH</text>
      </Box>
      {!compact && (
        <Box>
          <Heading size="md" letterSpacing="0">Appurva Herbals</Heading>
          <Text fontSize="xs" color="gray.600">Clinical product catalogue</Text>
        </Box>
      )}
    </Flex>
  )
}
