import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory OTP store (in production, use a real database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()
const AUTHORIZED_EMAILS = ['deepanshujindal907@gmail.com', 'appurvaherbals@gmail.com']

async function sendEmail(email: string, otp: string) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return false
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Your Appurva Herbals admin OTP',
    text: `Your Appurva Herbals admin OTP is ${otp}. It expires in 15 minutes.`,
    html: `<p>Your Appurva Herbals admin OTP is <strong>${otp}</strong>.</p><p>It expires in 15 minutes.</p>`,
  })
  return true
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!AUTHORIZED_EMAILS.includes(email.toLowerCase())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

    otpStore.set(email, { otp, expiresAt })

    let emailSent = false
    try {
      emailSent = await sendEmail(email, otp)
    } catch (error) {
      console.error('OTP email send failed:', error)
    }

    if (!emailSent) {
      console.log(`OTP for ${email}: ${otp}`)
    }

    return NextResponse.json({
      success: true,
      message: emailSent ? 'OTP sent to email' : 'OTP generated; email service not configured. Use the preview code.',
      otp: emailSent ? undefined : otp,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
