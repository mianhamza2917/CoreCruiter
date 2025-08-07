import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { authenticateUser } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' })
  }

  // Authenticate the user
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  const authenticatedUser = await authenticateUser(token)

  if (!authenticatedUser) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check if user is trying to access their own data or is admin
  if (authenticatedUser.id !== id && authenticatedUser.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          company: true,
          position: true,
          experienceLevel: true,
          location: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      })

      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      res.status(200).json({ user })
    } catch (error) {
      console.error('Get user error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { phone, company, position, experienceLevel, location } = req.body

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          phone: phone || null,
          company: company || null,
          position: position || null,
          experienceLevel: experienceLevel || null,
          location: location || null
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          company: true,
          position: true,
          experienceLevel: true,
          location: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      })

      res.status(200).json({
        message: 'User updated successfully',
        user: updatedUser
      })
    } catch (error) {
      console.error('Update user error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id }
      })

      res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
      console.error('Delete user error:', error)
      res.status(500).json({ message: 'Internal server error' })
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' })
  }
} 