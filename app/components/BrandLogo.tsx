import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  const showWordmark = !compact
  return (
    <Flex align="center" gap={2} minW={0}>
      <Image
        src="/Appurva Herbals WebLogo.png"
        alt="Appurva Herbals logo"
        boxSize={compact ? '36px' : { base: '40px', md: '52px' }}
        objectFit="contain"
        flexShrink={0}
      />
      {showWordmark && (
        <Box minW={0} display={{ base: compact ? 'none' : 'block', sm: 'block' }}>
          <Heading size={{ base: 'sm', md: 'md' }} letterSpacing="0" noOfLines={1}>
            Appurva Herbals
          </Heading>
          <Text fontSize="xs" color="gray.600" display={{ base: 'none', md: 'block' }}>
            Clinical product catalogue
          </Text>
        </Box>
      )}
    </Flex>
  )
}
