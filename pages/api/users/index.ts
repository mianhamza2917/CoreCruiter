import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { authenticateUser } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get authorization header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  const user = await authenticateUser(token)

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  if (user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Admin access required' })
  }

  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      })

      res.status(200).json(users)
    } catch (error) {
      console.error('Get users error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'POST') {
    try {
      const { email, password, name, role } = req.body

      if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' })
      }

      const hashedPassword = await require('bcryptjs').hash(password, 12)

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: role || 'USER'
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      })

      res.status(201).json(newUser)
    } catch (error) {
      console.error('Create user error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
} 