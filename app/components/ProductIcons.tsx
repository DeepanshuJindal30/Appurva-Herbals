import type { ProductIconKey } from '@/app/data/products'
import {
  Activity,
  Apple,
  Bone,
  Droplets,
  HeartPulse,
  Leaf,
  ShieldPlus,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from 'lucide-react'

const icons: Record<ProductIconKey, LucideIcon> = {
  nutrition: Apple,
  liver: ShieldPlus,
  digestive: Activity,
  respiratory: Stethoscope,
  urinary: Droplets,
  pain: Bone,
  women: HeartPulse,
  skin: Sparkles,
  oral: Smile,
}

export function ProductIcon({ iconKey, size = 18 }: { iconKey: ProductIconKey; size?: number }) {
  const Icon = icons[iconKey] ?? Leaf
  return <Icon aria-hidden size={size} strokeWidth={2.2} />
}
