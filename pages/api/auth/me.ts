import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateUser } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  const user = await authenticateUser(token)

  if (!user) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  res.status(200).json({
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
    }
  })
} 