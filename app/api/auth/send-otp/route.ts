import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory OTP store (in production, use a real database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    const AUTHORIZED_EMAILS = ['deepanshujindal907@gmail.com', 'appurvaherbals@gmail.com']
    if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

    otpStore.set(email, { otp, expiresAt })

    // In production, send this via email service (SendGrid, Nodemailer, etc.)
    console.log(`OTP for ${email}: ${otp}`)

    return NextResponse.json({
      success: true,
      message: 'OTP sent to email',
      // For development only - remove in production
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
