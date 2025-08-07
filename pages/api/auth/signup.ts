import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { hashPassword, generateToken } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email, password, name, phone, company, position, experienceLevel, location } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone: phone || null,
        company: company || null,
        position: position || null,
        experienceLevel: experienceLevel || null,
        location: location || null,
        role: 'USER'
      }
    })

    // Generate token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        company: user.company,
        position: user.position,
        experienceLevel: user.experienceLevel,
        location: user.location,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
} 