import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const AUTHORIZED_EMAILS = [
  'deepanshujindal907@gmail.com',
  'appurvaherbals@gmail.com',
]

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Appurva@2026'

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Admin Login',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim()
        const password = credentials?.password

        if (!email || !password) {
          return null
        }

        if (!AUTHORIZED_EMAILS.includes(email)) {
          return null
        }

        if (password !== ADMIN_PASSWORD) {
          return null
        }

        return {
          id: email,
          email,
          name: 'Admin',
        }
      },
    }),
  ],
  callbacks: {    
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
