import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET || 'my-super-secret-jwt-key-2024'
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const secret = process.env.JWT_SECRET || 'my-super-secret-jwt-key-2024'
    return jwt.verify(token, secret) as JWTPayload
  } catch (error) {
    return null
  }
}

export const authenticateUser = async (token: string) => {
  const payload = verifyToken(token)
  if (!payload) return null

  const user = await prisma.user.findUnique({
    where: { id: payload.userId }
  })

  return user
} 