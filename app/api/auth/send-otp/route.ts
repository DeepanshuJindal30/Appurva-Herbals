import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Simple in-memory OTP store (in production, use a real database)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()
const AUTHORIZED_EMAILS = ['deepanshujindal907@gmail.com', 'appurvaherbals@gmail.com']

function emailServiceConfigured() {
  const hasCredentials = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS)
  const hasTransport = Boolean(process.env.SMTP_SERVICE || process.env.SMTP_HOST)
  return hasCredentials && hasTransport
}

async function sendEmail(email: string, otp: string) {
  if (!emailServiceConfigured()) {
    return false
  }

  const transportConfig: Record<string, unknown> = {
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }

  if (process.env.SMTP_SERVICE) {
    transportConfig.service = process.env.SMTP_SERVICE
  } else {
    transportConfig.host = process.env.SMTP_HOST
    transportConfig.port = Number(process.env.SMTP_PORT ?? 587)
    transportConfig.secure = process.env.SMTP_SECURE === 'true'
  }

  const transporter = nodemailer.createTransport(transportConfig)
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
      return NextResponse.json({ error: 'Unauthorized email address' }, { status: 401 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

    otpStore.set(email, { otp, expiresAt })

    let emailSent = false
    let emailError: string | null = null

    try {
      emailSent = await sendEmail(email, otp)
    } catch (error) {
      console.error('OTP email send failed:', error)
      emailError = String(error ?? 'Unknown error')
    }

    if (!emailSent) {
      console.log(`OTP for ${email}: ${otp}`)
    }

    return NextResponse.json({
      success: true,
      emailSent,
      message: emailSent
        ? 'OTP sent to email.'
        : 'OTP not sent. Email service is not configured or failed. Use the preview code below.',
      error: emailSent ? undefined : emailError,
      otp: emailSent ? undefined : otp,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 })
  }
}
