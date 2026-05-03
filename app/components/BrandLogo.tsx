import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Flex align="center" gap={3}>
      <Image
        src="/Appurva Herbals WebLogo.png"
        alt="Appurva Herbals logo"
        boxSize={compact ? '40px' : '52px'}
        objectFit="contain"
      />
      {!compact && (
        <Box>
          <Heading size="md" letterSpacing="0">Appurva Herbals</Heading>
          <Text fontSize="xs" color="gray.600">Clinical product catalogue</Text>
        </Box>
      )}
    </Flex>
  )
}
