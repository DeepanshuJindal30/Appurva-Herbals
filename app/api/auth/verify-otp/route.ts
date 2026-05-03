import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Simple in-memory OTP store
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json()

    const stored = otpStore.get(email)
    if (!stored) {
      return NextResponse.json({ error: 'No OTP requested for this email' }, { status: 400 })
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email)
      return NextResponse.json({ error: 'OTP expired' }, { status: 400 })
    }

    if (stored.otp !== otp) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 })
    }

    otpStore.delete(email)

    // Generate JWT token
    const token = jwt.sign(
      { email, iat: Date.now() },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      success: true,
      token,
      message: 'Login successful',
    })
  } catch {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
